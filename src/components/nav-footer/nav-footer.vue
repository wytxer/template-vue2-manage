<template>
  <footer class="nav-footer">
    Copyright @2022 wytxer
    <a href="https://beian.miit.gov.cn" target="_blank" class="nav-footer__link">
      浙ICP备8888888号-8
    </a>
  </footer>
</template>

<script>
/**
 * 底部导航组件，内置版权、案号等信息，可跟随项目需求修改
 */
export default {
  name: 'nav-footer'
}
</script>

<style lang="less" scoped>
.nav-footer {
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  padding: 32px 16px;
  &__link {
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
