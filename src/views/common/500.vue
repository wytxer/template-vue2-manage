<template>
  <view-abnormal :imageUrl="imageUrl" status="500" tips="抱歉，服务器出错了" />
</template>

<script>
import ViewAbnormal from './modules/view-abnormal'

import imageUrl from '@/assets/500.svg'

export default {
  components: {
    ViewAbnormal
  },
  data () {
    return {
      imageUrl
    }
  }
}
</script>
