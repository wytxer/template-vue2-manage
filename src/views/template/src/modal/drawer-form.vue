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
    <a-form-model ref="form" layout="vertical" :model="values" :rules="rules" :colon="false">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="发起人" prop="sponsor">
            <a-input v-model="values.sponsor" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="悬赏金额" prop="amount">
            <a-input-number v-model="values.amount" placeholder="请输入" class="W100" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item prop="idCode">
            <span slot="label">
              被通缉人身份码
              <a-tooltip title="被通缉人身份码的注解信息被通缉人身份码的注解信息被通缉人身份码的注解信息" :get-popup-container="() => $refs.form.$el">
                <a-icon type="question-circle" class="C666" />
              </a-tooltip>
            </span>
            <a-input v-model="values.idCode" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="是否抓活的" prop="alive">
            <ak-select v-model="values.alive" placeholder="请选择" :loadData="freezeData" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-form-model-item label="被通缉人犯罪事实" prop="fact">
            <a-input v-model="values.fact" type="textarea" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="生效日期" prop="startTime">
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
          <a-form-model-item label="结束日期" prop="endTime">
            <a-date-picker
              v-model="values.endTime"
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
          <a-form-model-item label="被通缉人照片" prop="picture">
            <ak-upload v-model="values.picture" style="min-width: 300px" :action="$api.mockUpload" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>

    <div class="drawer-modal-action-main">
      <a-button class="MR10" @click="onHideModal">
        取消
      </a-button>
      <a-button type="primary" @click="onSubmit" :loading="loading">
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
  sponsor: [{
    required: true, message: '发起人不允许为空'
  }],
  amount: [{
    required: true, message: '悬赏金额不允许为空'
  }],
  idCode: [{
    required: true, message: '被通缉人身份码不允许为空'
  }],
  alive: [{
    required: true, message: '是否抓活的不允许为空'
  }],
  fact: [{
    required: true, message: '被通缉人犯罪事实不允许为空'
  }]
}

export default {
  data () {
    return {
      width: 780,
      visible: false,
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
          this.loading = true
          onSubmit(values)
            .then(() => {
              this.$message.success('提交成功')
              this.onHideModal()
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
