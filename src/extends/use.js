import Vue from 'vue'
import VueStorage from 'vue-ls'
import Shepherd from '@wytxer/shepherd-vue'

import AKit from '@wytxer/antdv-kit'
import Kit from '@/components/use'

// 如果是私有云部署或者预览环境，按需加载组件
if (process.env.VUE_APP_PRIVATE === 'true' || process.env.VUE_APP_BUILD_ENV === 'preview') {
  require('./use-lazy')
} else {
  require('./use-full')
}

Vue.use(VueStorage, {
  namespace: process.env.VUE_APP_LS_PREFIX
})

Vue.use(Shepherd)
Vue.use(AKit)
Vue.use(Kit)
