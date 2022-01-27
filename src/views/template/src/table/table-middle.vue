<template>
  <ak-container card :bodyStyle="{padding: 0}" class="ak-card-table">
    <a-form-model ref="form" class="ak-query-filter" :model="queryFilters" :colon="false">
      <a-row :gutter="24">
        <a-col v-bind="$wrapperCol">
          <a-form-model-item label="更新日期" prop="date">
            <a-date-picker v-model="queryFilters.date" class="W100" placeholder="请选择" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
          </a-form-model-item>
        </a-col>

        <a-col v-bind="$wrapperCol">
          <a-form-model-item label="昵称" prop="name">
            <a-input v-model="queryFilters.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col v-bind="$wrapperCol">
          <a-form-model-item label="使用状态" prop="status">
            <ak-select :loadData="querySelectData" allowClear v-model="queryFilters.status" placeholder="请选择" />
          </a-form-model-item>
        </a-col>

        <a-col v-bind="$wrapperCol" class="action-btn-main">
          <a-button @click="onResetForm">重置</a-button>
          <a-button type="primary" class="ML12" @click="$refs.table.refresh()">查询</a-button>
        </a-col>
      </a-row>
    </a-form-model>

    <ak-table ref="table" rowKey="id" :columns="columns" :loadData="queryData" :alert="options.alert" :rowSelection="options.rowSelection">
      <!-- 财富 -->
      <template #money="text">
        <span>{{ $utils.formatCurrency(text) }}</span>
      </template>

      <!-- 状态 -->
      <template #status="text">
        <a-badge v-if="text === 1" status="success" text="正常" />
        <a-badge v-else status="error" text="异常" />
      </template>

      <!-- 操作 -->
      <template #actions="text, record">
        <a>详情</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除？" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </ak-table>
  </ak-container>
</template>

<script>
import { queryTableData, querySelectData } from '@/api/mock'

const columns = [{
  title: '#',
  dataIndex: 'id'
}, {
  title: '昵称',
  dataIndex: 'name'
}, {
  title: '财富',
  dataIndex: 'money',
  scopedSlots: { customRender: 'money' },
  align: 'right',
  width: '130px'
}, {
  title: '状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' },
  align: 'center'
}, {
  title: '更新时间',
  dataIndex: 'updateTime',
  sorter: true
}, {
  title: '操作',
  dataIndex: 'actions',
  scopedSlots: { customRender: 'actions' },
  width: '200px',
  fixed: 'right'
}]

export default {
  data () {
    return {
      advanced: false,
      // 查询参数
      queryFilters: {},
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
      }
    }
  },
  methods: {
    querySelectData,
    // 加载数据方法
    queryData (params) {
      return queryTableData({
        ...params,
        ...this.queryFilters
      })
    },
    // 重置
    onResetForm () {
      this.$refs.form.resetFields()
      this.queryFilters = this.$options.data.call(this).queryFilters
      this.$refs.table.refresh(true)
    },
    // 删除
    onDelete (id) {
      this.$message.info('点了确认删除')
    }
  }
}
</script>
