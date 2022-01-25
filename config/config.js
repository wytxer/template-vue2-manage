/**
 * 提供给 vue.config.js 使用的自定义配置，全部配置在 vue.config.js 中会比较乱，抽离相对独立和共用部分，提高可读性
 */

// 默认的接口前缀，在 .env 中设置
const apiPrefix = `^${process.env.VUE_APP_API_PREFIX}`

module.exports = {
  // cdn 资源配置
  cdn: {
    css: [
      '//cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.css'
    ],
    js: [
      '//cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
      '//cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.min.js',
      '//cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
      '//cdn.jsdelivr.net/npm/moment@2.29.1/min/moment.min.js',
      '//cdn.jsdelivr.net/npm/moment@2.29.1/locale/zh-cn.js',
      '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      '//cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.js'
      // '//cdn.jsdelivr.net/npm/@antv/g2@3.5.8/dist/g2.min.js',
      // '//cdn.jsdelivr.net/npm/@antv/data-set@0.10.2/dist/data-set.min.js'
    ]
  },
  // webpack 的别名扩展，配合 cdn 字段来使用
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    moment: 'moment',
    axios: 'axios',
    'ant-design-vue': 'antd'
    // '@antv/g2': 'G2',
    // '@antv/data-set': 'DataSet'
  },

  // webpack 的打包优化配置
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
          chunks: 'initial'
        },
        antDesign: {
          name: 'chunk-ant-design',
          chunks: 'all',
          test: /@ant-design/,
          priority: -15
        },
        antDesignVue: {
          name: 'chunk-ant-design-vue',
          chunks: 'all',
          test: /ant-design-vue/,
          priority: -10
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -9,
          chunks: 'initial',
          // https://segmentfault.com/q/1010000019710855/a-1020000021486049
          reuseExistingChunk: true
        }
      }
    }
  },

  // 放置生成的静态资源的目录，自定义主题也需要这个配置
  assetsDir: './static',

  // 主题配置
  modifyVars: {
    // 主题配置，ant-design-vue 库提供的一种主题配置方式。完整可用的主题配置项参见：https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
    // 'primary-color': process.env.VUE_APP_THEME_COLOR,
    // 'info-color': process.env.VUE_APP_THEME_COLOR
  },

  // webpack-bundle-analyzer 插件配置
  bundleAnalyzerProps: {
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 9909,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
  },

  // 接口前缀配置
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
      changeOrigin: true
    }
  }
}
