import Vue from 'vue'
import * as utils from '@/utils'
import * as consts from '@/utils/const'
import api from '@/api'
import http from '@/utils/http'

import './use'
import './extends'

Vue.prototype.$utils = utils
Vue.prototype.$const = consts
Vue.prototype.$api = api
Vue.prototype.$http = http

// 默认的配置
Vue.prototype.$wrapperCol = {
  xl: 6,
  md: 8,
  sm: 24
}
// 表单独占一半的配置
Vue.prototype.$wrapperHalfCol = {
  xxl: 6,
  xl: 12,
  md: 16,
  sm: 24
}
