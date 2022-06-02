<template>
  <div class="form-step-view">
    <a-form-model ref="form" class="ak-form-horizontal" :model="values" :rules="rules" :colon="false">
      <a-form-model-item label="付款账户" prop="paymentUser">
        <a-select v-model="values.paymentUser" placeholder="请选择">
          <a-select-option value="1">ued@example.com</a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="收款账户" prop="chargeAccount" class="account-form-item">
        <a-input-group :compact="true">
          <a-select v-model="values.payType" style="width: 100px">
            <a-select-option value="ali">支付宝</a-select-option>
            <a-select-option value="wx">微信</a-select-option>
          </a-select>
          <a-input v-model="values.chargeAccount" placeholder="请输入" />
        </a-input-group>
      </a-form-model-item>

      <a-form-model-item label="收款人姓名" prop="chargeName">
        <a-input placeholder="请输入" v-model="values.chargeName" />
      </a-form-model-item>

      <a-form-model-item label="转账金额" prop="money">
        <a-input prefix="￥" placeholder="请输入" v-model="values.money" />
      </a-form-model-item>

      <a-form-model-item label=" ">
        <a-button type="primary" @click="onSubmit">下一步</a-button>
      </a-form-model-item>
    </a-form-model>

    <a-divider />

    <div class="PT16 PB32">
      <div class="C666">说明</div>
      <div class="C999 PT16">转账到支付宝账户</div>
      <div class="C999 PT8">如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。这里可以放一些关于产品的常见问题说明。这里可以放一些关于产品的常见问题说明。这里可以放一些关于产品的常见问题说明。</div>
      <div class="C666 PT16">转账到银行卡</div>
      <div class="C999 PT8">如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</div>
    </div>
  </div>
</template>

<script>
const rules = {
  paymentUser: [{ required: true, message: '不允许为空' }],
  chargeAccount: [{ required: true, message: '不允许为空' }],
  chargeName: [{ required: true, message: '不允许为空' }],
  money: [{ required: true, message: '不允许为空' }]
}

export default {
  props: {
    values: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      rules
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('next')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form-step-view {
  /deep/ .ant-form {
    max-width: 500px;
    margin: 32px auto 0;
  }
  .ak-form-horizontal {
    /deep/ .ant-col.ant-form-item-label {
      width: 100px;
    }
  }
  .account-form-item {
    /deep/ .ant-input-group {
      display: flex;
      padding: 4px 0;
    }
  }
}
</style>
