<template>
  <a-form-model ref="form" class="ak-query-filter" :model="queryFilters" :colon="false">
    <a-row :gutter="24">
      <a-col v-bind="$wrapperCol">
        <a-form-model-item label="名称">
          <a-input v-model="queryFilters.name" placeholder="请输入" />
        </a-form-model-item>
      </a-col>

      <a-col v-bind="$wrapperCol">
        <a-form-model-item label="案件状态">
          <a-input v-model="queryFilters.status" placeholder="请输入" />
        </a-form-model-item>
      </a-col>

      <a-col v-bind="$wrapperCol">
        <a-form-model-item label="文书内容">
          <a-input v-model="queryFilters.content" placeholder="请输入" />
        </a-form-model-item>
      </a-col>

      <a-col v-bind="$wrapperCol" class="action-btn-main">
        <a-button @click="onResetForm">重置</a-button>
        <a-button type="primary" class="ML12" @click="$refs.table && $refs.table.refresh()">查询</a-button>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
export default {
  data () {
    return {
      queryFilters: {}
    }
  },
  methods: {
    onResetForm () {}
  }
}
</script>
