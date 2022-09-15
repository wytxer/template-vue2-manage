/**
 * 通用的路由，包含 403、404、500
 */

const routes = [{
  path: '403',
  component: () => import('@/views/common/403.vue'),
  meta: {
    title: '403',
    hidden: true
  }
}, {
  path: '404',
  component: () => import('@/views/common/404.vue'),
  meta: {
    title: '404',
    hidden: true
  }
}, {
  path: '500',
  component: () => import('@/views/common/500.vue'),
  meta: {
    title: '500',
    hidden: true
  }
}]

// 如果是开发环境或者预览环境，添加测试页面进去
if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_BUILD_ENV === 'preview') {
  routes.push({
    path: 'demo',
    component: () => import('@/views/demo/index.vue'),
    meta: {
      title: '测试页面',
      icon: 'bank',
      // 如果要在菜单里面显示出来测试页面，可以将 hidden 设置为 false
      hidden: false
    }
  })
}
// 这个页面必须放到最后
routes.push({
  path: '*',
  component: () => import('@/views/common/404.vue'),
  meta: {
    title: '404',
    hidden: true
  }
})

export default routes
