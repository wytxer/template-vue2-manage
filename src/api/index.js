/**
 * 直接通过接口访问的地址定义在这里，比如下载文件、预览文件等
 */

// 请求接口的 url 前缀，去掉末尾的斜杠，防止拼接的时候 url 出现双斜杠
const API_PREFIX = process.env.VUE_APP_API_PREFIX.replace(/\/$/, '')

export default {
  // 上传
  upload: `${API_PREFIX}/upload.json`,
  /**
   * 下载文件
   * 如果是内网环境可配置成类似这样的：`${API_PREFIX}/download.json?filePath=`，使用接口来支持文件下载
   * 如果是外网环境，该字段可留空
   */
  download: `${API_PREFIX}/download.json?filePath=`,
  // 获取图片验证码
  imageCode: '/account/security/captcha',
  // mock 上传
  mockUpload: 'http://run.mocky.io/v3/d80efc3d-b8c6-403c-acd3-9ed641d1d0e3'
}
