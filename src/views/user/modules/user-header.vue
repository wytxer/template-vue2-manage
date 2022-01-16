<template>
  <div class="user-header-wrap">
    <div class="title">{{ title }}</div>
    <div class="description" v-if="description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'user-header',
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
.user-header-wrap {
  padding-top: 80px;
  text-align: center;
  .title {
    font-size: 32px;
  }
  .description {
    color: #999;
    padding-top: 10px;
  }
}
</style>
