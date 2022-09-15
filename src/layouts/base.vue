<template>
  <div :class="['layout-base', layoutClassName]">
    <nav-header />
    <nav-menu v-if="isSideNav" />
    <!-- 如果是面包屑导航 -->
    <div v-if="showBreadcrumb" key="breadcrumb" class="layout-base__body">
      <div class="layout-base__breadcrumb-wrapper">
        <div :class="[{container: !isSideNav}]">
          <nav-breadcrumb />
        </div>
      </div>
      <div class="layout-base__content">
        <router-view />
      </div>
    </div>
    <!-- 否则如果是标签页导航 -->
    <div v-else key="tab" class="layout-base__body">
      <nav-tab />
    </div>
    <dev-drawer v-if="showDevDrawer"></dev-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { NavHeader, NavMenu, NavBreadcrumb, NavTab, DevDrawer } from '@/components'

export default {
  name: 'layout-base',
  components: {
    NavHeader,
    NavMenu,
    NavBreadcrumb,
    NavTab,
    DevDrawer
  },
  data () {
    return {
      // 如果是开发环境或者是预览环境的话显示项目配置入口
      showDevDrawer: process.env.NODE_ENV === 'development' || process.env.VUE_APP_BUILD_ENV === 'preview'
    }
  },
  computed: {
    ...mapGetters(['showBreadcrumb']),
    ...mapState({
      layout: state => state.app.layout,
      navMode: state => state.app.navMode,
      isSideNav: state => state.app.layout === 'side',
      menuCollapsed: state => state.app.menuCollapsed,
      logoFollowMenu: state => state.app.logoMode === 'followMenu'
    }),
    layoutClassName () {
      const foldName = this.menuCollapsed ? 'fold' : 'unfold'
      const logoName = this.logoFollowMenu ? 'menu' : 'header'
      return `layout-base--${this.layout} layout-base--${this.navMode} layout-base--${foldName} layout-base--${logoName}`
    }
  }
}
</script>

<style lang="less" scoped>
.layout-base {
  width: 100%;
  min-width: @container-min-width;
  padding-top: @top-header-height;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.1);

  &--fold {
    padding-left: @side-menu-fold-width;
  }
  &--unfold {
    padding-left: @side-menu-unfold-width;
  }
  &--menu {
    &.layout-base--fold.layout-base--side :deep(.nav-header) {
      padding-left: @side-menu-fold-width;
    }
    &.layout-base--unfold.layout-base--side :deep(.nav-header) {
      padding-left: @side-menu-unfold-width;
    }
    :deep(.nav-header) {
      z-index: 500;
    }
    :deep(.nav-menu) {
      z-index: 600;
      top: 0;
      height: 100vh;
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - @top-header-height);
    background-color: @gray-border-background;
  }
  &__content {
    // 兼容 IE11
    min-height: 1px;
  }
  &__breadcrumb-wrapper {
    background-color: #fff;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  }
  &--top {
    padding-left: 0;
    :deep(.nav-breadcrumb) {
      padding-left: 0;
      padding-right: 0;
    }
    :deep(.nav-header) {
      padding-left: 0;
    }
    :deep(.nav-menu) {
      height: auto;
    }
    :deep(.layout-wrapper > .container) {
      max-width: @container-max-width;
      min-width: @container-min-width;
    }
    .layout-base__breadcrumb-wrapper .container {
      max-width: @container-max-width;
      min-width: @container-min-width;
      width: 100%;
      padding: 0 @common-spacing;
      margin: 0 auto;
    }
    :deep(.ak-tabs-nav) {
      margin: 0 0 16px;
    }
  }
  &--tab {
    :deep(.page-detail .layout-wrapper:first-child),
    :deep(.page-form .layout-wrapper:first-child) {
      padding-top: 16px;
    }
  }
}
</style>
