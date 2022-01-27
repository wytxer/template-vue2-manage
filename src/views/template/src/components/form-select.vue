<template>
  <a-form-model-item label="下拉表单" prop="select">
    <ak-select v-model="values.select" placeholder="请选择" :loadData="queryRanks" />
  </a-form-model-item>
</template>
