<template>
  <a-form-model-item label="多级下拉表单" prop="cascader">
    <a-cascader v-model="values.cascader" placeholder="请选择" :options="options" />
  </a-form-model-item>
</template>
