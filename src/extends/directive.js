/**
 *
 * 全局的指令扩展统一定义在这里
 */

import Vue from 'vue'
import store from '@/store'

/**
 * 权限指令，配合 user.permissions 字段使用，当前用户没有权限时，组件上使用了该指令则会被隐藏，使用方式如下：
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
