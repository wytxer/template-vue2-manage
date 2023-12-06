<template>
  <div class="page-form-step">
    <div class="pay-status">
      <a-icon :class="['status-icon', `status-icon-${status}`]" :type="status === 'success' ? 'check-circle' : 'close-circle'" />
    </div>
    <template v-if="status === 'success'">
      <div class="pay-title">操作成功</div>
      <div class="pay-description">预计两小时到账</div>
    </template>
    <template v-else>
      <div class="pay-title">操作失败</div>
    </template>

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
    <div class="PT32 PB24 TAC">
      <a-button @click="onLookOrders">查看账单</a-button>
      <a-button type="primary" class="ML16" @click="$emit('finish')">再转一笔</a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    values: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 根据实际业务需要修改
      status: Math.random() > 0.1 ? 'success' : 'error'
    }
  },
  methods: {
    onLookOrders () {
      this.$message.info('点击了查看账单')
    }
  }
}
</script>
<style lang="less" scoped>
.page-form-step {
  .pay-status {
    text-align: center;
    padding-top: 24px;
    .status-icon {
      font-size: 72px;
      line-height: 72px;
      margin-bottom: 24px;
      &-success {
        color: @primary-color;
      }
      &-error {
        color: @error-color;
      }
    }
  }
  .pay-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .pay-description {
    text-align: center;
    color: #666;
    margin-bottom: 24px;
  }
  .order-info {
    background: #fafafa;
    padding: 24px 100px;
    border-radius: 2px;
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
