<template>
  <view-abnormal :imageUrl="imageUrl" status="404" tips="抱歉，您访问的页面不存在" />
</template>

<script>
import ViewAbnormal from './modules/view-abnormal'

export default {
  components: {
    ViewAbnormal
  },
  data () {
    return {
      imageUrl: require('@/assets/404.svg')
    }
  }
}
</script>
