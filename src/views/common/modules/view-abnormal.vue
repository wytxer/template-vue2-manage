<template>
  <layout-wrapper type="transparent" card :cardClassName="viewClassName">
    <div class="abnormal-body">
      <div><img class="abnormal-image" :src="imageUrl" /> </div>
      <div style="min-width: 180px">
        <h2 class="abnormal-status">{{ status }}</h2>
        <div class="abnormal-tips">{{ tips }}</div>
        <a-button type="primary" @click="onGotoBack">返回</a-button>
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    // 图片
    imageUrl: {
      type: String,
      default: require('@/assets/403.svg')
    },
    // 状态
    status: {
      type: String,
      default: '403'
    },
    // 提示语
    tips: {
      type: String,
      default: '抱歉，您无权访问页面'
    }
  },
  computed: {
    ...mapState({
      menus: state => state.menu.routes.find(item => item.path === '/').children
    }),
    viewClassName () {
      let className = 'page-abnormal'
      if (this.$route.meta.user) {
        className += ' page-abnormal-transparent'
      }
      return className
    }
  },
  methods: {
    onGotoBack () {
      let redirectUrl = ''
      // 获取第一个可访问的路径
      const findFirstPath = data => {
        return data.some(item => {
          redirectUrl = item.redirect || item.path
          if (item.children && item.children.length) return findFirstPath(item.children)
          if (redirectUrl) return true
        })
      }
      findFirstPath(this.menus)
      if (redirectUrl) this.$router.push(redirectUrl)
    }
  }
}
</script>

<style lang="less">
.page-abnormal {
  height: calc(100vh - 127px);
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  &-transparent {
    background-color: transparent;
  }
  .abnormal-body {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    .abnormal-image {
      width: 410px;
      margin-right: 80px;
    }
    .abnormal-status {
      font-size: 50px;
      margin: 0;
    }
    .abnormal-tips {
      color: #999999;
      margin: 10px 0 20px;
    }
  }
}
</style>
