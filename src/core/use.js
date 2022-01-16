import Vue from 'vue'
import VueStorage from 'vue-ls'
import Shepherd from '@wytxer/shepherd-vue'

import AKit from '@wytxer/antdv-kit'
import Kit from '@/components/use'

// 根据项目的私有化配置进行加载
if (process.env.PROJECT_CONFIG.IS_PRIVATE) {
  require('./use-lazy')
} else {
  require('./use-full')
}

Vue.use(VueStorage, {
  namespace: process.env.PROJECT_CONFIG.LS_PREFIX
})

Vue.use(Shepherd)
Vue.use(AKit)
Vue.use(Kit)
