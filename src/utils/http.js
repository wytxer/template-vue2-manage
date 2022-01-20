import Vue from 'vue'
import axios from 'axios'
import { message, Modal } from 'ant-design-vue'
import { stringify } from 'qs'

// 全局的 http code 配置，可根据实际情况删改
const codes = {
  // 成功
  success: {
    // 如果是设置 -1，code 等于 0 和 200 都当做是成功，如果成其他值就取 code 值
    code: -1, message: ''
  },
  // 未登录
  unLogin: {
    code: 601, message: '请先登录后再操作'
  },
  // 服务器异常
  error: {
    code: 500, message: '服务器异常'
  },
  // 无权限访问
  noPermission: {
    code: 403, message: '无权限访问'
  },
  // 接口不存在
  notFound: {
    code: 404, message: '接口不存在'
  }
}
// 默认的请求类型
const headerType = 'json'

// 跳转到登录页面
const onOk = () => {
  location.href = `${process.env.PROJECT_CONFIG.ROUTER_BASE_URL}user/login`
}
// 下载文件
const download = res => {
  const disposition = res.headers['content-disposition']
  // 如果设置了文件名就优先取，否则尝试从 content-disposition 读取，需要后端配置设置 content-disposition 头
  const fileName = res.config.fileName || (disposition ? disposition.match(/filename=(.*)/)[1] : '未知文件')
  const blob = new Blob([res.data])
  const blobUrl = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = blobUrl
  link.setAttribute('download', decodeURI(fileName))
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(blobUrl)
  return {
    code: 0,
    data: null,
    message: null
  }
}

const instance = axios.create({
  timeout: 20000,
  baseURL: ''
})

instance.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 如果存在 token 的话，读取并自动放到 header 里面去
  const token = Vue.ls.get('token') || ''
  if (token) {
    config.headers.token = token
  }

  // 默认取 url，没有则取 mockUrl，在后端还未提供接口时，通过 mockUrl 指定 mock 数据
  config.url = config.url || config.mockUrl

  // 如果是相对路径，自动拼接路由前缀
  if (!config.url.match(/^(\/|https?:\/\/)/i)) {
    // 去掉末尾的斜杠，避免出现 //
    const baseUrl = process.env.PROJECT_CONFIG.API_BASE_URL.replace(/\/$/, '')
    config.url = `${baseUrl}/${config.url}`
  }

  // 根据 headerType 内置不同的 Content-Type，简化使用
  config.headerType = config.headerType || headerType
  switch (config.headerType) {
    // JSON
    case 'json':
      config.headers['Content-Type'] = 'application/json; charset=UTF-8'
      break
    // 文件上传
    case 'upload':
      config.headers['Content-Type'] = 'multipart/form-data'
      break
    // 文件下载，内置了进行下载文件的行为，不需要自己写了
    case 'download':
      config.responseType = 'blob'
      break
    // 下载文件流信息
    case 'blob':
      config.responseType = 'blob'
      break
    // form 的默认 Content-Type 已经设置过了，这里只是转换一下数据格式
    case 'form':
      if (config.data) {
        config.data = stringify(config.data)
      }
      break
  }
  return config
}, error => {
  // 控制台抛出详情的错误日志方便调试
  console.error(error)
  // 请求前的配置项出现错误，直接给出提示
  message.error(error.message, 99999)
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(res => {
  // 如果是下载文件
  if (res.config.headerType === 'download') {
    return download(res)
  } else if (res.config.headerType === 'blob') { // 返回文件流信息，不做后续的处理
    return res
  }

  // 如果后端没有返回固定的结构，抛出错误
  if (!res.data || res.data.code === undefined) {
    message.error('接口返回数据格式不正确，请检查接口返回值', 99999)
    return Promise.reject(res.data)
  }

  // 将 code 统一转换成 0 作为成功的状态
  if (codes.success.code !== -1 ? res.data.code === codes.success.code : (+res.data.code === 0 || +res.data.code === 200)) {
    res.data.code = 0
  }
  // 转换消息字段
  res.data.message = res.data.message || res.data.errorMessage
  delete res.data.errorMessage

  // 只有 code === 0 时才返回成功，否则一律处理成失败，这样的话请求之后的 .then(res) 里面拿到的一定是成功的数据，否则从 catch(error) 里面取报错信息
  if (res.data.code === 0) {
    return Promise.resolve(res.data)
  } else {
    const code = +res.data.code
    // 如果是未登录重定向到登录页面
    if (code === codes.unLogin.code) {
      Modal.info({
        title: '提示',
        content: '登录状态已失效，请重新登录',
        onOk,
        cancelText: ''
      })
      // 如果用户没有点击，3s 后自动跳转
      setTimeout(onOk, 3000)
    } else {
      let tips = res.data.message
      // 如果接口没有返回错误提示信息，从自定义的错误码里面读取错误提示
      if (!tips) {
        Object.entries(codes).find(([key, value]) => {
          if (value.code === code && value.message) {
            tips = value.message
            return true
          }
          return false
        })
      }
      res.data.message = tips
      // 如果当前「没有关闭自动提示」且「存在错误提示」就抛出错误提示
      if (!res.config.closeAutoTips && tips) {
        message.error(tips)
      }
    }
    return Promise.reject(res.data)
  }
}, error => {
  // 控制台抛出详情的错误日志方便调试
  console.error(error)
  if (error.response) {
    message.error(error.response.data.message || codes.error.message)
    return Promise.reject(error.response.data)
  } else {
    const tips = '请求超时，请刷新重试'
    // 封装成统一的错误格式抛出
    const newError = {
      code: 500,
      message: tips
    }
    message.error(tips)
    return Promise.reject(newError)
  }
})

export default instance
