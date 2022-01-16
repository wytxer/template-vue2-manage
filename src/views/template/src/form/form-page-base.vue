
<template>
  <ak-container class="ak-pb0" card>
    <a-form-model ref="form" layout="vertical" :model="values" :rules="rules" :colon="false">

    </a-form-model>
  </ak-container>
</template>

<script>
export default {
  data () {
    return {
      values: {},
      rules: {},
      roleKey: { value: 'value', label: 'label' },
      options: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
          children: [
            { value: 3, label: '普陀' },
            { value: 4, label: '黄埔' },
            { value: 5, label: '徐汇' }
          ]
        }, {
          value: 7,
          label: '江苏'
        }]
      }]
    }
  },
  created () {

  },
  methods: {
    queryData () {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
