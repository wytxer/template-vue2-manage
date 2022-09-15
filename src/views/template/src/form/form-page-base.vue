
<template>
  <layout-wrapper class="ak-pb0" card>
    <a-form-model ref="form" layout="vertical" :model="values" :rules="rules" :colon="false">

    </a-form-model>
  </layout-wrapper>
</template>

<script>
export default {
  data () {
    return {
      values: {},
      rules: {},
      options: [{
        value: 1,
        label: '暴乱星海',
        children: [{
          value: 2,
          label: '魔界',
          children: [
            { value: 3, label: '星斗大森林' },
            { value: 4, label: '云岚宗' },
            { value: 5, label: '极限武馆' }
          ]
        }, {
          value: 7,
          label: '结晶山'
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
