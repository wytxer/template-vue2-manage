/**
 * 全局的类方法工具库，身份证校验、数据处理、转换等
 *   组件内通过 this.$utils 调用，如：this.$utils.testMobile(1)
 *   组件外部需要自行引入工具库
 */
import Vue from 'vue'

// 手机号校验
export function testMobile (value) {
  return /^[1]([3-9])[0-9]{9}$/.test(value)
}

// 密码校验
// 8 至 16 位大小写字母数字下划线特殊字符组合
export function testPassword (value) {
  return /^[a-zA-Z0-9_`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]{8,16}$/.test(value)
}

// 身份证校验
export function testIdentity (value) {
  return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value)
}

// 生成随机字符串
const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
export function createId (len = 16) {
  let str = ''
  for (let a = 0; a < len; a += 1) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}

// 判断一个值是否是字符串
export function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]'
}

// 判断一个值是否是对象
export function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

// 判断一个值是否是空对象
export function isEmptyObject (value) {
  return Object.keys(value).length === 0
}

// 判断一个值是否是数组
export function isArray (value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

// 判断一个值是否是 Boolean 类型
export function isBoolean (value) {
  return Object.prototype.toString.call(value) === '[object Boolean]'
}

// 参数编码
export function encode (value) {
  return window.encodeURIComponent(value)
}

// 参数解码
export function decode (value) {
  return window.decodeURIComponent(value)
}

// JSON 对象转字符串
export function stringify (value) {
  return JSON.stringify(value)
}

// JSON 字符串转对象
export function parse (value) {
  return JSON.parse(value)
}

// 浅拷贝
export function clone (value) {
  return parse(stringify(value))
}

// 零填充
export function fullZero (value) {
  return value < 10 ? `0${value}` : value
}

// 下载文件，如果接口设置了 content-disposition 头建议使用这个，否则建议使用 $http 并指定 headerType 为 download
export function download (url, params = {}) {
  const form = document.createElement('form')
  form.method = 'post'
  form.action = url
  form.target = '_blank'
  document.body.appendChild(form)
  for (const key in params) {
    const value = params[key]
    if (value) {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      if (isArray(value)) {
        input.setAttribute('value', stringify(value))
      } else {
        input.setAttribute('value', value)
      }
      form.appendChild(input)
    }
  }
  form.submit()
  document.body.removeChild(form)
}

// 格式化标的额保留两位小数，每三位数用逗号分隔
export function formatCurrency (value) {
  if (isNaN(value) || !value) value = 0
  value = Math.floor(value * 100 + 0.50000000001)
  // 小数点后保留两位
  let cents = value % 100
  value = Math.floor(value / 100).toString()
  cents = fullZero(cents)
  value = value.split('')
    .reverse()
    .map((item, i) => {
      if (i % 3 === 0 && i !== 0) {
        return `${item},`
      }
      return item
    })
    .reverse()
    .join('')
  return `${value}.${cents}`
}

// 添加 localstorage 相关的操作，主要是给 table 的列宽、列筛选做数据缓存用的
// 获取 storage，没找到返回空对象
export function getStorage (key) {
  return parse(decode(Vue.ls.get(key))) || {}
}

// 设置 storage，默认进行数据合并操作，value 必须是一个对象，isMerge 默认合并之前存在的数据
export function setStorage (key, value = {}, isMerge = true) {
  let data = value
  if (isMerge) {
    data = {
      ...getStorage(key),
      ...data
    }
  }
  Vue.ls.set(key, encode(stringify(data)))
}

// 删除 storage，values 指定要删除的 key，不传则删除所有
export function removeStorage (key, values = []) {
  if (values.length) {
    const data = getStorage(key)
    values.forEach(k => {
      delete data[k]
    })
    setStorage(key, data, false)
  } else {
    Vue.ls.remove(key)
  }
}
