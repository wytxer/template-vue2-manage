<template>
  <div class="layout-user-view">
    <div class="content-main">
      <router-view />
    </div>
    <nav-footer />
  </div>
</template>

<script>
import { NavFooter } from '@/components'

export default {
  name: 'layout-user',
  components: {
    NavFooter
  }
}
</script>

<style lang="less" scoped>
.layout-user-view {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(237, 240, 245) url(../assets/bg-user.svg) 0 0 no-repeat;
  .content-main {
    min-height: calc(100vh - 85px);
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 368px;
    }
  }
  :deep(.user-view) {
    width: 368px;
  }
}
</style>
