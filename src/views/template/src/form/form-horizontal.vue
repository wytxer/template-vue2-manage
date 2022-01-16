<template>
  <ak-container class="ak-pb0" card>
    <a-form-model ref="form" class="ak-form-horizontal" :model="values" :rules="rules" :colon="false">
      <a-form-model-item label="股票代码" prop="code">
        <a-input v-model="values.code" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="涉及证券名称" prop="name">
        <a-input v-model="values.name" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="标的金额" prop="money">
        <a-input v-model="values.money" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="涉及投资者交易编码" prop="tradeCode">
        <a-input v-model="values.tradeCode" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="中国证监会处罚决定书编号" prop="punishNumber">
        <a-input v-model="values.punishNumber" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="违法信息披露事实" prop="message">
        <a-textarea v-model="values.message" placeholder="请输入" class="W750" />
      </a-form-model-item>

      <a-form-model-item label="备注" prop="mark">
        <a-textarea v-model="values.mark" placeholder="请输入" class="W750" />
      </a-form-model-item>

      <a-form-model-item label=" ">
        <a-button @click="onResetForm">
          重置
        </a-button>
        <a-button type="primary" class="ML16" @click="onSubmit" :loading="loading">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </ak-container>
</template>

<script>
import { onSubmit } from '@/api/mock'

const rules = {
  code: [{ required: true, message: '不允许为空' }],
  name: [{ required: true, message: '不允许为空' }],
  money: [{ required: true, message: '不允许为空' }],
  tradeCode: [{ required: true, message: '不允许为空' }],
  punishNumber: [{ required: true, message: '不允许为空' }],
  message: [{ required: true, message: '不允许为空' }]
}

export default {
  data () {
    return {
      values: {},
      rules,
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const values = {
            ...this.values
          }
          onSubmit(values)
            .then(() => {
              this.$refs.form.resetFields()
              this.$message.success('提交成功')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    onResetForm () {
      this.$refs.form.resetFields()
      this.values = this.$options.data.call(this).values
    }
  }
}
</script>
