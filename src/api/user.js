import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    method: 'post',
    url: '',
    mockUrl: '/mock/user/info',
    headerType: 'json',
    data
  })
}

// 登出
export function logout (data) {
  return request({
    method: 'post',
    url: '',
    mockUrl: '/mock/user/logout',
    data
  })
}

// 获取用户信息
export function getUser (data) {
  return request({
    method: 'post',
    url: '',
    mockUrl: '/mock/user/info',
    data,
    params: {
      t: Date.now()
    }
  })
}

// 获取菜单树
export function getMenus (data) {
  return request({
    method: 'post',
    url: '',
    mockUrl: '/mock/menus',
    data
  })
}

// 获取短信验证码
export function getSmsCode (data) {
  return request({
    method: 'post',
    closeAutoTips: true,
    url: '',
    mockUrl: '/mock/user/sms/send',
    headerType: 'json',
    data
  })
}

// 重置密码（用于未登录）
export function resetPassword (data) {
  return request({
    method: 'post',
    closeAutoTips: true,
    url: '',
    mockUrl: '/mock/user/reset/password',
    headerType: 'json',
    data
  })
}

// 重置密码（用于已登录）
export function modifyPassword (data) {
  return request({
    method: 'post',
    closeAutoTips: true,
    url: '',
    mockUrl: '/mock/user/reset/password',
    headerType: 'json',
    data
  })
}

// 注册
export function register (data) {
  return request({
    method: 'post',
    closeAutoTips: true,
    url: '',
    mockUrl: '/mock/user/register',
    headerType: 'json',
    data
  })
}
