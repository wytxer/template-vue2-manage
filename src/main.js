import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import moment from 'moment'
import * as utils from '@/utils/utils'
import * as constant from '@/utils/const'
import api from '@/api'
import request from '@/utils/request'

import 'moment/locale/zh-cn'

import './extends/use'
import './extends/directive'
import './extends/prototype'

import store from './store'
import router from './router'
import App from './app'

import '@/components/nprogress.less'
import '@wytxer/style-utils/lib/common.less'

moment.locale('zh-cn')

Vue.prototype.$moment = moment
Vue.prototype.$utils = utils
Vue.prototype.$const = constant
Vue.prototype.$api = api
Vue.prototype.$request = request

if (process.env.VUE_APP_USE_MOCKER === 'false') {
  require('../mock/index')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
