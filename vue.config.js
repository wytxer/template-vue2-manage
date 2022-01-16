/**
 * 提供给 vue 工具打包的配置文件，无特殊需要，这里面的内容基本不需要修改和关注
 */
const path = require('path')
const webpack = require('webpack')
const apiMocker = require('mocker-api')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const project = require('./build/project.config')
const createThemeColorReplacerPlugin = require('./build/plugin.config')

const {
  env: { IS_PRIVATE, MOCKER },
  cdn,
  externals,
  optimization,
  showBuildReport,
  modifyVars,
  assetsDir
} = project.client
const { proxyHost, port } = project.server

// 生产环境
function isProd () {
  return process.env.NODE_ENV === 'production'
}

// 只有生产环境且设置了非私有化项目才使用 cdn 资源
function useCdn () {
  return isProd() && !IS_PRIVATE
}

// 只有生产环境且设置了显示构建报告才生成打包的可视化页面
function createBuildReport () {
  return isProd() && showBuildReport
}

const vueConfig = {
  runtimeCompiler: true,
  devServer: {
    port,
    before (app) {
      // 如果是使用 mocker-api
      if (MOCKER) {
        apiMocker(app, path.resolve('mock/index.js'), {
          proxy: {
            '^/mock': '/mock'
          },
          changeHost: true
        })
      }
    },
    // 代理配置，具体的匹配规则请移步 build/project.config.js 中修改
    proxy: proxyHost.development
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
      // 注入项目的环境变量配置，用于控制打包、资源加载等
      new webpack.DefinePlugin({
        'process.env.PROJECT_CONFIG': JSON.stringify(project.client.env)
      }),
      createThemeColorReplacerPlugin(),
      // 过滤 moment 对语言包的打包
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    externals: useCdn() ? externals : {}
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars,
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    if (useCdn()) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
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
  assetsDir
}

// 如果是私有化项目增加打包配置
if (IS_PRIVATE) {
  vueConfig.configureWebpack.optimization = optimization
}

if (createBuildReport()) {
  // 打包完成后自动打开可视化分析页面
  vueConfig.configureWebpack.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8899,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  )
}

module.exports = vueConfig
