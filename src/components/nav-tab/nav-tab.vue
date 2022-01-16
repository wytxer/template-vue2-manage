<template>
  <div :class="tabWrapClassName">
    <a-tabs
      type="editable-card"
      size="small"
      hide-add
      v-model="currentRoute.fullPath"
      :class="tabClassName"
      @change="onTabChange"
      @edit="key => onCloseTab(key)"
    >
      <a-tab-pane v-for="(item) in panes" :key="item.fullPath" :closable="panes.length > 1">
        <a slot="tab" class="tab-item" @contextmenu.prevent="onOpenMenu($event, item)">
          {{ item.meta.title }}
        </a>
        <component :is="routeComponents[item.path] || viewNotFound" v-if="!item.reload"></component>
      </a-tab-pane>
    </a-tabs>
    <ul v-show="visible" :style="{left: `${left}px`, top: `${top}px`}" class="nav-tab-action-main">
      <li class="action-btn" @click="onReload">刷新</li>
      <li class="action-btn" v-if="panes.length > 1" @click="onCloseOthers">关闭其他</li>
      <li class="action-btn" v-if="panes.length > 1" @click="onCloseAll">关闭所有</li>
    </ul>
  </div>
</template>

<script>
/**
 * 标签页导航组件，内置标签页切换、关闭、刷新等功能，同时全局注册了一些事件，可用于灵活控制页面的切换、关闭、刷新等功能。
 *  - $reload：刷新当前的标签页
 *  - $closeTab：关闭指定的标签页
 *  - $beforeCloseTab：关闭标签页之前的回调
 */
import { mapState } from 'vuex'

// 回调函数收集器
const callback = {
  beforeCloseTab: []
}

export default {
  name: 'nav-tab',
  data () {
    return {
      // 当前选中的路由
      currentRoute: {
        path: '',
        fullPath: '',
        meta: {},
        query: {},
        params: {},
        reload: false
      },
      // 当前要刷新的路由
      currentReloadRoute: {},
      // 标签页列表
      panes: [],
      // 右键菜单的显示状态
      visible: false,
      top: 0,
      left: 0,
      // 右键菜单的宽度
      navTabActionWidth: 88,
      // 右键菜单一行的高度
      navTabActionLineHeight: 32,
      callback
    }
  },
  provide () {
    return {
      // 刷新当前的标签页
      $reload: this.onReload,
      // 关闭指定的标签页
      $closeTab: this.onCloseTab,
      // 关闭标签页之前的回调
      $beforeCloseTab: this.onBeforeCloseTab
    }
  },
  computed: {
    ...mapState({
      isSideNav: state => state.app.layout === 'side',
      menuCollapsed: state => state.app.menuCollapsed,
      routeComponents: state => state.menu.components
    }),
    tabClassName () {
      let className = ''
      // 如果是侧边栏导航
      if (this.isSideNav) {
        // 如果是展开菜单
        if (this.menuCollapsed) {
          className += ' left-fold'
        } else {
          className += ' left-unfold'
        }
      }
      return className
    },
    tabWrapClassName () {
      let className = 'nav-tab-wrap'
      if (!this.isSideNav) {
        className += ' nav-tab-top-wrap'
      }
      return className
    },
    // 404 页面
    viewNotFound () {
      return this.routeComponents['/*']
    }
  },
  watch: {
    $route () {
      this.getPanes()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created () {
    this.getPanes()
  },
  methods: {
    // 刷新当前标签页
    onReload () {
      this.currentReloadRoute.reload = true
      const index = this.panes.findIndex(item => item.fullPath === this.currentReloadRoute.fullPath)
      this.$set(this.panes, index, this.currentReloadRoute)
      this.$nextTick(() => {
        this.currentReloadRoute.reload = false
        this.$set(this.panes, index, this.currentReloadRoute)
      })
    },
    // 路由切换时新增标签页
    getPanes () {
      const { path, fullPath, meta, query, params, matched } = this.$route
      const newMeta = { ...meta }
      // 标题是必须的，没有的直接跳过
      if (!meta.title) {
        return
      }
      // 如果当前路由的 title 是空的，从路由列表里面找到 path === item.path 的记录并将 title 设置给 meta.title
      if (!newMeta.title) {
        const titles = matched.filter(item => (path === item.path && item.meta.title)).map(item => item.meta.title)
        if (titles.length) {
          newMeta.title = titles.pop()
        }
      }
      // 如果设置了子标题
      if (query.tabTitle) {
        newMeta.title = `${newMeta.title} - ${query.tabTitle}`
      }
      // 如果是同一个地址只是 hash 变了，重新选中当前的标签页
      const newFullPath = this.handleFullPath(fullPath)
      // todo：切换回来的时候，上一次 hash 滚动的页面会丢失掉，因为 fullPath 并没有跟随 hash 的更新而更新
      const oldRoute = this.panes.slice().find(item => this.handleFullPath(item.fullPath) === newFullPath)
      if (oldRoute) {
        // 如果要刷新，字符串拼接拿到的 reload 是字符串，兼容一下
        if (query.reload || query.reload === 'true') {
          oldRoute.fullPath = newFullPath
          this.currentRoute = { ...oldRoute }
          this.currentReloadRoute = { ...oldRoute }
          this.onReload()
        } else {
          this.currentRoute = { ...oldRoute }
        }
        return
      }
      const currentRoute = { path, fullPath, meta: newMeta, query, params, reload: false }
      // 如果是需要重新刷新页面，更新 fullPath 和删除 query.reload
      if (query.reload) {
        currentRoute.fullPath = newFullPath
        delete currentRoute.query.reload
      }
      this.currentRoute = currentRoute
      // 添加一个新的标签页
      if (!this.panes.find(item => item.fullPath === fullPath)) {
        this.panes.push({ ...this.currentRoute })
      }
    },
    // 切换标签页打开不同的页面
    onTabChange (fullPath) {
      const route = this.panes.find(item => item.fullPath === fullPath)
      this.$router.push(route)
    },
    // 提供标签页关闭之前的回调钩子
    onBeforeCloseTab (callback) {
      // 忽略函数之外的参数
      if (typeof callback === 'function') {
        const { fullPath } = this.$route
        const index = this.callback.beforeCloseTab.findIndex(item => item.fullPath === fullPath)
        // 如果之前添加过相同的回调，以最后一次的回调为准
        if (index !== -1) {
          this.callback.beforeCloseTab.splice(index, 1, {
            fullPath: this.$route.fullPath,
            callback
          })
        } else {
          this.callback.beforeCloseTab.push({
            fullPath: this.$route.fullPath,
            callback
          })
        }
      }
    },
    // 关闭标签页
    async onCloseTab (fullPath, fn) {
      const callbacks = this.callback.beforeCloseTab
      const cb = callbacks && callbacks.length && callbacks.find(item => item.fullPath === fullPath)
      // 如果返回 false 则不关闭当前标签页
      if (cb && !await cb.callback(fullPath, fn)) {
        return false
      }

      // 删掉当前点击的标签页
      let prevRoute = null
      const index = this.panes.findIndex((item, i) => {
        if (item.fullPath === fullPath) {
          prevRoute = this.panes[i - 1]
          return true
        }
        return false
      })
      this.panes.splice(index, 1)
      // 如果传递了回调，表示关闭当前标签之后要自定义跳转的页面，包括跳转过去之后刷新等操作
      if (fn && typeof fn === 'function') {
        fn(this)
      } else {
        // 然后打开当前关闭标签页的前面一个
        if (prevRoute && this.currentRoute.fullPath === fullPath) {
          this.$router.push({ ...prevRoute, replace: true })
        }
      }
      // 同时删除 fullPath 对应标签页的回调
      const callbackIndex = callbacks.findIndex(item => item.fullPath === fullPath)
      if (callbackIndex !== -1) {
        callbacks.splice(callbackIndex, 1)
      }
      return true
    },
    // 关闭其他
    async onCloseOthers () {
      // 强制关闭所有标签页面
      // this.panes = this.panes.filter(item => item.fullPath === this.currentRoute.fullPath)
      // this.visible = false

      // 单个关闭，设置了回调的由用户自己决定要不要关闭
      const panes = this.panes.filter(item => item.fullPath !== this.currentRoute.fullPath)
      const closeTab = async () => {
        if (panes.length) {
          const item = panes.shift()
          if (await this.onCloseTab(item.fullPath)) {
            const index = this.panes.findIndex(pItem => pItem.fullPath === item.fullPath)
            if (index !== -1) {
              this.panes.splice(index, 1)
            }
          }
          closeTab()
        }
      }
      this.visible = false
      await closeTab()
    },
    // 关闭所有
    async onCloseAll () {
      // 强制关闭所有标签页面
      // this.panes = []
      // this.$router.replace({
      //   path: '/',
      //   replace: true
      // })

      // 单个关闭，设置了回调的由用户自己决定要不要关闭
      const panes = this.panes.slice()
      const closeTab = async () => {
        if (panes.length) {
          const item = panes.shift()
          if (await this.onCloseTab(item.fullPath)) {
            const index = this.panes.findIndex(pItem => pItem.fullPath === item.fullPath)
            if (index !== -1) {
              this.panes.splice(index, 1)
            }
          }
          closeTab()
        } else if (this.panes.length <= 0) {
          this.$router.push({
            path: '/',
            replace: true,
            query: {
              t: Date.now()
            }
          })
        }
      }
      await closeTab()
    },
    // 打开操作菜单
    onOpenMenu (e, item) {
      const maxLeft = window.innerWidth - this.navTabActionWidth - 32
      const left = e.clientX + 16
      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.offsetY + (this.navTabActionLineHeight * 3) / 2
      this.currentReloadRoute = { ...item }
      this.visible = true
    },
    // 点击空白区域关闭操作弹框
    closeMenu () {
      this.visible = false
    },
    // 删除 hash 参数和 reload 参数，reload 是用来标识是否刷新页面的
    handleFullPath (fullPath) {
      return fullPath.split('#').shift().replace(/(&|\?)reload=true/gi, '')
    }
  }
}
</script>

<style lang="less">
.nav-tab-wrap {
  position: relative;
  > .ant-tabs {
    position: relative;
    > .ant-tabs-bar {
      margin: 0;
      padding: 9.5px 0px;
      height: 47px;
      background-color: #fff;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
      border-bottom: none;
      position: fixed;
      top: 47px;
      left: auto;
      right: 0;
      z-index: 77;
      transition: left 0.25s;
      > .ant-tabs-nav-container {
        height: 28px;
        padding: 0 32px;
        .ant-tabs-tab {
          height: 28px;
          line-height: 26px;
          border: 1px solid #e8e8e8;
          border-radius: 2px;
          margin-right: 8px;
          padding: 0;
          .tab-item {
            display: inline-block;
            width: 100%;
            line-height: 28px;
            padding: 0 16px;
            color: @primary-color;
          }
          .anticon-close {
            position: relative;
            right: 32px;
          }
          &.ant-tabs-tab-active {
            background-color: @primary-color;
            border-color: @primary-color;
            .tab-item,
            .anticon-close {
              color: #fff;
            }
          }
        }
        .ant-tabs-tab-prev,
        .ant-tabs-tab-next {
          width: 32px;
          height: 100%;
          opacity: 1;
          pointer-events: auto;
        }
        .ant-tabs-tab-prev {
          left: 0;
        }
        .ant-tabs-tab-next {
          right: 0;
        }
      }
    }
    > .ant-tabs-content {
      padding-top: 47px;
    }
    // 展开收起的样式
    &.left-fold > .ant-tabs-bar {
      left: @side-menu-fold-width;
    }
    &.left-unfold > .ant-tabs-bar {
      left: @side-menu-unfold-width;
    }
  }
  &.nav-tab-top-wrap {
    > .ant-tabs {
      > .ant-tabs-bar {
        left: 0;
        > .ant-tabs-nav-container {
          max-width: 1200px;
          min-width: 992px;
          width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
  .nav-tab-action-main {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: fixed;
    list-style-type: none;
    width: 88px;
    padding: 5px 0;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
    .action-btn {
      margin: 0;
      line-height: 32px;
      padding: 0 8px;
      text-align: center;
      color: #333;
      cursor: pointer;
      transition: all 0.25s;
      &:hover {
        background-color: @primary-color;
        color: #fff;
      }
    }
  }
}
</style>
