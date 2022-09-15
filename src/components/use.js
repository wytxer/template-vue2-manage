import LayoutWrapper from './layout-wrapper'
import AffixFooter from './affix-footer'
import ColumnFilter from './column-filter'

const components = [
  LayoutWrapper,
  AffixFooter,
  ColumnFilter
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  LayoutWrapper,
  AffixFooter,
  ColumnFilter
}

export default {
  install,
  version: '1.0.0'
}
