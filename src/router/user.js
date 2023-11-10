import LayoutAdmin from '@/layouts/admin.vue'

const routes = [{
  path: '/admin',
  component: LayoutAdmin,
  children: [{
    path: 'login',
    component: () => import('@/views/admin/login.vue'),
    meta: {
      title: '登录'
    }
  }, {
    path: 'reset-password',
    component: () => import('@/views/admin/reset-password.vue'),
    meta: {
      title: '重置密码'
    }
  }, {
    path: 'register',
    component: () => import('@/views/admin/register.vue'),
    meta: {
      title: '注册'
    }
  }, {
    path: '*',
    component: () => import('@/views/common/404.vue'),
    meta: {
      title: '404',
      // 如果是用户模块对 404 的引用，通过这个值自定义样式，改一下背景色
      user: true
    }
  }]
}]

export default routes
