<template>
  <a-config-provider :locale="locale">
    <router-view v-if="showBreadcrumb" />
    <template v-else>
      <layout-base v-if="$route.meta.layout === 'layout-base'" />
      <layout-admin v-if="$route.meta.layout === 'layout-admin'" />
      <router-view v-else />
    </template>
  </a-config-provider>
</template>

<script>
import { mapState } from 'vuex'
import { LayoutBase, LayoutAdmin } from '@/layouts'
import themeColor from '@/components/dev-drawer/theme-color'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  components: {
    LayoutBase,
    LayoutAdmin
  },
  data () {
    return {
      locale: zhCN
    }
  },
  computed: {
    ...mapState({
      app: state => state.app,
      showBreadcrumb: state => state.app.navMode === 'breadcrumb'
    })
  },
  mounted () {
    // 如果是开发环境或者是预览环境的话支持自定义切换主题色
    if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_BUILD_ENV === 'preview') {
      themeColor.changeColor(this.app.themeColor)
    }
  }
}
</script>

<style lang="less">
  @import './app.less';
</style>
