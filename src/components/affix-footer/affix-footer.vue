<template>
  <div class="affix-footer-wrap">
    <div class="toolbar-container" :style="toolbarStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * 底部工具栏组件，主用于表单提交时操作置底的情况，内置了样式和布局切换支持
 */
import { mapGetters } from 'vuex'

export default {
  name: 'affix-footer',
  computed: {
    ...mapGetters(['isSideMenu']),
    toolbarStyle () {
      return this.isSideMenu ? { width: '100%' } : {}
    }
  }
}
</script>

<style lang="less" scoped>
.affix-footer-wrap {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 1;
  .toolbar-container {
    width: 1200px;
    padding: 0 24px;
    margin: 0 auto;
    height: 56px;
    line-height: 56px;
    text-align: right;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
    background: #fff;
    border-top: 1px solid #e8e8e8;
  }
}
</style>
