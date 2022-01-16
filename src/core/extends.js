/**
 *
 * 全局的指令、过滤器、和权限判断，直接挂到 Vue 上面去
 */

import Vue from 'vue'
import store from '@/store'

/**
 * 权限指令，当前用户没有权限时，组件上使用了该指令则会被隐藏
 *   <el-button v-action.add>添加</a-button>
 *   <a-button v-action.add.edit>添加或编辑</a-button>
 *   <a v-action.edit @click="onEdit(record)">修改</a>
 */
Vue.directive('action', {
  inserted (el, binding, vnode) {
    const actions = Object.keys(binding.modifiers)
    const permissions = store.getters.permissions

    if (actions.find(item => permissions.includes(item))) {
      return
    }
    if (el.parentNode) {
      el.parentNode.removeChild(el)
    } else {
      el.style.display = 'none'
    }
  }
})

// 表单自动聚焦
Vue.directive('focus', {
  inserted (el, binding, vnode) {
    el.focus()
  }
})

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
    return permissions.find(r => r === action)
  }
  // 如果是数组
  if (this.$utils.isArray(action)) {
    return action.find(a => permissions.includes(a))
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
