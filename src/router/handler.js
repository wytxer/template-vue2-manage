import * as layouts from '@/layouts'
import { isString } from '@/utils'

// 格式化树形结构数据，生成 vue-router 层级路由表
export const generator = (routes, routeComponents = {}, parent) => {
  return routes.map(item => {
    const {
      title,
      icon,
      hidden,
      hideChildren,
      target,
      href,
      permissions
    } = item.meta ? (isString(item.meta) ? JSON.parse(item.meta) : item.meta) : {}
    const currentRouter = {
      // 路由地址通过 key 动态拼接生成
      path: `${(parent && parent.path) || ''}/${item.path}`,
      // 页面组件
      component: routeComponents[item.component] || item.component,
      meta: {
        // 提供给 menu 组件设置选中菜单使用
        hidden,
        // 提供给 menu 组件设置选中菜单使用
        hideChildren,
        // 标题，面包屑导航需要用到，common 里面的静态路由的 title 是定义在 meta 里面的
        title: item.title || title,
        // 图标，用于菜单展示
        icon: item.icon || icon,
        // 设置了为 _blank 可以跳转到外部
        target,
        // 如果设置了 target，href 就是跳转地址
        href,
        // 权限点，如果菜单的权限也是由前端来控制的话，这个字段需要从接口中获取
        permissions: item.permissions || permissions
      }
    }
    // 是否设置了隐藏菜单
    if (hidden) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    if (item.redirect) {
      currentRouter.redirect = item.redirect
    }
    // 如果有子菜单进行递归处理
    if (item.children && item.children.length > 0) {
      currentRouter.children = generator(item.children, routeComponents, currentRouter)
    }
    return currentRouter
  })
}

// 获取第一个可以访问的路由
export const getFirstPath = (menus = []) => {
  const routers = {}
  const findFirstPath = data => {
    data.forEach(item => {
      if (item.children && item.children.length) {
        findFirstPath(item.children)
      } else {
        routers[Object.keys(routers).length] = item.redirect || item.path
      }
    })
  }
  findFirstPath(menus)
  return routers[0]
}

// 布局名称列表，同时过滤掉空布局，这里用不到
const layoutNames = Object.values(layouts).map(item => item.name).filter(name => name !== 'layout-block')
// 标签页导航将路由解析成一级菜单
export const transformFlatMenus = (menus = []) => {
  const res = []
  let currentLayout = null
  const mapMenus = data => {
    data.forEach(item => {
      // 添加首页的重定向
      if (item.path === '/') {
        res.push({
          path: '/',
          meta: item.meta,
          redirect: item.redirect
        })
      }
      if (item.children && item.children.length) {
        if (item.component && layoutNames.includes(item.component.name)) {
          currentLayout = item.component.name
        }
        mapMenus(item.children)
      } else {
        // 将当前路由添加进去
        res.push({
          ...item,
          // /abc/ 处理成 /abc
          path: item.path.replace(/\/$/, ''),
          meta: {
            ...item.meta,
            layout: currentLayout
          }
        })
      }
    })
  }
  mapMenus(menus)
  return res
}
