<template>
  <div class="demo-wrap">
    <h2 class="title">测试的全局组件</h2>
    <a-alert
      message="每次要新增全局的组件时，在 src/components/ 里面参照 demo 页面进行开发，然后在 src/components/index.js 里面进行引入"
      type="info"
    />
  </div>
</template>

<script>
export default {
  name: 'demo'
}
</script>

<style lang="less" scoped>
.demo-wrap {
  position: relative;
  padding-bottom: 24px;
  .title {
    font-size: 20px;
  }
}
</style>
