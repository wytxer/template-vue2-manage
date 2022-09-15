<template>
  <layout-wrapper class="ak-card-table" card :bodyStyle="{padding: 0}">
    <a-form-model ref="form" class="ak-query-filter" :model="queryFilters" :colon="false">
      <a-row :gutter="24">
        <a-col v-bind="$wrapperCol">
          <a-form-model-item label="姓名" prop="name">
            <a-input v-model="queryFilters.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col v-bind="$wrapperCol">
          <a-form-model-item label="手机号" prop="phone">
            <a-input v-model="queryFilters.phone" class="W100" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col v-bind="$wrapperCol">
          <a-form-model-item label="使用状态" prop="status">
            <ak-select :loadData="querySelectData" allowClear v-model="queryFilters.status" placeholder="请选择" />
          </a-form-model-item>
        </a-col>

        <div v-show="advanced">
          <a-col v-bind="$wrapperCol">
            <a-form-model-item label="财富" prop="money">
              <a-input-number v-model="queryFilters.money" class="W100" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col v-bind="$wrapperCol">
            <a-form-model-item label="更新日期" prop="date1">
              <a-date-picker v-model="queryFilters.date1" class="W100" placeholder="请选择" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
            </a-form-model-item>
          </a-col>

          <a-col v-bind="$wrapperHalfCol">
            <a-form-model-item label="委托日期" prop="date2">
              <a-range-picker v-model="queryFilters.date2" class="W100" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
            </a-form-model-item>
          </a-col>
        </div>

        <a-col v-bind="$wrapperCol" class="action-btn-main">
          <a-button @click="onResetForm">重置</a-button>
          <a-button type="primary" class="ML12" @click="$refs.table.refresh()">查询</a-button>
          <!-- 展开收起 -->
          <a @click="advanced = !advanced" class="ML12">
            <span v-if="advanced" key="up">
              收起 <a-icon type="up" />
            </span>
            <span v-else key="down">
              展开 <a-icon type="down" />
            </span>
          </a>
        </a-col>
      </a-row>
    </a-form-model>

    <!-- 列筛选 -->
    <div class="ak-table-actions FB FBJC-SB FBAI-C">
      <div>
        <a-button class="MR16">批量封号</a-button>
        <a-button class="MR16">批量开挂</a-button>
        <a-button>批量刷本</a-button>
      </div>
      <column-filter :columns="columns" :onChange="value => columns = value"></column-filter>
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
      <template v-for="col in ['money']" #[col]="text, record">
        <div :key="col">
          <a-input-number
            v-if="record.editable"
            style="margin: -5px 0; width: 100%"
            :value="text"
            :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\$\s?|(,*)/g, '')"
            @change="value => onMoneyChange(value, record.id, col)"
          />
          <template v-else>{{ $utils.formatCurrency(text) }}</template>
        </div>
      </template>

      <!-- tooltip -->
      <template #tooltip="text">
        <ak-auto-tooltip :text="text" />
      </template>

      <!-- 需求方 -->
      <template #name="text">
        <a-popover :title="text">
          <a-card slot="content" :hoverable="false" :body-style="{padding: 0}" :bordered="false">
            <a-card-meta title="负责人" description="这里是描述这里是描述这里是描述">
              <a-avatar slot="avatar" src="https://img1.baidu.com/it/u=2476943548,3374522247&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400" />
            </a-card-meta>
          </a-card>
          <a>{{ text }}</a>
        </a-popover>
      </template>

      <!-- 状态 -->
      <template #status="text">
        <a-badge v-if="text === 1" status="success" text="正常" />
        <a-badge v-else status="error" text="异常" />
      </template>

      <!-- 操作 -->
      <template #action="text, record">
        <!-- 编辑模式 -->
        <span v-if="record.editable" key="edit">
          <a @click="onSave(record.id)">保存</a>
          <a-divider type="vertical" />
          <a @click="onCancel(record.id)">退出</a>
        </span>
        <!-- 回显模式 -->
        <span v-else key="show">
          <a :disabled="!!editKey" @click="onEdit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除？" @confirm="onDelete(record.id)">
            <a :disabled="!!editKey">删除</a>
          </a-popconfirm>
        </span>
      </template>
    </ak-table>
  </layout-wrapper>
</template>

<script>
import { queryTableData, querySelectData } from '@/api/mock'

const columns = [{
  title: '#',
  dataIndex: 'id'
}, {
  title: '需求方',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' }
}, {
  title: '描述',
  dataIndex: 'description',
  scopedSlots: { customRender: 'tooltip' },
  filters: [
    { text: '我是描述', value: '我是描述' },
    { text: '我是张三', value: '我是张三' }
  ],
  onFilter: (value, record) => record.description.includes(value)
}, {
  title: '财富',
  dataIndex: 'money',
  scopedSlots: { customRender: 'money' },
  align: 'right',
  width: '130px',
  needTotal: true
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
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
  width: '200px',
  fixed: 'right'
}]

export default {
  data () {
    return {
      // 高级搜索，展开/关闭
      advanced: false,
      // 查询参数
      queryFilters: {},
      // 表头
      columns,
      // 列显示
      columnState: false,
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
      // 当前正在编辑的行标识
      editKey: '',
      // 缓存一份数据，用于编辑和回显切换
      cacheData: []
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
    },
    // 实时修改当前表格当前行财富
    onMoneyChange (value, key, column) {
      const newData = [...this.$refs.table.localDataSource]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        target[column] = value
        this.$refs.table.localDataSource = newData
      }
    },
    // 编辑
    onEdit (key) {
      const newData = [...this.$refs.table.localDataSource]
      this.cacheData = newData.map(item => ({ ...item }))
      const target = newData.filter(item => key === item.id)[0] || {}
      this.editKey = key
      target.editable = true
      this.$refs.table.localDataSource = newData
    },
    // 编辑后保存
    onSave (key) {
      const newData = [...this.$refs.table.localDataSource]
      const newCacheData = [...this.cacheData]
      const target = newData.filter(item => key === item.id)[0] || {}
      const targetCache = newCacheData.filter(item => key === item.id)[0] || {}
      delete target.editable
      this.$refs.table.localDataSource = newData
      Object.assign(targetCache, target)
      this.cacheData = newCacheData
      this.editKey = ''
    },
    // 编辑后不保存退出
    onCancel (key) {
      const newData = [...this.$refs.table.localDataSource]
      const target = newData.filter(item => key === item.id)[0] || {}
      this.editKey = ''
      Object.assign(target, this.cacheData.filter(item => key === item.id)[0])
      delete target.editable
      this.$refs.table.localDataSource = newData
    }
  }
}
</script>
