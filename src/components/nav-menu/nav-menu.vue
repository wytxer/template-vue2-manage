<template>
  <div :class="['nav-menu-wrap', `nav-menu-${theme}-wrap`, `collapsed-${menuCollapsed}`]">
    <nav-logo v-if="logoFollowMenu" :logo="logo" :slogan="slogan" />
    <div class="menu-main">
      <side-menu :collapsed="menuCollapsed" :menus="menus" :theme="theme" :mode="mode" @select="onSelect"></side-menu>
    </div>

    <div v-if="showCollapsedAction" class="menu-action-main">
      <a-icon :type="menuCollapsed ? 'menu-unfold' : 'menu-fold'" @click="onCollapsed" />
    </div>
  </div>
</template>

<script>
/**
 * 左侧菜单导航组件，内置了样式、菜单切换和布局切换支持
 */
import { mapState } from 'vuex'
import SideMenu from './menu'
import NavLogo from '../nav-logo'

export default {
  name: 'nav-menu',
  props: {
    // 是否显示折叠展开的操作按钮
    showCollapsedAction: {
      type: Boolean,
      default: true
    }
  },
  components: {
    SideMenu,
    NavLogo
  },
  data () {
    return {
      // 当前已选中的菜单
      selectedKeys: []
    }
  },
  computed: {
    ...mapState({
      theme: state => state.app.menuTheme,
      mode: state => state.app.menuMode,
      logo: state => state.app.logo,
      slogan: state => state.app.slogan,
      logoFollowMenu: state => state.app.logoMode === 'followMenu',
      menuCollapsed: state => state.app.menuCollapsed,
      menus: state => state.menu.routes.find(item => item.path === '/').children
    })
  },
  methods: {
    // 菜单展开收起切换
    onCollapsed () {
      this.$store.commit('SET_MENU_COLLAPSED', !this.menuCollapsed)
    },
    onSelect (value) {
      this.$emit('select', value)
    }
  }
}
</script>
<style lang="less" scoped>
.nav-menu-wrap {
  height: calc(100vh - @top-header-height);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: background-color 0.25s;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: @top-header-height;
  left: 0;
  width: auto;
  z-index: 500;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.1);
  &.collapsed-true {
    width: @side-menu-fold-width;
    :deep(.nav-logo-wrap) {
      .logo-slogan {
        display: none;
      }
    }
  }
  &.collapsed-false {
    width: @side-menu-unfold-width;
  }

  .menu-main {
    flex: 1;
    overflow: auto;
  }
  :deep(.ant-menu) {
    border-right-color: transparent;
  }
  .nav-logo-wrap {
    padding: 0 10px;
    justify-content: center;
  }

  .menu-action-main {
    padding: 8px 8px 16px 8px;
    text-align: center;
    font-size: 18px;
  }
  &.nav-menu-dark-wrap {
    background-color: @layout-header-background;
    .menu-action-main,
    :deep(.nav-logo-wrap) {
      color: #ffffff;
    }
  }
  &.nav-menu-light-wrap {
    background-color: #fff;
  }
}
</style>
