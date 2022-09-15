<template>
  <div :class="['layout-wrapper', `layout-wrapper--${type}`]">
    <div class="container">
      <a-card v-if="card" v-bind="$attrs" v-on="$listeners" :class="cardClassName" :bordered="bordered">
        <slot></slot>
      </a-card>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
/**
 * 页面容器组件，除详情外的页面基本都需要使用该组件作为页面的根标签，内置了样式和布局切换支持
 */
export default {
  name: 'layout-wrapper',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'gray',
      validator: (value) => ['gray', 'white'].includes(value)
    },
    // 如果 layout-wrapper container 底下只有一个 a-card 的话，设置为 true，内置 card 进去，非详情的页面用到的地方还是挺多的
    card: {
      type: Boolean,
      default: false
    },
    cardClassName: {
      type: String,
      default: null
    },
    // 同 a-card 的 bordered
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.layout-wrapper {
  flex: 1;
  width: 100%;
  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0 @common-spacing;
  }
  &--white {
    background-color: #ffffff;
  }
  &--gray {
    flex: 1;
    background-color: @gray-border-background;
    .container {
      padding-top: @common-spacing;
      padding-bottom: @common-spacing;
    }
  }
}
</style>
