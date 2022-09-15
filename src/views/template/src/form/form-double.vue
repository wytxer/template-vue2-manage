<template>
  <layout-wrapper class="ak-pb0" card>
    <a-form-model ref="form" layout="vertical" :model="values" :rules="rules" :colon="false">
      <a-row :gutter="24" style="padding-right: 200px">
        <a-col :md="10" :sm="24">
          <a-form-model-item label="股票代码" prop="stackCode">
            <a-input v-model="values.stackCode" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :md="{span: 10, offset: 2}" :sm="24">
          <a-form-model-item label="涉及证券名称" prop="name">
            <a-input v-model="values.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :md="10" :sm="24">
          <a-form-model-item label="标的金额" prop="money">
            <a-input v-model="values.money" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :md="{span: 10, offset: 2}" :sm="24">
          <a-form-model-item label="涉及投资者交易编码" prop="tradeCode">
            <a-input v-model="values.tradeCode" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :md="10" :sm="24">
          <a-form-model-item label="证监会处罚决定书编号" prop="number">
            <a-input v-model="values.number" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :md="{span: 10, offset: 2}" :sm="24">
          <a-form-model-item label="更正日" prop="date">
            <a-date-picker v-model="values.date" show-time type="date" placeholder="请选择日期" class="W100" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" />
          </a-form-model-item>
        </a-col>

        <a-col :md="22" :sm="24">
          <a-form-model-item label="违法信息披露事实" prop="fact">
            <a-textarea v-model="values.fact" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :md="10" :sm="24">
          <a-form-model-item label="实施日" prop="date2">
            <a-date-picker v-model="values.date2" show-time type="date" placeholder="请选择日期" class="W100" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" />
          </a-form-model-item>
        </a-col>

        <a-col :md="{span: 10, offset: 2}" :sm="24">
          <a-form-model-item label="更正日" prop="date3">
            <a-date-picker v-model="values.date3" show-time type="date" placeholder="请选择日期" class="W100" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-form-model-item>
            <a-button @click="onResetForm">
              重置
            </a-button>
            <a-button type="primary" class="ML16" @click="onSubmit" :loading="loading">
              提交
            </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </layout-wrapper>
</template>

<script>
import { onSubmit } from '@/api/mock'

const rules = {
  stackCode: [{ required: true, message: '不允许为空' }],
  name: [{ required: true, message: '不允许为空' }],
  money: [{ required: true, message: '不允许为空' }],
  tradeCode: [{ required: true, message: '不允许为空' }],
  number: [{ required: true, message: '不允许为空' }],
  date: [{ required: true, message: '不允许为空' }],
  fact: [{ required: true, message: '不允许为空' }],
  date2: [{ required: true, message: '不允许为空' }],
  date3: [{ required: true, message: '不允许为空' }]
}

export default {
  data () {
    return {
      values: {
        stackCode: '',
        name: '',
        money: '',
        tradeCode: '',
        number: '',
        date: '',
        fact: '',
        date2: '2022-01-01',
        date3: ''
      },
      rules,
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
    }
  }
}
</script>
