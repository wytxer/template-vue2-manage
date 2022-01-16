import Vue from 'vue'
import moment from 'moment'
import Antd from 'ant-design-vue'

import 'moment/locale/zh-cn'

moment.locale('zh-cn')

if (process.env.NODE_ENV === 'development') {
  require('ant-design-vue/dist/antd.less')
}

Vue.prototype.$moment = moment
Vue.use(Antd)
