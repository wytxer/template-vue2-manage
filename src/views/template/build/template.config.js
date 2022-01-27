const fs = require('fs')

const fileNames = [{
  // 对应 src/ 下的页面名称，唯一不可重复
  fileName: 'modal-empty',
  // 该模板通过什么命令创建，唯一不可重复
  prefix: 'ak-modal-empty',
  // 模板的标题，唯一不可重复
  title: '空弹框',
  // 模板的描述概要，尽量简明的说清楚当前模板提供的功能
  description: '里面的内容完全自定义，只是提供了一个弹框的结构'
}, {
  fileName: 'modal-normal',
  prefix: 'ak-modal-normal',
  title: '弹框加单列表单布局',
  description: '弹框里面套了 form 表单，提供了输入框、时间选择框、单选、多选示例'
}, {
  fileName: 'modal-complex',
  prefix: 'ak-modal-complex',
  title: '弹框加两列列表单布局',
  description: '弹框里面套了 form 表单，两列布局，提供了输入框、时间选择框、单选、多选示例，已经做好了加载状态处理，支持编辑场景'
}, {
  fileName: 'drawer-empty',
  prefix: 'ak-drawer-empty',
  folder: 'modal',
  title: '空抽屉',
  description: '里面的内容完全自定义，只是提供了一个抽屉的结构'
}, {
  fileName: 'drawer-form',
  prefix: 'ak-drawer-form',
  folder: 'modal',
  title: '抽屉加表单布局',
  description: '抽屉里面套了 form 表单，提供了输入框、字段注解、长标签示例'
}, {
  fileName: 'detail-base',
  prefix: 'ak-detail-base',
  title: '简单的详情展示',
  description: '包含头部基础信息、操作、字段卡片展示示例'
}, {
  fileName: 'detail-common',
  prefix: 'ak-detail-common',
  title: '通用的详情展示',
  description: '包含头部基础信息、操作、流程进度、卡片信息、表格列表示例'
}, {
  fileName: 'table-base',
  prefix: 'ak-table-base',
  title: '简单列表',
  description: '支持列表内容的展示'
},
{
  fileName: 'table-drag',
  prefix: 'ak-table-drag',
  title: '拖拽列表',
  description: '支持列表的列拖拽、列筛选'
},
{
  fileName: 'table-middle',
  prefix: 'ak-table-middle',
  title: '中等列表',
  description: '包含筛选项、行操作、表单提交、排序、筛选'
},
{
  fileName: 'table-complex',
  prefix: 'ak-table-complex',
  title: '复杂列表',
  description: '包含编辑、列筛选、筛选项收缩、文字卡片提示、气泡框提示、货币校验、文字超出判断等'
},
{
  fileName: 'table-tabs-nav',
  prefix: 'ak-table-tabs-nav',
  title: '卡片列表',
  description: '包含选项卡筛选、文字超出判断等'
}, {
  fileName: 'form-page-base',
  prefix: 'ak-form-page-base',
  title: '页面表单结构',
  description: '页面表单结构，内容自定义填充'
}, {
  fileName: 'form-single',
  prefix: 'ak-form-single',
  title: '单列的页面表单',
  description: '包含提交示例、单列表单布局'
}, {
  fileName: 'form-horizontal',
  prefix: 'ak-form-horizontal',
  title: '单列左对齐表单',
  description: '包含提交示例、宽度设置、水平表单布局'
}, {
  fileName: 'form-double',
  prefix: 'ak-form-double',
  title: '双列的页面表单',
  description: '包含提交示例、双列表单布局'
}, {
  fileName: 'form-normal',
  prefix: 'ak-form-normal',
  title: '三列的页面表单',
  description: '包含表单分块、保存、提交示例、多个表单统一提交'
}, {
  fileName: 'form-complex',
  prefix: 'ak-form-complex',
  title: '复杂的页面表单',
  description: '包含字段注解、表单分块、保存、提交示例，不仅有三列布局的场景，还涉及列表展示、列表的增删改操作'
}, {
  fileName: 'form-step',
  prefix: 'ak-form-step-box',
  title: '分布表单容器',
  description: '在同一个页面进行分步的表单填写操作，父组件页面'
}, {
  fileName: 'form-step1',
  prefix: 'ak-form-step1',
  title: '分布表单 - 第一步',
  description: '在同一个页面进行分步的表单填写操作，第一步页面'
}, {
  fileName: 'form-step2',
  prefix: 'ak-form-step2',
  title: '分布表单 - 第二步',
  description: '在同一个页面进行分步的表单填写操作，第二步页面'
}, {
  fileName: 'form-step3',
  prefix: 'ak-form-step3',
  title: '分布表单 - 第三步',
  description: '在同一个页面进行分步的表单填写操作，第三步页面'
}, {
  fileName: 'page-default',
  prefix: 'ak-page-default',
  title: '空白页面',
  description: '快速新建一个空白页面，包含基础的 script、template 结构'
},
// 模板组件
{
  fileName: 'layout-query-filter1',
  prefix: 'ak-layout-query-filter1',
  folder: 'layouts',
  title: '单行筛选项布局 - 简单',
  description: '左边是表单，右边是查询和重置操作'
}, {
  fileName: 'layout-query-filter2',
  prefix: 'ak-layout-query-filter2',
  folder: 'layouts',
  title: '单行筛选项布局 - 带展开收起',
  description: '多行表单，默认展示第一行，第二行点击展开查看更多'
}, {
  fileName: 'layout-card-row1',
  prefix: 'ak-layout-card-row1',
  folder: 'layouts',
  title: '卡片和两行栅格标签',
  description: '卡片和两行栅格标签，字段一行三列展示'
}, {
  fileName: 'layout-card-row2',
  prefix: 'ak-layout-card-row2',
  folder: 'layouts',
  title: '多行栅格标签和操作',
  description: '多行货栅格标签和操作，最常见的案件详情顶部布局'
}, {
  fileName: 'layout-card-steps',
  prefix: 'ak-layout-card-steps',
  folder: 'layouts',
  title: '卡片和进度条',
  description: '卡片和进度条组合展示'
},

// 单个表单组件
{
  fileName: 'form-input',
  prefix: 'ak-form-input',
  folder: 'components',
  title: 'form-input',
  description: 'a-form-item + a-input'
}, {
  fileName: 'form-textarea',
  prefix: 'ak-form-textarea',
  folder: 'components',
  title: 'form-textarea',
  description: 'a-form-item + a-textarea'
}, {
  fileName: 'form-input-number',
  prefix: 'ak-form-input-number',
  folder: 'components',
  title: 'form-input-number',
  description: 'a-form-item + a-input-number'
}, {
  fileName: 'form-select',
  prefix: 'ak-form-select',
  folder: 'components',
  title: 'form-select',
  description: 'a-form-item + a-select'
}, {
  fileName: 'form-switch',
  prefix: 'ak-form-switch',
  folder: 'components',
  title: 'form-switch',
  description: 'a-form-item + a-switch'
}, {
  fileName: 'form-radio',
  prefix: 'ak-form-radio',
  folder: 'components',
  title: 'form-radio',
  description: 'a-form-item + a-radio'
}, {
  fileName: 'form-checkbox',
  prefix: 'ak-form-checkbox',
  folder: 'components',
  title: 'form-checkbox',
  description: 'a-form-item + a-checkbox'
}, {
  fileName: 'form-upload',
  prefix: 'ak-form-upload',
  folder: 'components',
  title: 'form-upload',
  description: 'a-form-item + ex-upload-file'
}, {
  fileName: 'form-date-picker',
  prefix: 'ak-form-date-picker',
  folder: 'components',
  title: 'form-date-picker',
  description: 'a-form-item + a-date-picker'
}, {
  fileName: 'form-range-picker',
  prefix: 'ak-form-range-picker',
  folder: 'components',
  title: 'form-range-picker',
  description: 'a-form-item + a-range-picker'
}, {
  fileName: 'form-cascader',
  prefix: 'ak-form-cascader',
  folder: 'components',
  title: 'form-cascader',
  description: 'a-form-item + a-cascader'
}, {
  fileName: 'form-model-base',
  prefix: 'ak-form-model-base',
  folder: 'components',
  title: 'form-model-base',
  description: 'form-model-base + a-form-item'
}]

const data = {}
// html
const htmlData = {}

fileNames.forEach(item => {
  const isHtml = item.folder === 'components' || item.folder === 'layouts'
  const folder = item.folder || item.fileName.split('-')[0]
  let path = ''
  if (fs.existsSync(`${process.cwd()}/src/${folder}`)) {
    path = `${process.cwd()}/src/${folder}/${item.fileName}.vue`
  } else {
    path = `${process.cwd()}/src/${item.fileName}.vue`
  }
  let content = fs.readFileSync(path).toString()
  // 如果是模板组件，只取出 template 里面的标签
  if (isHtml) {
    // 只取出 template 里面的标签
    content = content.replace(/<template>([\s\S]*)<\/template>([\s\S]*)$/g, '$1')
    // 删除开头的两个空格
    content = content.split('\n')
    // 删除开头和末尾的换行
    content.shift()
    content.pop()
    // 删除开头的两个空格
    content = content.map(s => s.replace(/[\s\b]{2}/, '')).join('\n')
  }
  const body = content
    .replace(/\$/g, '\\$')
    .split('\n')
    .map(str => {
      // 如果当前行全是空格，直接跳过
      if (str.match(/^\s+$/g)) {
        return str
      }
      const res = str.match(/^\s+/g)
      if (res && res[0] && res[0].length) {
        str = str.replace(
          /^\s+/g,
          Array(Math.floor(res[0].length / 2))
            // 将偶数的空格填充成 \t
            .fill(0).map(s => '\t')
            .join('') +
            // 如果存在多余的空格进行补全
            (res[0].length % 2 !== 0 ? ' ' : '')
        )
      }
      return str
    })

  const res = {
    prefix: item.prefix,
    body,
    description: item.description
  }
  if (isHtml) {
    htmlData[item.title] = res
  } else {
    data[item.title] = res
  }
})

// 将配置文件写到模板语法里面去
fs.mkdir(`${process.cwd()}/snippets/snippets`, () => {
  fs.writeFileSync(
    `${process.cwd()}/snippets/snippets/vue-snippets.json`,
    JSON.stringify(data, null, 2)
  )

  fs.writeFileSync(
    `${process.cwd()}/snippets/snippets/html-snippets.json`,
    JSON.stringify(htmlData, null, 2)
  )
})
