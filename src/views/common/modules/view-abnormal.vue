<template>
  <ak-container>
    <a-card :class="['abnormal-card-view', viewClassName]">
      <div class="abnormal-view">
        <div class="image-box">
          <img :src="imageUrl" />
        </div>
        <div>
          <h2 class="status">{{ status }}</h2>
          <div class="tips">{{ tips }}</div>
          <a-button type="primary" @click="onGotoBack">
            返回
          </a-button>
        </div>
      </div>
    </a-card>
  </ak-container>
</template>

<script>
import { mapState } from 'vuex'

import imageUrl from '@/assets/403.svg'

export default {
  props: {
    // 图片
    imageUrl: {
      type: String,
      default: imageUrl
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
      if (this.$route.meta.user) {
        return 'abnormal-card-user-view'
      }
      return ''
    }
  },
  methods: {
    onGotoBack () {
      const routers = {}
      const findFirstPath = data => {
        data.forEach(item => {
          if (item.children && item.children.length) {
            findFirstPath(item.children)
          } else {
            routers[Object.keys(routers).length] = item.redirect || item.path
          }
        })
      }
      findFirstPath(this.menus)
      this.$router.push(routers[0])
    }
  }
}
</script>

<style lang="less" scoped>
.abnormal-card-view {
  height: calc(100vh - 143px);
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  &.abnormal-card-user-view {
    background-color: transparent;
  }
}
.abnormal-view {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  .image-box {
    padding-right: 80px;
  }
  img {
    width: 410px;
  }
  .status {
    font-size: 50px;
    margin: 0;
  }
  .tips {
    color: #999999;
    margin: 10px 0 20px;
  }
}
</style>
