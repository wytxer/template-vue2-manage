<template>
  <a-breadcrumb class="nav-breadcrumb-wrap">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link v-if="item.path !== path && index >= 1" :to="item.path === '' ? '/' : {path: item.path, query: item.query}">
        {{ item.meta.title }}
      </router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
/**
 * 面包屑导航组件，根据路由嵌套关系自动生成导航路径
 */
export default {
  name: 'nav-breadcrumb',
  data () {
    return {
      path: '',
      breadList: [],
      // 缓存一份路由的参数
      routeQuery: {}
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadList = []
      this.path = this.$route.path
      const query = this.$route.query
      const breadList = []
      // 最终要展示的面包屑菜单
      const routes = []
      this.$route.matched.forEach(item => {
        if (item.meta.title) {
          // 过滤掉一层重复的菜单
          if (!routes.find(r => r.path === item.path)) {
            routes.push(item)
          }
        }
      })
      routes.forEach(item => {
        breadList.push(item)
        if (item.path === this.path && !this.$utils.isEmptyObject(query)) {
          this.routeQuery[item.path] = query
        }
      })
      // 将访问路径对应的 query 参数传递过去，刷新的时候用得到
      this.breadList = breadList.map(item => {
        if (this.routeQuery[item.path]) {
          return {
            ...item,
            query: this.routeQuery[item.path]
          }
        }
        return item
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-breadcrumb-wrap {
  padding: 14px @common-spacing 12px @common-spacing;
}
</style>
