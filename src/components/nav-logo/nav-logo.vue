<template>
  <router-link to="/" class="nav-logo-wrap">
    <img v-if="logo" class="logo-img" :src="logo" />
    <span v-if="slogan" class="logo-slogan">
      {{ slogan }}
    </span>
  </router-link>
</template>

<script>
/**
 * logo 组件，支持跟随导航和跟随顶部菜单两种选择方式
 */
export default {
  name: 'nav-logo',
  props: {
    logo: {
      type: String,
      default: ''
    },
    slogan: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.nav-logo-wrap {
  height: @top-header-height;
  display: flex;
  align-items: center;
  color: @main-color;
  .logo-img {
    width: 32px;
    height: 32px;
  }
  .logo-slogan {
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
