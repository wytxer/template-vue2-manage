<template>
  <layout-wrapper class="ak-pb0" card>
    <a-steps style="max-width: 750px; margin: 16px auto" :current="currentStep">
      <a-step title="填写转账信息" />
      <a-step title="确认转账信息" />
      <a-step title="完成" />
    </a-steps>
    <step1 v-if="currentStep === 0" :values="values" @next="currentStep = 1" />
    <step2 v-else-if="currentStep === 1" :values="values" @next="currentStep = 2" @prev="currentStep = 0" />
    <step3 v-else-if="currentStep === 2" :values="values" @finish="currentStep = 0" />
  </layout-wrapper>
</template>

<script>
import Step1 from './form-step1'
import Step2 from './form-step2'
import Step3 from './form-step3'

export default {
  components: {
    Step1,
    Step2,
    Step3
  },
  data () {
    return {
      currentStep: 0,
      values: {
        payType: 'alipay',
        paymentUser: '1',
        chargeAccount: 'test@example.com',
        chargeName: 'li',
        money: '100'
      }
    }
  }
}
</script>
