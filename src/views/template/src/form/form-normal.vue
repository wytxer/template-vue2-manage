<template>
  <layout-wrapper style="padding-bottom: 56px">
    <a-form-model ref="form" layout="vertical" :model="values" :rules="rules" :colon="false">
      <!-- 证券信息 -->
      <a-card class="ak-card-line ak-pb0 MB16" title="证券信息" :bordered="false">
        <a-row :gutter="gutter">
          <a-col :span="8">
            <a-form-model-item label="股票代码" prop="code">
              <a-input v-model="values.code" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="涉及证券名称" prop="name">
              <a-input v-model="values.name" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="标的金额" ref="money" prop="money">
              <a-input v-model="values.money" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="涉及投资者交易编码" prop="tradeCode">
              <a-input v-model="values.tradeCode" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="更正日" prop="date">
              <a-date-picker v-model="values.date" type="date" placeholder="请选择日期" class="W100" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
            </a-form-model-item>
          </a-col>

          <a-col :span="16">
            <a-form-model-item label="违法信息披露事实" prop="message">
              <a-textarea v-model="values.message" placeholder="请输入" rows="4" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <!-- 申请人信息 -->
      <a-card class="ak-card-line ak-pb0" title="申请人信息" :bordered="false">
        <a-row :gutter="gutter">
          <a-col :span="8">
            <a-form-model-item label="姓名" prop="applicantName">
              <a-input v-model="values.applicantName" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="联系方式" prop="phone">
              <a-input v-model="values.phone" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="民族" prop="nation">
              <a-input v-model="values.nation" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="身份证号" prop="idCard">
              <a-input v-model="values.idCard" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="性别" prop="gender">
              <a-input v-model="values.gender" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="送达地址" prop="address">
              <a-input v-model="values.address" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form-model>

    <affix-footer>
      <a-button @click="$router.back()">
        返回
      </a-button>
      <a-button class="ML16" @click="onResetForm">
        重置
      </a-button>
      <a-button type="primary" class="ML16" @click="onSubmit" :loading="loading">提交</a-button>
    </affix-footer>
  </layout-wrapper>
</template>

<script>
import { onSubmit } from '@/api/mock'

const rules = {
  code: [{ required: true, message: '不允许为空' }],
  name: [{ required: true, message: '不允许为空' }],
  money: [{ required: true, message: '不允许为空' }],
  tradeCode: [{ required: true, message: '不允许为空' }],
  punishNum: [{ required: true, message: '不允许为空' }],
  date: [{ required: true, message: '不允许为空' }],
  message: [{ required: true, message: '不允许为空' }],
  applicantName: [{ required: true, message: '不允许为空' }],
  phone: [{ required: true, message: '不允许为空' }],
  nation: [{ required: true, message: '不允许为空' }],
  idCard: [{ required: true, message: '不允许为空' }],
  gender: [{ required: true, message: '不允许为空' }],
  address: [{ required: true, message: '不允许为空' }]
}

export default {
  data () {
    return {
      gutter: 24,
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
              this.onResetForm()
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
