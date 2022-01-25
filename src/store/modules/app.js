import Vue from 'vue'
import * as types from '@/store/types'

import logo from '@/assets/logo.svg'

const initState = {
  /**
   * logo 的图片地址，默认是 @/assets/logo.svg
   */
  logo,
  /**
   * logo 旁边的 slogan
   */
  slogan: '中后台脚手架',
  /**
   * 菜单主题，默认为深色主题
   * dark：深色主题
   * light：亮色主题
   */
  menuTheme: Vue.ls.get(types.MENU_THEME, 'light'),
  /**
   * 菜单模式
   * vertical：垂直，菜单是弹出形式
   * inline：内嵌菜单
   * horizontal：水平，顶部导航菜单
   */
  menuMode: 'inline',
  /**
   * 布局模式
   * side：左右布局，导航菜单在左边
   * top：上下布局，导航菜单在顶部
   */
  layout: Vue.ls.get(types.LAYOUT, 'side'),
  /**
   * 默认的主题色，跟随 ant-design-vue 库
   */
  themeColor: Vue.ls.get(types.THEME_COLOR, process.env.VUE_APP_THEME_COLOR),
  /**
   * 路由模式
   * static：静态。如果是静态模式，路由的增删改在 src/router/route-static.js 中完成
   * dynamic：动态。如果是动态模式，路由的增删改在 src/router/route-dynamic.js 中完成，每次
   * 在 routeComponents 中新增一个路由页面之后，再去更新后端的路由菜单
   */
  routeMode: 'dynamic',
  /**
   * 菜单的展开收起状态
   */
  menuCollapsed: Vue.ls.get(types.MENU_COLLAPSED, false),
  /**
   * 导航模式
   * breadcrumb：面包屑导航
   * tab：标签导航
   */
  navMode: Vue.ls.get(types.NAV_MODE, 'breadcrumb'),
  /**
   * 是否需要捕获错误日志，具体实现代码请移步 src/core/extends.js 里面查看
   */
  catchError: Vue.ls.get(types.CATCH_ERROR, false)
}

const app = {
  state: {
    ...initState
  },

  mutations: {
    INIT_STATE: (state, data) => {
      Object.entries(initState).forEach(([key, value]) => {
        state[key] = value
      })
    },
    SET_MENU_THEME: (state, data) => {
      state.menuTheme = data
      Vue.ls.set(types.MENU_THEME, data)
    },
    SET_LAYOUT: (state, data) => {
      state.layout = data
      Vue.ls.set(types.LAYOUT, data)
    },
    SET_NAV_MODE: (state, data) => {
      state.navMode = data
      Vue.ls.set(types.NAV_MODE, data)
    },
    SET_THEME_COLOR: (state, data) => {
      state.themeColor = data
      Vue.ls.set(types.THEME_COLOR, data)
    },
    SET_MENU_COLLAPSED: (state, data) => {
      state.menuCollapsed = data
      Vue.ls.set(types.MENU_COLLAPSED, data)
    },
    SET_CATCH_ERROR: (state, data) => {
      state.catchError = data
      Vue.ls.set(types.CATCH_ERROR, data)
    }
  }
}

export default app
