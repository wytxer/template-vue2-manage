<template>
  <ak-container>
    <a-card class="workplace-view" :bordered="false">
      工作台
    </a-card>
    <nav-footer style="padding-bottom: 0"></nav-footer>
  </ak-container>
</template>

<script>
import { mapState } from 'vuex'
import { NavFooter } from '@/components'

export default {
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  components: {
    NavFooter
  }
}
</script>

<style lang="less" scoped>
.workplace-view {
  min-height: calc(100vh - 201px);
}
</style>
