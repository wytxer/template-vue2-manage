<template>
  <ak-container card class="common-modal-view">
    <a-button @click="$refs.modalEmpty.showModal()">空弹框</a-button>
    <a-button @click="$refs.modalNormal.showModal()" class="ML16">单列表单弹框</a-button>
    <a-button @click="$refs.modalComplex.showModal()" class="ML16">两列表单弹框</a-button>
    <a-button @click="onOpenDriver" class="ML16">打开新手引导</a-button>

    <modal-empty ref="modalEmpty" />
    <modal-normal ref="modalNormal" />
    <modal-complex ref="modalComplex" />
  </ak-container>
</template>

<script>
import ModalEmpty from './modal-empty'
import ModalNormal from './modal-normal'
import ModalComplex from './modal-complex'

export default {
  components: {
    ModalEmpty,
    ModalNormal,
    ModalComplex
  },
  methods: {
    onOpenDriver () {
      const driver = this.$shepherd({
        confirmCancel: false
      })

      driver.addSteps([{
        attachTo: {
          element: document.querySelector('.layout-base-view .ant-menu'),
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
          element: document.querySelector('.layout-base-view .nav-header-wrap .action-main'),
          on: 'auto'
        },
        title: '顶部用户栏',
        text: '可以在这里查看当前登录的用户、操作退出登录，如果开启了「全局错误捕获」的话，还可以在这里查看系统的报错日志'
      }, {
        attachTo: {
          element: document.querySelector('.dev-drawer-view .dev-drawer-action-main'),
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
