import Demo from './demo'
import Container from './container'
import AffixFooter from './affix-footer'
import ColumnFilter from './column-filter'

const components = [
  Demo,
  Container,
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
  Demo,
  Container,
  AffixFooter,
  ColumnFilter
}

export default {
  install,
  version: '1.0.0'
}
