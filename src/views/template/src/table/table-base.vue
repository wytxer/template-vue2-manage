<template>
  <layout-wrapper class="ak-card-table" card :bodyStyle="{padding: 0}">
    <ak-table ref="table" rowKey="id" :columns="columns" :loadData="queryTableData">
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
      <template #action>
        <a>详情</a>
        <a-divider type="vertical" />
        <a>删除</a>
      </template>
    </ak-table>
  </layout-wrapper>
</template>

<script>
import { queryTableData } from '@/api/mock'

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
  dataIndex: 'updateTime'
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  data () {
    return {
      advanced: false,
      queryFilters: {},
      columns
    }
  },
  methods: {
    queryTableData,
    // 重置
    onResetForm () {
      this.$refs.form.resetFields()
      this.queryFilters = this.$options.data.call(this).queryFilters
      this.$refs.table.refresh(true)
    }
  }
}
</script>
