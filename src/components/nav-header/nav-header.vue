<template>
  <div :class="['nav-header', {[`nav-header--${theme}`]: !isSideMenu}]">
    <div :class="contentClassName">
      <div class="FB FB1">
        <nav-logo v-if="logoFollowHeader || !isSideMenu" />
        <div class="nav-header__top-menu" v-if="!isSideMenu">
          <top-menu :menus="menus" :theme="theme" mode="horizontal" class="nav-menu" />
        </div>
      </div>
      <div class="nav-header__user">
        <modal-error v-if="catchError" />
        <a-dropdown v-if="user.logged" placement="bottomRight">
          <span>
            <span>{{ user.nickname }}</span>
            <a-icon type="down" class="ML6" />
          </span>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="$refs.modalModifyPassword.showModal()" class="ML10">修改密码</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="onLogout" class="ML10">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <div v-else>
          <router-link to="/admin/login">
            登录
          </router-link>
        </div>
      </div>
    </div>
    <modal-modify-password ref="modalModifyPassword" />
  </div>
</template>

<script>
/**
 * 头部导航组件，包含 logo、菜单、用户信息等，内置了样式、菜单切换和布局切换支持
 */
import { mapActions, mapGetters, mapState } from 'vuex'
import TopMenu from '../nav-menu/menu'
import ModalError from './modal-error'
import ModalModifyPassword from './modal-modify-password'
import NavLogo from '../nav-logo'

export default {
  name: 'nav-header',
  components: {
    TopMenu,
    ModalError,
    ModalModifyPassword,
    NavLogo
  },
  computed: {
    ...mapGetters(['isSideMenu']),
    ...mapState({
      theme: state => state.app.menuTheme,
      logoFollowHeader: state => state.app.logoMode === 'followHeader',
      menus: state => state.menu.routes.find(item => item.path === '/').children,
      user: state => state.user,
      catchError: state => state.app.catchError
    }),
    contentClassName () {
      let className = 'nav-header__wrapper'
      if (!this.isSideMenu) {
        className += ' container'
      }
      return className
    }
  },
  methods: {
    ...mapActions(['logout']),
    onLogout () {
      this.logout()
        .then(() => {
          this.$message.success('登出成功')
          location.href = `${process.env.VUE_APP_ROUTER_BASE_URL}admin/login`
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.nav-header {
  height: @top-header-height;
  line-height: @top-header-height;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 600;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 @common-spacing;
    &.container {
      max-width: @container-max-width;
      min-width: auto;
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }
  &__top-menu {
    padding-left: 10px;
    :deep(.ant-menu-horizontal) {
      line-height: @top-header-height;
      margin: 0;
    }
  }
  &__user {
    display: flex;
    align-items: center;
  }
  &--dark {
    background-color: @layout-header-background;
    color: #ffffff;
    :deep(.nav-logo) {
      color: #ffffff;
    }
  }
  &--light {
    background-color: #ffffff;
    :deep(.nav-logo) {
      color: @main-color;
    }
  }
}
</style>
