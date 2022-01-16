<template>
  <div :class="['nav-header-wrap', {[`nav-header-${theme}-wrap`]: !isSideMenu}]">
    <div :class="contentClassName">
      <div class="left-main">
        <router-link to="/" class="logo-box">
          <img v-if="logo" class="logo-img" :src="logo" />
          <span v-if="slogan" class="logo-slogan">
            {{ slogan }}
          </span>
        </router-link>
        <div class="menu-box" v-if="!isSideMenu">
          <top-menu :menus="menus" :theme="theme" mode="horizontal" class="nav-menu-wrap" />
        </div>
      </div>

      <div class="action-main FB FBAI-C">
        <modal-error v-if="catchError" />
        <a-dropdown v-if="user.logged" key="logged-action" placement="bottomRight">
          <span>
            <span>{{ user.nickname }}</span>
            <a-icon type="down" class="ML6" />
          </span>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="$refs.modalModifyPassword.showModal()" class="item-link ML10">修改密码</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="onLogout" class="item-link ML10">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <div v-else key="login-action">
          <router-link to="/user/login" class="item-link">
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

export default {
  name: 'nav-header',
  components: {
    TopMenu,
    ModalError,
    ModalModifyPassword
  },
  computed: {
    ...mapGetters(['isSideMenu']),
    ...mapState({
      mode: state => state.app.menuMode,
      theme: state => state.app.menuTheme,
      menus: state => state.menu.routes.find(item => item.path === '/').children,
      user: state => state.user,
      logo: state => state.app.logo,
      slogan: state => state.app.slogan,
      catchError: state => state.app.catchError
    }),
    contentClassName () {
      if (this.isSideMenu) {
        return 'header-container'
      }
      return 'header-container container'
    }
  },
  methods: {
    ...mapActions(['logout']),
    onLogout () {
      this.logout()
        .then(() => {
          this.$message.success('登出成功')
          location.href = `${process.env.PROJECT_CONFIG.ROUTER_BASE_URL}user/login`
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.nav-header-wrap {
  height: @top-header-height;
  line-height: @top-header-height;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 999;

  .header-container {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    &.container {
      max-width: @container-max-width;
      min-width: auto;
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }

  .left-main {
    flex: 1;
    display: flex;
    .logo-box {
      display: flex;
      align-items: center;
      color: @main-color;
      .logo-img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
      .logo-slogan {
        font-size: 18px;
      }
    }
    .menu-box {
      padding-left: 10px;
      /deep/ .ant-menu-horizontal {
        line-height: @top-header-height;
        margin: 0;
      }
    }
  }

  &.nav-header-dark-wrap {
    background-color: @layout-header-background;
    color: #ffffff;
    .logo-box {
      color: #ffffff;
    }
  }
  &.nav-header-light-wrap {
    background-color: #ffffff;
    .logo-box {
      color: @main-color;
    }
  }
}
</style>
