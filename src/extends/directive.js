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

let containerMaxBox
if (!containerMaxBox) {
  containerMaxBox = document.createElement('div')
  containerMaxBox.classList.add('container-max-width')
  document.body.appendChild(containerMaxBox)
}

// 根据布局宽度自动计算固定导航距离右边的距离
Vue.directive('right', {
  inserted (el, binding, vnode) {
    const anchorWidth = binding.value || 130
    if (!store.getters.isSideMenu) {
      if (window.innerWidth - containerMaxBox.clientWidth < anchorWidth) {
        el.style.right = 0
      } else {
        el.style.right = `${(window.innerWidth - containerMaxBox.clientWidth) / 2 - anchorWidth}px`
      }
    }
  }
})

// 根据布局宽度自动计算详情容器右边的内间距
Vue.directive('paddingRight', {
  inserted (el, binding, vnode) {
    const anchorWidth = binding.value || 130
    if (store.getters.isSideMenu) {
      el.style.paddingRight = `${anchorWidth + 24}px`
    } else if (window.innerWidth - containerMaxBox.clientWidth < anchorWidth) {
      el.style.paddingRight = `${anchorWidth}px`
    } else {
      el.style.paddingRight = 0
    }
  }
})
