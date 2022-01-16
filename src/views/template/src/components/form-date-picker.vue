<template>
  <a-form-model-item label="时间表单" prop="time">
    <a-date-picker v-model="values.time" show-time type="date" placeholder="请选择日期" class="W100" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
  </a-form-model-item>
</template>
