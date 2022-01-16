const mock = require('mockjs2')
const { builder } = require('../utils')

const user = {
  ok: builder(),
  error: builder(null, 500),
  info: builder(mock.mock({
    id: 1000,
    nickname: '@cname',
    permissions: ['add', 'edit']
  })),
  menus: builder([{
    path: '/',
    component: 'LayoutBase',
    redirect: '/dashboard/workplace',
    children: [{
      path: 'dashboard',
      component: 'LayoutBlock',
      title: '首页',
      icon: 'dashboard',
      children: [{
        path: 'workplace',
        component: 'workplace',
        title: '工作台'
      }]
    }]
  }])
}

module.exports = {
  'POST /user/login': user.info,
  'POST /user/logout': user.ok,
  'POST /user/info': user.info,
  'POST /menus': user.menus,
  'POST /user/sms/send': user.ok,
  'POST /user/reset/password': user.ok,
  'POST /user/register': user.ok
}
