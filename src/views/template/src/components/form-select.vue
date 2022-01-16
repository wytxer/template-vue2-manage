<template>
  <a-form-model-item label="下拉表单" prop="select">
    <ak-select v-model="values.select" placeholder="请选择" :load-data="queryRoles" />
  </a-form-model-item>
</template>
