<template>
  <div class="form-step-view">
    <div class="icon-box">
      <a-icon :class="iconClassName" :type="iconType" />
    </div>
    <template v-if="status === 'success'">
      <div class="title">操作成功</div>
      <div class="description">预计两小时到账</div>
    </template>
    <template v-else>
      <div class="title">操作失败</div>
    </template>

    <div class="form-info-main">
      <div class="MB24">
        <span class="label-name">付款账户：</span>
        <span>{{ values.paymentUser }}</span>
      </div>
      <div class="MB24">
        <span class="label-name">收款账户：</span>
        <span>{{ values.chargeAccount }}</span>
      </div>
      <div class="MB24">
        <span class="label-name">收款人姓名：</span>
        <span>{{ values.chargeName }}</span>
      </div>
      <div class="MB24">
        <span class="label-name">转账金额：</span>
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
      status: Math.random() > 0.1 ? 'success' : 'fail'
    }
  },
  methods: {
    onLookOrders () {
      this.$message.info('点击了查看账单')
    }
  },
  computed: {
    iconType () {
      return this.status === 'success' ? 'check-circle' : 'close-circle'
    },
    iconClassName () {
      return this.status === 'success' ? 'status-icon C-OK' : 'status-icon C-FAIL'
    }
  }
}
</script>
<style lang="less" scoped>
.form-step-view {
  .icon-box {
    text-align: center;
    padding-top: 24px;
    .status-icon {
      font-size: 72px;
      line-height: 72px;
      margin-bottom: 24px;
    }
  }
  .form-info-main {
    background: #fafafa;
    padding: 24px 100px;
    border-radius: 2px;
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
    .label-name {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .description {
    text-align: center;
    color: #666;
    margin-bottom: 24px;
  }
  .money {
    font-family: Helvetica Neue, sans-serif;
    font-weight: bold;
    font-size: 20px;
    line-height: 18px;
  }
}
</style>
