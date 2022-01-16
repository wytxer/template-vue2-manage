export default {
  // 登录状态
  logged: state => state.user.logged,
  // 菜单
  routes: state => (state.menu.routes.find(item => item.path === '/') || {}).children || [],
  // 静态路由
  isStaticRoute: state => state.app.routeMode === 'static',
  // 菜单左右布局
  isSideMenu: state => state.app.layout === 'side',
  // 权限
  permissions: state => state.user.permissions,
  // 导航模式
  showBreadcrumb: state => state.app.navMode === 'breadcrumb',
  // 是否要捕获错误日志
  isCatchError: state => state.app.catchError
}
