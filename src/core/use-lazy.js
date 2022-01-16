import Vue from 'vue'
import moment from 'moment'

import 'moment/locale/zh-cn'

/**
 * 按需加载组件
 * 当设置 IS_PRIVATE 为 true 时，需要按需加载组件进来，没有的组件需要在这里添加，不需要的组件进行注释
 * 完整的组件列表：https://github.com/vueComponent/ant-design-vue/blob/master/components/index.js
 */
import {
  Anchor,
  ConfigProvider,
  // Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  FormModel,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  // List,
  // Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  message,
  notification,
  // Descriptions,
  PageHeader,
  Space
} from 'ant-design-vue'

moment.locale('zh-cn')

// Vue.use(Descriptions)
Vue.use(PageHeader)
Vue.use(Space)
Vue.use(Anchor)
Vue.use(ConfigProvider)
// Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(FormModel)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
// Vue.use(List)
// Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(notification)

Vue.prototype.$moment = moment
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
