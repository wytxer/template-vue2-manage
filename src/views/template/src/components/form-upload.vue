<template>
  <a-form-model-item label="上传表单" prop="file">
    <ak-upload v-model="values.file" style="min-width: 300px" :action="$api.mockUpload" />
  </a-form-model-item>
</template>
