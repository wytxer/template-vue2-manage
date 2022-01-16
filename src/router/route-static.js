
import LayoutBase from '@/layouts/base'
import LayoutBlock from '@/layouts/block'

import common from './common'
import user from './user'
import template from './template'

const mainRoutes = [{
  path: '/',
  component: LayoutBase,
  redirect: '/dashboard/workplace',
  children: [{
    path: 'dashboard',
    component: LayoutBlock,
    meta: {
      title: '首页',
      icon: 'dashboard'
    },
    children: [{
      path: 'workplace',
      component: () => import('@/views/dashboard/workplace.vue'),
      meta: {
        title: '工作台'
      }
    }]
  }]
}]

const routes = [...user, ...mainRoutes]

// 将通用路由添加到根路由的子菜单下面
const rootRoute = routes.find(item => item.path === '/') || {}
if (rootRoute.children) {
  rootRoute.children = rootRoute.children.concat(template, common)
}

export default routes
