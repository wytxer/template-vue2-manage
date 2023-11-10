<template>
  <div class="admin-header">
    <div class="admin-header__title">{{ title }}</div>
    <div class="admin-header__description" v-if="description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'admin-header',
  props: {
    title: {
      type: String,
      default: '登录'
    },
    description: {
      type: String,
      default: '脚手架开箱即用，搭配模板库急速开发'
    }
  }
}
</script>

<style lang="less" scoped>
.admin-header {
  padding-top: 80px;
  text-align: center;
  &__title {
    font-size: 32px;
  }
  &__description {
    color: #999;
    padding-top: 10px;
  }
}
</style>
