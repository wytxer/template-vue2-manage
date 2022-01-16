<template>
  <a-form-model-item label="单选表单" prop="radio">
    <a-radio-group v-model="values.radio">
      <a-radio value="y">是</a-radio>
      <a-radio value="n">否</a-radio>
    </a-radio-group>
  </a-form-model-item>
</template>
