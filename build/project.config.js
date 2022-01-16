/**
 * 项目配置，主要是一些常量的设置和客户端配置，每次修改需要重新 npm run dev
 */

module.exports = {
  client: {
    env: {
      /**
       * 请求接口的 url 前缀，跟随后端开发提供的来改，需要跟 server.proxyHost 里面的前缀配置一致
       */
      API_BASE_URL: '/admin',
      /**
       * 路由地址前缀，一般不需要改
       */
      ROUTER_BASE_URL: '/',
      /**
       * vue-ls 前缀，建议设置成对应项目名称的英文且不要和其他项目重复
       */
      LS_PREFIX: 'template-vue2-manage__',
      /**
       * 是否是私有化项目，就是是否部署到内网，如果项目本身使用到的 ui 库组件很少，也可以设置为 true，以此来减少没有必要的 cdn 资源加载，如果使用了自定义主题功能，一定要设置成 true，否则自定义主题打包后不生效
       */
      IS_PRIVATE: false,
      /**
       * 内置 mockaer-api 和 mockjs2 两个 mock 服务，设置为 true 代表使用 mocker-api，否则使用 mockjs2
       */
      MOCKER: (process.env.BUILD_ENV === 'development' && process.env.NODE_ENV === 'production') ? false : process.env.BUILD_ENV === 'development',
      /**
       * 控制打包的变量，可用来区分线上和测试环境
       */
      BUILD_ENV: process.env.BUILD_ENV
    },

    // CDN
    cdn: {
      css: [
        '//cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.css'
      ],
      js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/moment@2.25.3/min/moment.min.js',
        '//cdn.jsdelivr.net/npm/moment@2.25.3/locale/zh-cn.js',
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

    // webpack 的打包配置，私有化时才会使用
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

    // 是否开启打包分析，当发现打包后的 dist 资源文件很大时，设置为 true，每次打包完毕后会自动打开本次打包的可视化分析页面
    showBuildReport: false,

    // 主题配置
    modifyVars: {
      // 主题配置，ant-design-vue 库提供的一种主题配置方式。完整可用的主题配置项参见：https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
      // 'primary-color': '#1890ff',
      // 'info-color': '#1890ff',
      // 'form-item-margin-bottom': '18px',
      // 'border-radius-base': '100px'
    },

    // 打包的静态资源目录
    assetsDir: './front'
  },
  // 提供给 nodejs 服务使用
  server: {
    // 端口号
    port: 8832,
    // 代理服务地址，区分环境
    proxyHost: {
      // 开发环境
      development: {
        // 请求接口的 url 前缀，跟随后端开发提供的来改
        '^/admin': {
          target: 'http://127.0.0.1:7001',
          ws: false,
          changeOrigin: true
        }
      },
      // 正式环境，这个是给 nodejs 服务使用的，通过打包静态资源方式部署的话无需关注
      production: {
        '^/admin': {
          target: 'http://127.0.0.1:7001',
          ws: false,
          changeOrigin: true
        }
      }
    }
  }
}
