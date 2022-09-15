<template>
  <layout-wrapper card class="page-demo">
    <a-alert message="测试页面" type="info" class="MB24" />

    <a-button v-action.add.edit>添加或编辑</a-button>
    <template v-if="$auth('delete')">
      <div>这里的内容只有删除权限才会显示</div>
    </template>
    <a-button @click="onAddError" class="ML10">添加报错</a-button>
    <a-button @click="onOpenDriver" class="ML10">打开新手引导</a-button>

    <div class="PT24 PB24">
      <a target="_blank" class="MR10" href="https://docs.bszhct.com/docs/wy-cli.html">
        <a-button type="primary">小工具</a-button>
      </a>
      <a target="_blank" class="MR10" href="https://docs.bszhct.com/docs/tv2m-template.html">
        <a-button type="primary">模板库</a-button>
      </a>
      <a target="_blank" class="MR10" href="https://docs.bszhct.com/components/quick-start.html">
        <a-button type="primary">antdv-kit 组件库</a-button>
      </a>
      <a target="_blank" class="MR10" href="https://www.antdv.com/components/button-cn/">
        <a-button type="primary">Antd 组件库</a-button>
      </a>
      <a target="_blank" class="MR10" href="https://docs.bszhct.com/docs/style-utils.html">
        <a-button type="primary">样式库</a-button>
      </a>
    </div>
  </layout-wrapper>
</template>

<script>
import store from '@/store'

export default {
  // 标签页导航再导入 $beforeCloseTab 事件
  inject: store.getters.showBreadcrumb ? [] : ['$beforeCloseTab'],
  created () {
    if (!store.getters.showBreadcrumb) {
      this.$beforeCloseTab((path, fn) => {
        return new Promise(resolve => {
          this.$confirm({
            title: '提示',
            content: '确定关闭当前标签页吗？',
            onOk: () => resolve(true),
            onCancel: () => resolve(false)
          })
        })
      })
    }
  },
  methods: {
    onAddError () {
      // 故意拼写错误让 errorHandler 去捕获
      console.log(this.$api2.download)
    },
    onOpenDriver () {
      const driver = this.$shepherd({
        confirmCancel: false
      })
      driver.addSteps([{
        attachTo: {
          element: document.querySelector('.layout-base .ant-menu'),
          on: 'auto'
        },
        title: '菜单导航',
        text: '可以快速的在首页、弹框、列表、详情、表单、模板组件、初始页面、测试页面之间来回切换',
        buttons: [{
          action () {
            return this.next()
          },
          text: '下一步'
        }]
      }, {
        attachTo: {
          element: document.querySelector('.layout-base .nav-header .nav-header__user'),
          on: 'auto'
        },
        title: '顶部用户栏',
        text: '可以在这里查看当前登录的用户、操作退出登录，如果开启了「全局错误捕获」的话，还可以在这里查看系统的报错日志'
      }, {
        attachTo: {
          element: document.querySelector('.dev-drawer .dev-drawer__action-wrapper'),
          on: 'auto'
        },
        title: '项目配置',
        text: '可以在这里修改菜单风格、侧边栏导航、导航模式、主题色、全局错误捕获状态。',
        buttons: [{
          action () {
            return this.complete()
          },
          text: '完成'
        }]
      }])
      driver.start()
    }
  }
}
</script>
