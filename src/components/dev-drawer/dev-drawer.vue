<template>
  <a-drawer class="dev-drawer" placement="right" title="定制" :width="300" :closable="false" :visible="visible" :drawerStyle="drawerStyle" @close="onClose">
    <a-form-model :model="app" layout="vertical">
      <a-form-model-item label="菜单风格">
        <a-select placeholder="请选择" v-model="app.menuTheme" @change="onThemeChange" :getPopupContainer="trigger => trigger.parentNode">
          <a-select-option v-for="theme in themes" :key="theme.id" :value="theme.id">
            {{ theme.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="布局模式">
        <a-select placeholder="请选择" v-model="app.layout" @change="onLayoutChange" :getPopupContainer="trigger => trigger.parentNode">
          <a-select-option v-for="theme in layouts" :key="theme.id" :value="theme.id">
            {{ theme.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="导航模式">
        <a-select v-model="app.navMode" placeholder="请选择" @change="onNavModeChange" :getPopupContainer="trigger => trigger.parentNode">
          <a-select-option v-for="nav in navMode" :key="nav.id" :value="nav.id">
            {{ nav.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="LOGO 显示模式">
        <a-select v-model="app.logoMode" placeholder="请选择" @change="onLogoModeChange" :getPopupContainer="trigger => trigger.parentNode">
          <a-select-option v-for="nav in logoMode" :key="nav.id" :value="nav.id">
            {{ nav.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="主题色">
        <sketch-picker class="dev-drawer__color-picker" :value="app.themeColor" :preset-colors="colors.map(item => item.id)" @input="onColorChange" />
      </a-form-model-item>

      <a-form-model-item label="全局错误捕获">
        <a-switch checked-children="启用" un-checked-children="禁用" v-model="app.catchError" @change="onCatchErrorChange" />
      </a-form-model-item>
    </a-form-model>

    <!-- 展开 || 收起 -->
    <div slot="handle" class="dev-drawer__action-wrapper" @click="onToggle">
      <a-icon class="dev-drawer__icon" :type="visible ? 'close' : 'setting'" />
    </div>
  </a-drawer>
</template>

<script>
/**
 * 项目配置组件，仅开发环境展示，可以自定义菜单风格、布局、导航模式等
 */
import { mapState } from 'vuex'
import { message } from 'ant-design-vue'
import SketchPicker from 'vue-color/src/components/Sketch'

import themeColor from './theme-color'

export default {
  data () {
    return {
      timer: null,
      drawerStyle: {
        position: 'absolute',
        width: '100%'
      },
      visible: false,
      // 可选主题
      themes: [{
        id: 'dark', name: '深色主题'
      }, {
        id: 'light', name: '亮色主题'
      }],
      // 布局模式
      layouts: [{
        id: 'side', name: '侧边栏导航'
      }, {
        id: 'top', name: '顶部栏导航'
      }],
      // logo 模式
      logoMode: [{
        id: 'followHeader', name: '跟随头部'
      }, {
        id: 'followMenu', name: '跟随菜单'
      }],
      // 导航模式
      navMode: [{
        id: 'breadcrumb', name: '面包屑导航'
      }, {
        id: 'tab', name: '标签导航'
      }],
      colors: [{
        id: '#f5222d', name: '薄暮'
      }, {
        id: '#fa541c', name: '火山'
      }, {
        id: '#faad14', name: '日暮'
      }, {
        id: '#13c2c2', name: '明青'
      }, {
        id: '#52c41a', name: '极光绿'
      }, {
        id: '#1890ff', name: '拂晓蓝（默认）'
      }, {
        id: '#2f54eb', name: '极客蓝'
      }, {
        id: '#722ed1', name: '酱紫'
      }]
    }
  },
  components: {
    SketchPicker
  },
  computed: {
    ...mapState({
      app: state => state.app
    })
  },
  methods: {
    // 关闭抽屉
    onClose () {
      this.visible = false
    },
    // 自动展开收起抽屉
    onToggle () {
      this.visible = !this.visible
    },
    // 设置主题
    onThemeChange (value) {
      this.$store.commit('SET_MENU_THEME', value)
    },
    // 设置布局模式
    onLayoutChange (value) {
      this.$store.commit('SET_LAYOUT', value)
    },
    // 设置导航模式
    onNavModeChange (value) {
      this.$store.commit('SET_NAV_MODE', value)
      this.$nextTick(() => {
        window.location.reload()
      })
    },
    // 设置 logo 显示模式
    onLogoModeChange (value) {
      this.$store.commit('SET_LOGO_MODE', value)
    },
    // 设置错误捕获状态
    onCatchErrorChange (value) {
      this.$store.commit('SET_CATCH_ERROR', value)
      this.$nextTick(() => {
        window.location.reload()
      })
    },
    // 设置主题色
    onColorChange ({ hex: color }) {
      clearTimeout(this.timer)
      this.timer = null
      if (this.app.themeColor !== color) {
        this.timer = setTimeout(() => {
          this.$store.commit('SET_THEME_COLOR', color)
          const hideTips = message.loading('正在切换主题', 0)
          themeColor.changeColor(color).finally(() => {
            setTimeout(() => {
              hideTips()
            }, 16)
          })
        }, 300)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dev-drawer {
  &__color-picker {
    width: 220px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    :deep(.vc-input__input) {
      border: 1px solid #d9d9d9;
      box-shadow: none;
      border-radius: 4px;
    }
  }
  &__action-wrapper {
    position: fixed;
    top: 45%;
    z-index: 1299;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: @primary-color;
    font-size: 16px;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    transition: right 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }
  &__icon {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>

<style lang="less">
// 兼容 IE11 工具条出现在中间的情况
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .dev-drawer.ant-drawer.ant-drawer-right .dev-drawer__action-wrapper {
    right: 0;
  }
  .dev-drawer.ant-drawer.ant-drawer-right.ant-drawer-open
    .dev-drawer__action-wrapper {
    right: 300px;
  }
}
</style>
