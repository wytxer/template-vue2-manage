<template>
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
        <a-button type="primary" class="ML12" @click="$refs.table && $refs.table.refresh()">查询</a-button>
        <!-- 展开收起 -->
        <a @click="advanced = !advanced" class="ML10">
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
</template>

<script>
import { querySelectData } from '@/api/mock'

export default {
  data () {
    return {
      advanced: false,
      queryFilters: {}
    }
  },
  methods: {
    querySelectData,
    onResetForm () {}
  }
}
</script>
