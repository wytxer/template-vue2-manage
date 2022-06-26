/**
 * 提供给 Node.js 部署包的配置项，使用 wy app 启动
 */

// 默认的接口前缀，在 .env 中设置
const apiPrefix = `^${process.env.VUE_APP_API_PREFIX}`

module.exports = {
  server: {
    // 端口号
    port: process.env.VUE_APP_PORT,

    // 生产环境接口代理配置，给 Node.js 部署包的配置项，只有使用 Node.js 部署包时才需要配置
    proxy: {
      // 系统默认的前缀配置
      [apiPrefix]: {
        target: 'http://127.0.0.1:7001',
        ws: false,
        changeOrigin: true
      },
      // 用户中心接口前缀配置
      '^/account': {
        target: 'http://account.example.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/account': ''
        }
      }
    }
  }
}
