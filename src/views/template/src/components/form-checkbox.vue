<template>
  <a-form-model-item label="多选表单" prop="checked">
    <a-checkbox-group v-model="values.checked">
      <a-checkbox value="A">A</a-checkbox>
      <a-checkbox value="B">B</a-checkbox>
      <a-checkbox value="C">C</a-checkbox>
    </a-checkbox-group>
  </a-form-model-item>
</template>
