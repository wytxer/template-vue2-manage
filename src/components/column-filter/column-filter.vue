<template>
  <div class="columns-filter-wrap TAR FB1">
    <a-dropdown :trigger="['click']" placement="topRight">
      <a class="ant-dropdown-link" @click="e => e.preventDefault()"> 列筛选
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay" class="PL10 FB FBFD-C">
        <!-- 全选控制 -->
        <a-checkbox-group v-if="allColumns.length > 5" v-model="checkAll" @change="onCheckAllChange">
          <a-checkbox class="PL8 PR8 PT4 PB4" :indeterminate="indeterminate" value="all">
            全选
          </a-checkbox>
        </a-checkbox-group>

        <!-- 字段列表 -->
        <a-checkbox-group :value="selectedMenus" @change="onColumnChange">
          <a-menu-item class="PL8 PR8 PT4 PB4" v-for="item in menus" :key="item.value">
            <a-checkbox :value="item.value">{{ item.title }}</a-checkbox>
          </a-menu-item>
        </a-checkbox-group>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
/**
 * 列筛选组件，内置了全选、字段的筛选、列宽度缓存功能，同时缓存了筛选条件，便于下次打开时默认勾选，用于表格列表页面
 */
export default {
  name: 'column-filter',
  props: {
    // 需要展示在列筛选的字段列表
    columns: {
      type: Array,
      default: () => []
    },
    // 用于字段筛选控制，每次切换都会调用该方法同步筛选条件
    onChange: {
      type: Function,
      default: e => {}
    }
  },
  data () {
    return {
      // 列筛选数据，从 allColumns 里面处理出来的，只有 title 和 value 字段
      menus: [],
      // 列筛选选中数据
      selectedMenus: [],
      // 全量的 columns，包含完整的 column 配置字段
      allColumns: [],
      // 是否全选
      checkAll: [],
      indeterminate: true
    }
  },
  created () {
    this.initColumns()
  },
  methods: {
    initColumns () {
      // 获取缓存中数据，包含筛选项、分页、列筛选
      const cacheData = this.$utils.getStorage(this.$route.path)
      // 初始列筛选列选中项
      const defaultSelectedMenus = []
      // 保存全量的 columns，以保证子组件的更新不会更改父组件的值，这里只有初始化的时候才会调用
      const allColumns = this.columns.slice()
      // 初始列筛选数据
      const menus = allColumns.map(item => {
        defaultSelectedMenus.push(item.dataIndex)
        return {
          title: item.title,
          value: item.dataIndex
        }
      })

      // 获取缓存的列选中项
      const selectedMenus = cacheData.selectedMenus || defaultSelectedMenus
      // 如果有缓存的 columns 数据，进行 width 覆盖
      if (cacheData.columns) {
        allColumns.forEach((item, i) => {
          const result = cacheData.columns.find(cItem => cItem.dataIndex === item.dataIndex)
          // 缓存中的宽度覆盖初始的 columns 宽度
          if (result && result.width) {
            item.width = result.width
          }
        })
      }
      // 展示选中的列
      const selectedColumns = allColumns.filter(item => selectedMenus.includes(item.dataIndex))
      this.menus = menus
      this.selectedMenus = selectedMenus
      this.allColumns = allColumns
      this.onChange(selectedColumns)
      // 全选状态同步
      this.indeterminate = selectedMenus.length !== menus.length
      this.checkAll = this.indeterminate ? [] : ['all']
    },
    // value 是选中的列的数组，例如：['actions', 'lastStatus', 'times']
    onColumnChange (value) {
      this.selectedMenus = value
      const selectedColumns = []
      this.allColumns.forEach(item => {
        if (value.includes(item.dataIndex)) {
          selectedColumns.push(item)
        }
      })
      // 同步更新全选的状态
      this.indeterminate = !!value.length && value.length < this.allColumns.length
      this.checkAll = value.length === this.allColumns.length ? ['all'] : []
      // 同步到最新的父组件 columns 数据
      this.onChange(selectedColumns)
      this.$utils.setStorage(this.$route.path, { selectedMenus: this.selectedMenus })
    },
    // 全选切换
    onCheckAllChange (value) {
      this.checkAll = value
      this.selectedMenus = value.length ? this.allColumns.map(item => item.dataIndex) : []
      this.indeterminate = false
      this.onChange(value.length ? this.allColumns.slice() : [])
    }
  }
}
</script>
