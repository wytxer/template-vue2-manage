/**
 * 提供给 vue 工具打包的配置文件，无特殊需要，这里面的内容基本不需要修改和关注
 */
const path = require('path')
const webpack = require('webpack')
const apiMocker = require('mocker-api')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const custom = require('./config/config')
const themePlugin = require('./config/theme.plugin')

// 生产环境
function isProd () {
  return process.env.NODE_ENV === 'production'
}
// 如果是打包是生产环境且设置了非私有云部署且不是预览环境，才使用 cdn 资源
function useCdn () {
  return isProd() && process.env.VUE_APP_PRIVATE === 'false' && process.env.VUE_APP_BUILD_ENV !== 'preview'
}

const vueConfig = {
  runtimeCompiler: true,
  // 同 process.env.BASE_URL，若要修改 publicPath，建议到 .env 中修改 BASE_URL
  publicPath: process.env.BASE_URL,
  devServer: {
    port: process.env.VUE_APP_PORT,
    before (app) {
      // 如果是使用 mocker-api
      if (process.env.VUE_APP_USE_MOCKER === 'true') {
        apiMocker(app, path.resolve('mock/index.js'), {
          proxy: {
            '^/mock': '/mock'
          },
          changeHost: true
        })
      }
    },
    // 接口代理配置，具体的匹配规则请移步 config/config.js 中修改
    proxy: custom.proxy
  },
  transpileDependencies: [
    // EDGE 和 IE11 里面不支持函数设置默认值，需要转化一下
    /\/node_modules\/mocker-api/,
    // IE11 里面不支持函数简写，需要转化一下，而且本来使用这个包的地方不是直接返回的 ES5
    /\/node_modules\/vue-color/,
    /\/node_modules\/@wytxer\/antdv-kit/
  ],
  configureWebpack: {
    plugins: [
      themePlugin(),
      // 过滤 moment 对语言包的打包
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    externals: useCdn() ? custom.externals : {},
    devtool: 'source-map'
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: custom.modifyVars,
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    if (useCdn()) {
      config.plugin('html').tap(args => {
        args[0].cdn = custom.cdn
        return args
      })
    }
    if (isProd()) {
      config.optimization.minimizer('terser')
        .tap(args => {
          // 生产环境打包的时候删除 console 和 debugger 信息
          args[0].terserOptions.compress = {
            ...args[0].terserOptions.compress,
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          }
          return args
        })
    }
  },
  // 导入全局定义的 less 变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/components/index.less')
      ]
    }
  },
  // 放置生成的静态资源的目录
  assetsDir: custom.assetsDir
}

// 如果是私有云部署或者是预览环境，增加打包配置
if (process.env.VUE_APP_PRIVATE === 'true' || process.env.VUE_APP_BUILD_ENV === 'preview') {
  vueConfig.configureWebpack.optimization = custom.optimization
}

// 只有生产环境且设置了显示构建报告才生成打包的可视化页面
if (isProd() && process.env.VUE_APP_BUILD_REPORT === 'true') {
  vueConfig.configureWebpack.plugins.push(new BundleAnalyzerPlugin(custom.bundleAnalyzerProps))
}

module.exports = vueConfig
