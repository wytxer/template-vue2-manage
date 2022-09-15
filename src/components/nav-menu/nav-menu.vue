<template>
  <div :class="['nav-menu', `nav-menu--${theme}`, {'is-unfold': menuCollapsed, 'is-fold': !menuCollapsed}]">
    <nav-logo v-if="logoFollowMenu" />
    <div class="nav-menu__body">
      <side-menu :collapsed="menuCollapsed" :menus="menus" :theme="theme" :mode="mode" @select="onSelect"></side-menu>
    </div>

    <div v-if="showCollapsedAction" class="nav-menu__action">
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
.nav-menu {
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
  :deep(.ant-menu) {
    border-right-color: transparent;
  }
  .nav-logo {
    padding: 0 10px;
    justify-content: center;
  }
  &.is-unfold {
    width: @side-menu-fold-width;
  }
  &.is-fold {
    width: @side-menu-unfold-width;
  }
  &__body {
    flex: 1;
    overflow: auto;
  }
  &__action {
    padding: 8px 8px 16px 8px;
    text-align: center;
    font-size: 18px;
  }
  &--dark {
    background-color: @layout-header-background;
    .nav-menu__action,
    :deep(.nav-logo) {
      color: #ffffff;
    }
  }
  &--light {
    background-color: #fff;
  }
}
</style>
