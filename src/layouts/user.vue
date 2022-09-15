<template>
  <div class="layout-user">
    <div class="layout-user__body">
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
.layout-user {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(237, 240, 245) url("../assets/bg-user.svg") 0 0 no-repeat;
  &__body {
    width: 410px;
    margin: 0 auto;
    min-height: calc(100vh - 85px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
