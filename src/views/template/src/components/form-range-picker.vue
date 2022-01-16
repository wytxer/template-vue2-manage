<template>
  <a-form-model-item label="日期表单" prop="date">
    <a-range-picker v-model="values.date" class="W100" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
  </a-form-model-item>
</template>
