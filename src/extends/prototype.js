/**
 *
 * 对 Vue.prototype 的扩展统一定义在这里
 */

import Vue from 'vue'
import store from '@/store'

/**
 * $auth 方法，用于组件内方法调用
 *   <template v-if="$auth('edit')"></template>
 *   if (!this.$auth('edit')) {
 *     this.$message.error('抱歉你没有编辑的权限')
 *     return
 *   }
 */
Vue.prototype.$auth = function (action) {
  const permissions = this.$store.getters.permissions
  // 如果是字符串
  if (this.$utils.isString(action)) {
    return permissions.find(code => code === action)
  }
  // 如果是数组
  if (this.$utils.isArray(action)) {
    return action.find(code => permissions.includes(code))
  }
  return false
}

/**
 * 全局的错误捕获，默认提供了页面展示列表，也可以在这里处理成发送邮件、封装成独立的错误页面等
 */
if (store.getters.isCatchError) {
  Vue.config.errorHandler = function (error, vm, info) {
    // 同时也抛出到控制台，因为设置了 errorHandler 之后被 errorHandler 捕获的错误不会主动显示在控制台了
    console.error(error, vm, info)
    // https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('addErrorLog', {
        error,
        // 直接 vm 保存会死循环，这里只记录部分数据到日志里面
        // vm,
        tag: vm.$vnode.tag,
        info,
        url: window.location.href
      })
    })
  }
}

// 默认的配置，用于表单布局
Vue.prototype.$wrapperCol = {
  xl: 6,
  md: 8,
  sm: 24
}

// 表单独占一半的配置，用于表单布局
Vue.prototype.$wrapperHalfCol = {
  xxl: 6,
  xl: 12,
  md: 16,
  sm: 24
}
