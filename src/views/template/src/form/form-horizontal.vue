<template>
  <layout-wrapper class="ak-pb0" card>
    <a-form-model ref="form" class="ak-form-horizontal" :model="values" :rules="rules" :colon="false">
      <a-form-model-item label="发起人" prop="code">
        <a-input v-model="values.code" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="被通缉人昵称" prop="name">
        <a-input v-model="values.name" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="悬赏金额" prop="money">
        <a-input v-model="values.money" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="被通缉人身份码" prop="idCode">
        <a-input v-model="values.idCode" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="被通缉人战力值" prop="powerNumber">
        <a-input v-model="values.powerNumber" placeholder="请输入" class="W350" />
      </a-form-model-item>

      <a-form-model-item label="被通缉人犯罪事实" prop="fact">
        <a-textarea v-model="values.fact" placeholder="请输入" class="W750" />
      </a-form-model-item>

      <a-form-model-item label="备注" prop="remarks">
        <a-textarea v-model="values.remarks" placeholder="请输入" class="W750" />
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
  </layout-wrapper>
</template>

<script>
import { onSubmit } from '@/api/mock'

const rules = {
  code: [{ required: true, message: '不允许为空' }],
  name: [{ required: true, message: '不允许为空' }],
  money: [{ required: true, message: '不允许为空' }],
  idCode: [{ required: true, message: '不允许为空' }],
  powerNumber: [{ required: true, message: '不允许为空' }],
  fact: [{ required: true, message: '不允许为空' }]
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
