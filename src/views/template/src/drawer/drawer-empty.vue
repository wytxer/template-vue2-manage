<template>
  <a-drawer
    wrapClassName="ak-drawer-empty-wrap"
    :width="width"
    :visible="visible"
    :title="title"
    :closable="true"
    :afterVisibleChange="onClosed"
    destroyOnClose
    @close="onHideModal"
  >
    内容
  </a-drawer>
</template>

<script>
export default {
  data () {
    return {
      width: 780,
      visible: false,
      placement: 'right',
      title: '抽屉标题'
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    onHideModal () {
      this.visible = false
    },
    onClosed () {
      // 抽屉动画完成之后的回调处理，一般用于重置表单的操作
      if (!this.visible) {
        this.values = this.$options.data.call(this).values
      }
    }
  }
}
</script>
