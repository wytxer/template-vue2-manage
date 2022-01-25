import { message } from 'ant-design-vue'
import Vue from 'vue'
import progress from 'nprogress'
import Router from 'vue-router'

import LayoutBase from '@/layouts/base'
import store from '@/store'
import user from './user'
import common from './common'
import routeStatic from './route-static'
import { generator, getFirstPath, transformFlatMenus } from './handler'

Vue.use(Router)

progress.configure({
  showSpinner: true
})

let routes = []

// 如果使用了静态路由
if (store.getters.isStaticRoute) {
  if (store.getters.showBreadcrumb) {
    routes = routes.concat(routeStatic)
  } else { // 标签页导航路由
    const routeData = transformFlatMenus(generator(routeStatic))
    const routeMap = {}
    routeData.forEach(item => {
      routeMap[item.path] = item.component
    })
    store.commit('SET_COMPONENTS', routeMap)
    routes = routes.concat(routeData)
  }
} else {
  routes = routes.concat(user)
}

const routerConfig = {
  /**
   * history：history API 路由模式
   * hash：hash 路由模式
   */
  mode: 'history',
  base: process.env.BASE_URL,
  routes
}

// 如果是面包屑导航
if (store.getters.showBreadcrumb) {
  routerConfig.scrollBehavior = () => ({ y: 0 })
}

const router = new Router(routerConfig)

// 免登陆白名单
const whiteList = [
  '/user/login',
  '/user/mock',
  '/user/reset-password',
  '/user/register'
]

// 统一处理跳转
export const go = async (from, to, next, routes, replace = true) => {
  const redirect = decodeURIComponent(from.query.redirect || '')
  // 如果存在重定向路由就跳转过去
  if (redirect) {
    // 重定向跳转之后就删除这个标识，防止出现死循环
    delete from.query.redirect
    next({ ...to, path: redirect, replace: true })
  } else if (to.path === '/') {
    // 否则如果跳转地址是首页，获取重定向地址进行跳转
    const rootRoute = routes.find(item => item.path === to.path) || {}
    if (rootRoute.redirect) {
      next({
        ...to,
        path: rootRoute.redirect,
        replace: true
      })
    } else {
      // 否则如果找到了第一个可以访问的路由进行跳转
      const path = getFirstPath(routes)
      if (path) {
        next({ path, replace: true })
      } else {
        replace ? next({ ...to, replace: true }) : next()
      }
    }
  } else {
    replace ? next({ ...to, replace: true }) : next()
  }
  progress.done()
}

// 获取菜单
const getMenus = async (from, to, next) => {
  if (store.getters.isStaticRoute) {
    // 将静态路由添加到 menus
    const rootRoute = routeStatic.filter(item => item.path === '/') || []
    const staticRoutes = generator(rootRoute)
    store.commit('SET_ROUTES', staticRoutes)
    await go(from, to, next, staticRoutes)
  } else {
    await store.dispatch('getMenus')
      .then(async data => {
        let routeData = []
        // 动态添加路由
        if (store.getters.showBreadcrumb) {
          routeData = data
        } else { // 标签页导航，将路由打平到 store，用于多标签页匹配
          routeData = transformFlatMenus(data)
          const routeMap = {}
          routeData.forEach(item => {
            routeMap[item.path] = item.component
          })
          store.commit('SET_COMPONENTS', routeMap)
        }
        router.addRoutes(routeData)
        await go(from, to, next, routeData)
      })
      .catch((err) => {
        // 如果获取菜单出错了，设置一份占位路由，并跳转到 500
        const noopRoutes = [{
          path: '/',
          component: LayoutBase,
          children: generator(common)
        }]
        if (store.getters.showBreadcrumb) {
          router.addRoutes(noopRoutes)
        } else {
          router.addRoutes(transformFlatMenus(noopRoutes))
        }
        store.commit('SET_ROUTES', noopRoutes)
        message.error(err.message || '导航菜单获取失败')
        router.push('/500')
      })
  }
}

router.beforeEach(async (to, from, next) => {
  progress.start()
  // 如果已登录
  if (store.getters.logged) {
    // 第一次登录没有菜单的话就去获取一次
    if (store.getters.routes.length <= 0) {
      await getMenus(from, to, next)
    } else {
      await go(from, to, next, store.getters.routes, false)
    }
  } else {
    // 如果在免登陆白名单，直接进入
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 否则查询一次用户信息，如果是未登录状态或者登录状态已失效，则直接跳转到登录页面
      await store.dispatch('getUser')
        .then(async () => {
          await getMenus(from, to, next)
        })
    }
  }
})

router.afterEach(() => {
  progress.done()
})

export default router
