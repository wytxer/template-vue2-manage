/**
 * 直接通过接口访问的地址定义在这里，比如下载文件、预览文件、第三方的请求域名配置等。
 */

// 测试环境
const USER_DOMAIN_DEV = 'http://127.0.0.1:7001'
// 正式环境
const USER_DOMAIN_PROD = 'http://api.example.com'
// 根据环境变量设置真实的地址
const USER_HOST = (process.env.PROJECT_CONFIG.BUILD_ENV === 'development' || process.env.NODE_ENV === 'development') ? USER_DOMAIN_DEV : USER_DOMAIN_PROD
// 请求接口的 url 前缀，去掉末尾的斜杠，防止拼接的时候 url 出现双斜杠
const BASE_URL = process.env.PROJECT_CONFIG.API_BASE_URL.replace(/\/$/, '')

export {
  USER_HOST
}

export default {
  // 上传
  upload: `${BASE_URL}/upload.json`,
  // 下载文件
  download: `${BASE_URL}/download.json?filePath=`,
  // 获取图片验证码
  imageCode: `${USER_HOST}/security/captcha`,
  // mock 上传
  mockUpload: 'http://run.mocky.io/v3/d80efc3d-b8c6-403c-acd3-9ed641d1d0e3'
}
