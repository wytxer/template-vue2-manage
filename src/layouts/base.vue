<template>
  <div :class="['layout-base-view', layoutClassName]">
    <nav-header />
    <div v-if="isSideNav" class="nav-side-menu-main">
      <nav-menu />
    </div>
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
      showBreadcrumb: state => state.app.navMode === 'breadcrumb'
    }),
    layoutClassName () {
      const foldName = this.menuCollapsed ? 'fold' : 'unfold'
      return `layout-base-${this.layout}-menu-view layout-base-${foldName}-menu-view`
    }
  }
}
</script>

<style lang="less">
.layout-base-view {
  width: 100%;
  min-width: @container-min-width;
  padding-top: @top-header-height;

  &.layout-base-fold-menu-view {
    padding-left: @side-menu-fold-width;
  }
  &.layout-base-unfold-menu-view {
    padding-left: @side-menu-unfold-width;
  }
  .nav-side-menu-main {
    position: fixed;
    top: @top-header-height;
    left: 0;
    width: auto;
    z-index: 66;
  }
  .body-main {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - @top-header-height);
    background-color: @gray-border-background;
    .content-main {
      // 兼容 IE11，勿删
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
      margin: -8px 0 16px;
    }
  }
}
</style>
