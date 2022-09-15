<template>
  <router-link to="/" class="nav-logo">
    <img v-if="logo" class="nav-logo__img" :src="logo" />
    <span v-if="slogan && (isSideMenu ? (!logoFollowMenu || (logoFollowMenu && !menuCollapsed)) : true)" class="nav-logo__slogan">
      {{ slogan }}
    </span>
  </router-link>
</template>

<script>
/**
 * logo 组件，支持跟随导航和跟随顶部菜单两种选择方式
 */
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'nav-logo',
  computed: {
    ...mapGetters(['isSideMenu']),
    ...mapState({
      logo: state => state.app.logo,
      slogan: state => state.app.slogan,
      logoFollowMenu: state => state.app.logoMode === 'followMenu',
      menuCollapsed: state => state.app.menuCollapsed
    })
  }
}
</script>

<style lang="less" scoped>
.nav-logo {
  height: @top-header-height;
  display: flex;
  align-items: center;
  color: @main-color;
  &__img {
    width: 32px;
    height: 32px;
  }
  &__slogan {
    margin-left: 8px;
    font-size: 18px;
    max-width: 100%;
    width: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
