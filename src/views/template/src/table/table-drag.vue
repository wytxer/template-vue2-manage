<template>
  <layout-wrapper class="ak-card-table" card :bodyStyle="{padding: 0}">
    <div class="ak-table-actions FB FBJC-SB FBAI-C">
      <div>
        <a-button class="MR16">批量重开</a-button>
        <a-button>新增角色</a-button>
      </div>
      <column-filter :columns="columns" :onChange="value => columns = value"></column-filter>
    </div>

    <ak-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :loadData="queryTableData"
      :scroll="{x: columnsWidth}"
      drag
      columnStorage
    >
      <!-- tooltip -->
      <template #tooltip="text">
        <ak-auto-tooltip :text="text" />
      </template>

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
      <template #action="text, record">
        <a>详情</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除该条记录吗？" @confirm="onDelete(record)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </ak-table>
  </layout-wrapper>
</template>

<script>
import { queryTableData } from '@/api/mock'

const columns = [{
  title: '#',
  dataIndex: 'id',
  width: 160
}, {
  title: '负责人',
  dataIndex: 'name',
  width: 180
}, {
  title: '描述',
  dataIndex: 'description',
  scopedSlots: { customRender: 'tooltip' },
  width: 180
}, {
  title: '财富',
  dataIndex: 'money',
  scopedSlots: { customRender: 'money' },
  align: 'right',
  width: 180
}, {
  title: '状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' },
  align: 'center',
  width: 200
}, {
  title: '更新时间',
  dataIndex: 'updateTime'
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
  width: 200,
  fixed: 'right'
}]

export default {
  data () {
    return {
      advanced: false,
      queryFilters: {},
      columns
    }
  },
  computed: {
    // 动态计算 columns 宽度
    columnsWidth () {
      return this.columns.reduce((total, item, index) => {
        return total + (item.width || 240)
      }, 0)
    }
  },
  methods: {
    queryTableData,
    // 重置
    onResetForm () {
      this.$refs.form.resetFields()
      this.queryFilters = this.$options.data.call(this).queryFilters
      this.$refs.table.refresh(true)
    },
    // 删除记录
    onDelete (record) {
      this.$message.info('点了确认删除')
    }
  }
}
</script>
