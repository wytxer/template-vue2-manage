<template>
  <ak-container>
    <a-tabs class="ak-tabs-nav" v-model="tabKey" @change="onTabChange" size="small">
      <a-tab-pane v-for="item in tabs" :key="item.key" :tab="item.tab"></a-tab-pane>
    </a-tabs>

    <a-card class="ak-card-table" :bordered="false">
      <div class="ak-table-actions">
        <a-button type="primary">
          一键下线
        </a-button>
        <a-button type="primary" class="ML24">
          一键送挂
        </a-button>
        <a-button type="primary" class="ML24">
          一键祭天
        </a-button>
      </div>

      <ak-table
        ref="table"
        rowKey="id"
        :columns="columns"
        :loadData="queryData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
        :scroll="{x: columns.length * 150}"
      >
        <!-- tooltip -->
        <template #tooltip="text">
          <ak-auto-tooltip :text="text" />
        </template>

        <!-- 状态 -->
        <template #status="text">
          <a-badge v-if="text === 1" status="success" text="正常" />
          <a-badge v-else status="error" text="异常" />
        </template>

        <!-- 操作 -->
        <template #actions>
          <a>详情</a>
        </template>
      </ak-table>
    </a-card>
  </ak-container>
</template>

<script>
import { queryTableData } from '@/api/mock'

const columns = [{
  title: '#',
  dataIndex: 'id'
}, {
  title: '负责人',
  dataIndex: 'name'
}, {
  title: '描述',
  dataIndex: 'description',
  scopedSlots: { customRender: 'tooltip' }
}, {
  title: '状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' }
}, {
  title: '更新时间',
  dataIndex: 'updateTime'
}, {
  title: '操作',
  dataIndex: 'actions',
  scopedSlots: { customRender: 'actions' },
  width: '200px',
  fixed: 'right'
}]

// 标签列表
const tabs = [{
  key: 'tab1',
  tab: '全部（99）'
}, {
  key: 'tab2',
  tab: '已封号（19）'
}, {
  key: 'tab3',
  tab: '已下线（19）'
}, {
  key: 'tab4',
  tab: '已拉胯（13）'
}]

export default {
  data () {
    return {
      advanced: false,
      queryFilters: {},
      // 表头信息
      columns,
      // 行选择的 key 数组
      selectedRowKeys: [],
      // 行选择的完整数据
      selectedRows: [],
      // 行选择配置
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
            this.selectedRows = []
          }
        },
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectedRowKeys = selectedRowKeys
            this.selectedRows = selectedRows
          }
        }
      },
      // 标签页列表
      tabs,
      // 当前选中的 tab 标签页
      tabKey: 'tab1'
    }
  },
  methods: {
    queryData (params) {
      return queryTableData({
        ...params,
        ...this.queryFilters,
        tabKey: this.tabKey
      })
    },
    // 重置
    onResetForm () {
      this.$refs.form.resetFields()
      this.queryFilters = this.$options.data.call(this).queryFilters
      this.$refs.table.refresh(true)
    },
    // tab 切换选中，同时更新筛选项里面的 key
    onTabChange (key) {
      this.tabKey = key
      this.$refs.table.refresh(true)
    }
  }
}
</script>
