import { mapState } from 'vuex'
import { Menu, Icon } from 'ant-design-vue'

export default {
  name: 'side-menu',
  props: {
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      const keys = []
      vm.menus.forEach(item => keys.push(item.path))
      return keys
    },
    // 缓存一份给标签页导航用
    navMenus () {
      return this.$utils.clone(this.menus)
    },
    // 是否显示面包屑
    ...mapState({
      showBreadcrumb: state => state.app.navMode === 'breadcrumb',
      permissions: state => state.user.roles
    })
  },
  mounted () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    $route: function () {
      this.updateMenu()
    }
  },
  methods: {
    onOpenChange (openKeys) {
      // 在水平模式下时执行，并且不再执行后续
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys
        return
      }
      // 非水平模式时
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    onSelect ({ item, key, selectedKeys }) {
      this.selectedKeys = selectedKeys
      this.$emit('select', { item, key, selectedKeys })
    },
    updateMenu () {
      if (this.showBreadcrumb) {
        const routes = this.$route.matched.filter(item => item.path)
        const { hidden } = this.$route.meta
        if (routes.length >= 3 && hidden) {
          routes.pop()
          const route = routes.find(item => item.meta.hideChildren) || routes[routes.length - 1]
          this.selectedKeys = [route.path]
        } else {
          const route = routes.find(item => item.meta.hideChildren) || routes.pop()
          this.selectedKeys = [route.path]
        }
        const openKeys = []
        if (this.mode === 'inline') {
          routes.forEach(item => {
            openKeys.push(item.path)
          })
        }
        this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
      } else { // 否则如果是标签页导航，菜单的选中从菜单列表里面读取
        const keys = this.findRoutePaths(this.$utils.clone(this.menus))
        this.selectedKeys = keys.slice(-1)
        let openKeys = []
        if (this.mode === 'inline') {
          openKeys = keys.slice(0, keys.length - 1)
        }
        this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
      }
    },
    // 找出当前最终路由对应的 path 列表
    findRoutePaths (data) {
      let routes = []
      let currentIndex = 0
      // 控制递归结束的标记
      let over = false
      const findCurrentRoute = items => items.find(item => {
        // 当前路由模式下这个路由是一定会找到的
        if (item.path === this.$route.path) {
          routes.push(item)
          // 已经找到了叶子路由就删掉后面的了
          delete item.children
          over = true
          return true
        } else if (item.children && item.children.length && !over) {
          routes[currentIndex] = item
          currentIndex += 1
          // 排除与当前一级路由不匹配的路由
          routes = routes.filter(route => route && route.path && this.$route.path.indexOf(route.path) >= 0)
          findCurrentRoute(item.children)
          // 上一层结束了还是没有找到最终路由的话，回退下标
          currentIndex -= 1
          return false
        }
        return false
      })
      findCurrentRoute(data)
      return routes.filter(item => !item.hidden).map(item => item.path)
    },
    renderItem (menu) {
      if (!menu.hidden) {
        if (menu.meta.permissions && !menu.meta.permissions.find(name => this.permissions.includes(name))) {
          return null
        }
        return menu.children && !menu.hideChildrenInMenu ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
      }
      return null
    },
    // 渲染叶子菜单
    renderMenuItem (menu) {
      if (menu.meta.permissions && !menu.meta.permissions.find(name => this.permissions.includes(name))) {
        return null
      }
      const target = menu.meta.target || null
      const CustomTag = (target && 'a') || 'router-link'
      const props = { to: { path: menu.path } }
      const attrs = { href: target ? menu.meta.href : menu.path, target: menu.meta.target }

      // 把有子菜单的并且父菜单是要隐藏子菜单的，都给子菜单增加一个 hidden 属性，用来给刷新页面时，selectedKeys 做控制用
      if (menu.children && menu.hideChildrenInMenu) {
        menu.children.forEach(item => {
          item.meta = {
            ...item.meta, hidden: true
          }
        })
      }
      return (
        <Menu.Item {...{ key: menu.path }}>
          <CustomTag {...{ props, attrs }}>
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </CustomTag>
        </Menu.Item>
      )
    },
    // 渲染子菜单
    renderSubMenu (menu) {
      if (menu.meta.permissions && !menu.meta.permissions.find(name => this.permissions.includes(name))) {
        return null
      }
      const items = []
      if (!menu.hideChildrenInMenu) {
        menu.children.forEach(item => items.push(this.renderItem(item)))
      }
      return (
        <Menu.SubMenu {...{ key: menu.path }}>
          <span slot="title">
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </span>
          {items}
        </Menu.SubMenu>
      )
    },
    // 渲染图标
    renderIcon (icon) {
      if (icon === 'none' || icon === undefined) {
        return null
      }
      const props = {}
      typeof (icon) === 'object' ? props.component = icon : props.type = icon
      return (
        <Icon {...{ props }} />
      )
    }
  },
  render () {
    const newProps = {
      props: {
        mode: this.mode,
        theme: this.theme,
        openKeys: this.openKeys,
        selectedKeys: this.selectedKeys
      },
      on: {
        openChange: this.onOpenChange,
        select: this.onSelect
      }
    }

    if (this.mode === 'inline') {
      newProps.props.inlineCollapsed = this.collapsed
    }

    const menuTree = this.navMenus.map(item => {
      if (item.hidden) {
        return null
      }
      return this.renderItem(item)
    })

    return <Menu {...newProps}>{menuTree}</Menu>
  }
}
