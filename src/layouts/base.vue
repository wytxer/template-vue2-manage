<template>
  <div :class="['layout-base-view', layoutClassName]">
    <nav-header />
    <nav-menu v-if="isSideNav" />
    <!-- 如果是面包屑导航 -->
    <div v-if="showBreadcrumb" key="body-main" class="body-main">
      <div class="breadcrumb-container">
        <div :class="[{container: !isSideNav}]">
          <nav-breadcrumb />
        </div>
      </div>
      <div class="content-main">
        <router-view />
      </div>
    </div>
    <!-- 否则如果是标签页导航 -->
    <div v-else key="tab-body-main" class="body-main tab-body-main">
      <nav-tab />
    </div>
    <dev-drawer v-if="showDevDrawer"></dev-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState({
      layout: state => state.app.layout,
      isSideNav: state => state.app.layout === 'side',
      menuCollapsed: state => state.app.menuCollapsed,
      showBreadcrumb: state => state.app.navMode === 'breadcrumb',
      logoFollowMenu: state => state.app.logoMode === 'followMenu'
    }),
    layoutClassName () {
      const foldName = this.menuCollapsed ? 'fold' : 'unfold'
      const logoName = this.logoFollowMenu ? 'menu' : 'header'
      return `layout-base-${this.layout}-menu-view layout-base-${foldName}-menu-view layout-base-follow-${logoName}-view`
    }
  }
}
</script>

<style lang="less">
.layout-base-view {
  width: 100%;
  min-width: @container-min-width;
  padding-top: @top-header-height;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.1);

  &.layout-base-fold-menu-view {
    padding-left: @side-menu-fold-width;
  }
  &.layout-base-unfold-menu-view {
    padding-left: @side-menu-unfold-width;
  }
  &.layout-base-follow-menu-view {
    &.layout-base-fold-menu-view.layout-base-side-menu-view {
      .nav-header-wrap {
        padding-left: @side-menu-fold-width;
      }
    }
    &.layout-base-unfold-menu-view.layout-base-side-menu-view {
      .nav-header-wrap {
        padding-left: @side-menu-unfold-width;
      }
    }
    .nav-header-wrap {
      z-index: 500;
    }
    .nav-menu-wrap {
      z-index: 600;
      top: 0;
      height: 100vh;
    }
  }
  .body-main {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - @top-header-height);
    background-color: @gray-border-background;
    .content-main {
      // 兼容 IE11
      min-height: 1px;
    }
    // 标签页导航单独调整一部分样式
    &.tab-body-main {
      .common-detail-view .ak-white-container-wrap:first-child,
      .form-complex-view .ak-white-container-wrap:first-child,
      .common-steps-form-view .ak-white-container-wrap:first-child {
        padding-top: 16px;
      }
    }
    .breadcrumb-container {
      background-color: #fff;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    }
  }
  &.layout-base-top-menu-view {
    padding-left: 0;
    .nav-breadcrumb-wrap {
      padding-left: 0;
      padding-right: 0;
    }
    .nav-header-wrap {
      padding-left: 0;
    }
    .nav-menu-wrap {
      height: auto;
    }
    .ak-container-wrap > .container {
      max-width: @container-max-width;
      min-width: @container-min-width;
    }
    .breadcrumb-container {
      .container {
        max-width: @container-max-width;
        min-width: @container-min-width;
        width: 100%;
        padding: 0 @common-spacing;
        margin: 0 auto;
      }
    }
    .ak-tabs-nav {
      margin: 0 0 16px;
    }
  }
}
</style>
