import Vue from 'vue'

import './core'

import store from './store'
import router from './router'
import App from './app'

import '@/components/nprogress.less'
import '@wytxer/style-utils/lib/common.less'

if (!process.env.PROJECT_CONFIG.MOCKER) {
  require('../mock/index')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
