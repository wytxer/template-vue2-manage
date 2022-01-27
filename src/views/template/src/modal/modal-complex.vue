<template>
  <a-modal
    class="ak-pb0"
    :width="width"
    :visible="visible"
    :title="title"
    :confirmLoading="loading"
    :afterClose="onClosed"
    destroyOnClose
    @cancel="onHideModal"
    @ok="onSubmit"
  >
    <a-form-model ref="form" layout="vertical" :model="values" :rules="rules" :colon="false">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="姓名" prop="name">
            <a-input v-model="values.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="年龄" prop="age">
            <a-input-number v-model="values.age" :min="1" :max="200" placeholder="请输入" class="W100" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="加入时间" prop="joinTime">
            <a-date-picker
              v-model="values.joinTime"
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
          <a-form-model-item label="新手考核期" prop="date">
            <a-range-picker v-model="values.date" class="W100" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="段位" prop="rank">
            <ak-select v-model="values.rank" placeholder="请选择" :loadData="ranks" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="等级证明" prop="picture">
            <ak-upload v-model="values.picture" style="min-width: 300px" :action="$api.mockUpload" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-form-model-item label="备注" prop="remarks">
            <a-input v-model="values.remarks" type="textarea" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
import { onSubmit, queryRanks } from '@/api/mock'

const rules = {
  name: [{
    required: true, message: '姓名不允许为空'
  }],
  age: [{
    required: true, message: '年龄不允许为空'
  }],
  joinTime: [{
    required: true, message: '加入时间不允许为空'
  }],
  date: [{
    required: true, message: '新手考核期不允许为空'
  }],
  rank: [{
    required: true, message: '段位不允许为空'
  }],
  picture: [{
    required: true, message: '等级证明不允许为空'
  }],
  tenant: [{
    required: true, type: 'array', message: '所属部门不允许为空'
  }],
  remarks: [{
    required: true, message: '备注不允许为空'
  }]
}

export default {
  data () {
    return {
      width: 720,
      visible: false,
      loading: false,
      title: '弹框标题',
      values: {},
      rules,
      ranks: []
    }
  },
  methods: {
    showModal (record = {}) {
      this.values = record
      // 每次打开弹框都获取一下最新数据，可根据实际需要修改
      this.queryRanks()
      this.visible = true
    },
    onHideModal () {
      this.visible = false
    },
    onClosed () {
      this.$refs.form.resetFields()
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
    },
    // 获取段位列表
    queryRanks () {
      queryRanks()
        .then(res => {
          this.ranks = res.data || []
        })
    }
  }
}
</script>
