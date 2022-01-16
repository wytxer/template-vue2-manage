<template>
  <a-drawer
    wrapClassName="ak-drawer-form-wrap"
    :width="width"
    :visible="visible"
    :title="title"
    :closable="true"
    :afterVisibleChange="onClosed"
    @close="onHideModal"
    destroyOnClose
  >
    <a-spin :spinning="loading" class="drawer-modal-content-main">
      <a-form-model ref="form" layout="vertical" :model="values" :rules="rules" :colon="false">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-model-item label="股票代码" prop="stockCode">
              <a-input v-model="values.stockCode" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="标的金额" prop="amount">
              <a-input-number v-model="values.amount" placeholder="请输入" class="W100" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item prop="transactionCode">
              <span slot="label">
                涉及投资者交易编码
                <a-tooltip title="涉及投资者交易编码的注解信息涉及投资者交易编码的注解信息涉及投资者交易编码的注解信息" :get-popup-container="() => $refs.form.$el">
                  <a-icon type="question-circle" class="C-666" />
                </a-tooltip>
              </span>
              <a-input v-model="values.transactionCode" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="是否冻结" prop="freezeIs">
              <ak-select v-model="values.freezeIs" placeholder="请选择" :loadData="freezeData" />
            </a-form-model-item>
          </a-col>

          <a-col :span="24">
            <a-form-model-item label="违法信息披露事实" prop="fact">
              <a-input v-model="values.fact" type="textarea" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="实施日" prop="startTime">
              <a-date-picker
                v-model="values.startTime"
                show-time
                type="date"
                placeholder="请选择"
                class="W100"
                format="YYYY-MM-DD HH:mm:ss"
                valueFormat="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="更正日" prop="updateTime">
              <a-date-picker
                v-model="values.updateTime"
                show-time
                type="date"
                placeholder="请选择"
                class="W100"
                format="YYYY-MM-DD HH:mm:ss"
                valueFormat="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="有效期" prop="date">
              <a-range-picker v-model="values.date" class="W100" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="照片" prop="picture">
              <ak-upload v-model="values.picture" style="min-width: 300px" :action="$api.mockUpload" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>

    <div class="drawer-modal-action-main">
      <a-button class="MR10" @click="onHideModal">
        取消
      </a-button>
      <a-button type="primary" @click="onSubmit" :loading="confirmLoading">
        确定
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import { onSubmit } from '@/api/mock'

const freezeData = [{
  label: '是',
  value: 'y'
}, {
  label: '否',
  value: 'n'
}]

const rules = {
  stockCode: [{
    required: true, message: '股票代码不允许为空'
  }],
  amount: [{
    required: true, message: '标的金额不允许为空'
  }],
  transactionCode: [{
    required: true, message: '涉及投资者交易编码不允许为空'
  }],
  freezeIs: [{
    required: true, message: '是否冻结不允许为空'
  }],
  fact: [{
    required: true, message: '违法信息披露事实不允许为空'
  }]
}

export default {
  data () {
    return {
      width: 780,
      visible: false,
      confirmLoading: false,
      loading: false,
      placement: 'right',
      title: '抽屉标题',
      values: {},
      rules,
      freezeData
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    onHideModal () {
      this.visible = false
    },
    onClosed () {
      if (!this.visible) {
        this.values = this.$options.data.call(this).values
      }
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const values = {
            ...this.values
          }
          // 上传的文件处理成接口需要的格式
          if (values.picture && values.picture.length) {
            values.picture = values.picture.map(item => item.response.data).filter(Boolean)
          }
          this.confirmLoading = true
          onSubmit(values)
            .then(() => {
              this.$message.success('提交成功')
              this.onHideModal()
            })
            .finally(() => {
              this.confirmLoading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
