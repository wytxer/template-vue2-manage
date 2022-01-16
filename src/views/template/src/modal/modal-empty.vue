<template>
  <a-modal
    :width="width"
    :visible="visible"
    :title="title"
    :after-close="onClosed"
    destroyOnClose
    @cancel="onHideModal"
    @ok="onHideModal"
  >
    内容
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      width: 560,
      visible: false,
      title: '弹框标题',
      values: {}
    }
  },
  methods: {
    // 提给外部调用的方法
    showModal () {
      this.visible = true
    },
    // 关闭弹框
    onHideModal () {
      this.visible = false
    },
    // 完全关闭弹框后的回调，可用来重置数据
    onClosed () {
      if (!this.visible) {
        this.values = this.$options.data.call(this).values
      }
    }
  }
}
</script>
