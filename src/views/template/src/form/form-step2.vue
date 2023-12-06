<template>
  <div class="page-form-step">
    <a-alert :closable="true" message="确认转账后，资金将直接打入对方账户，无法退回。" class="MB24" />
    <div class="order-info">
      <div class="MB24">
        <span class="order-label">付款账户</span>
        <span>{{ values.paymentUser }}</span>
      </div>
      <div class="MB24">
        <span class="order-label">收款账户</span>
        <span>{{ values.chargeAccount }}</span>
      </div>
      <div class="MB24">
        <span class="order-label">收款人姓名</span>
        <span>{{ values.chargeName }}</span>
      </div>
      <div class="MB24">
        <span class="order-label">转账金额</span>
        <span>{{ values.money }} 元</span>
      </div>
    </div>
    <a-form-model ref="form" class="ak-form-horizontal" :model="values" :rules="rules" :colon="false">
      <a-divider />
      <a-form-model-item label="支付密码" prop="password">
        <a-input v-model="values.password" type="password" class="W100" placeholder="请输入" />
      </a-form-model-item>

      <a-form-model-item label=" ">
        <a-button @click="$emit('prev')">
          上一步
        </a-button>
        <a-button :loading="loading" class="ML16" type="primary" @click="onSubmit">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { onSubmit } from '@/api/mock'

export default {
  props: {
    values: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      rules: {
        password: [{ required: true, message: '请输入支付密码' }]
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const values = {
            ...this.values
          }
          this.loading = true
          onSubmit(values)
            .then(() => {
              this.$message.success('提交成功')
              this.$emit('next')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-form-step {
  max-width: 500px;
  margin: 32px auto 0;
  .ak-form-horizontal {
    :deep(.ant-col.ant-form-item-label) {
      width: 100px;
    }
  }
  .order-info {
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
    .order-label {
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 8px;
    }
  }
}
</style>
