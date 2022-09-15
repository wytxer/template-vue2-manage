<template>
  <div class="page-form">
    <layout-wrapper type="white" class="header-info" card :bodyStyle="{padding: 0}" :loading="loading">
      <a-row :gutter="gutter" class="MB16">
        <a-col :span="24" class="FB FBJC-SB FBAI-C">
          <div class="F18" style="font-weight: bold">{{ baseInfo.caseCode }}</div>
          <div>
            <a-button-group>
              <a-button @click="$router.back()">返回</a-button>
              <a-button>删除</a-button>
            </a-button-group>
            <a-button type="primary" @click="onMainClick" style="margin-left: 16px">
              预览
            </a-button>
          </div>
        </a-col>
      </a-row>

      <a-row :gutter="gutter" class="PB16">
        <a-col :span="6">
          <span class="C666">审判法官：</span>
          {{ baseInfo.judgeName }}
        </a-col>
        <a-col :span="6">
          <span class="C666">立案时间：</span>
          <ak-text-fill :text="baseInfo.startTime" />
        </a-col>
        <a-col :span="6">
          <span class="C666">开庭时间：</span>
          {{ baseInfo.courtTime }}
        </a-col>
      </a-row>

      <a-row :gutter="gutter" class="PB16">
        <a-col :span="6">
          <span class="C666">原告：</span>
          {{ baseInfo.accuser }}
        </a-col>
        <a-col :span="6">
          <span class="C666">被告：</span>
          {{ baseInfo.accused }}
        </a-col>
        <a-col :span="6">
          <span class="C666">案件状态：</span>
          <a-tag color="blue" class="status">
            {{ baseInfo.status }}
          </a-tag>
        </a-col>
      </a-row>
    </layout-wrapper>

    <layout-wrapper>
      <a-card title="流程进度" class="ak-card-line MB16" :bordered="false" :loading="loading">
        <a-steps progress-dot :current="currentStep" class="ak-step-overflow-x">
          <a-step v-for="item in processInfo" :key="item.id" :title="item.name">
            <span slot="description" v-if="item.value">{{ item.value }}</span>
          </a-step>
        </a-steps>
      </a-card>

      <!-- 申请人信息 -->
      <a-card title="申请人信息" class="ak-card-line ak-pb0 MB16" :bordered="false" :loading="loading">
        <a-form-model ref="form" :model="values" :rules="rules" :colon="false" layout="vertical">
          <a-row :gutter="gutter">
            <a-col :xl="8" :lg="8">
              <a-form-model-item label="姓名" prop="applicantName">
                <a-input v-model="values.applicantName" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col :xl="8" :lg="8">
              <a-form-model-item label="联系方式" prop="phone">
                <a-input v-model="values.phone" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col :xl="8" :lg="8">
              <a-form-model-item label="民族" prop="nation">
                <a-input v-model="values.nation" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col :xl="8" :lg="8">
              <a-form-model-item label="身份证号" prop="idCard">
                <a-input v-model="values.idCard" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col :xl="8" :lg="8">
              <a-form-model-item label="性别" prop="gender">
                <a-input v-model="values.gender" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col :xl="8" :lg="8">
              <a-form-model-item label="送达地址" prop="address">
                <a-input v-model="values.address" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col :xl="8" :lg="8">
              <a-form-model-item prop="files">
                <span slot="label">
                  上传股票交易记录
                  <a-tooltip>
                    <template slot="title">字段注解内容字段注解内容字段注解内容字段注解内容</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <ak-upload v-model="values.files" block :action="$api.mockUpload"></ak-upload>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>

      <!-- 成员管理 -->
      <a-card class="ak-card-line ak-card-table ak-pb0" :bordered="false" :loading="loading">
        <div slot="title" class="FB FBJC-SB FBAI-C">
          <span>成员管理</span>
          <a-button icon="plus-circle">新增成员</a-button>
        </div>
        <ak-table :columns="logColumns" :loadData="queryActionLogs" rowKey="id">
          <template #action>
            <a>查看</a>
            <a-divider type="vertical" />
            <a>删除</a>
          </template>
        </ak-table>
      </a-card>
    </layout-wrapper>

    <affix-footer>
      <a-button @click="$router.back()">
        返回
      </a-button>
      <a-button class="ML16" @click="onResetForm">
        重置
      </a-button>
      <a-button type="primary" class="ML16" @click="onSubmit" :loading="saveLoading">提交</a-button>
    </affix-footer>
  </div>
</template>

<script>
import { queryDetailInfo, queryActionLogs, onSubmit } from '@/api/mock'

const rules = {
  applicantName: [{ required: true, message: '不允许为空' }],
  phone: [{ required: true, message: '不允许为空' }],
  nation: [{ required: true, message: '不允许为空' }],
  idCard: [{ required: true, message: '不允许为空' }],
  gender: [{ required: true, message: '不允许为空' }],
  address: [{ required: true, message: '不允许为空' }],
  files: [{ required: true, message: '不允许为空' }]
}

const logColumns = [{
  title: '工号',
  dataIndex: 'id'
}, {
  title: '成员姓名',
  dataIndex: 'actionName'
}, {
  title: '所属部门',
  dataIndex: 'department'
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  data () {
    return {
      gutter: 24,
      loading: false,
      saveLoading: false,
      currentStep: 0,
      baseInfo: {},
      processInfo: [],
      values: {},
      rules,
      logColumns
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    queryActionLogs,
    // 获取详情的基础信息
    loadData () {
      this.loading = true
      queryDetailInfo()
        .then(res => {
          const data = res.data || {}
          this.baseInfo = data.baseInfo || {}
          this.processInfo = data.processInfo || []
          this.currentStep = this.processInfo.findIndex(item => item.value)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const values = {
            ...this.values
          }
          // 上传的文件处理成接口需要的格式
          if (values.files && values.files.length) {
            values.files = values.files.map(item => item.response.data).filter(Boolean)
          }
          this.saveLoading = true
          onSubmit(values)
            .then(() => {
              this.$refs.form.resetFields()
              this.$message.success('提交成功')
            })
            .finally(() => {
              this.saveLoading = false
            })
        } else {
          return false
        }
      })
    },
    onResetForm () {
      this.$refs.form.resetFields()
      this.values = this.$options.data.call(this).values
    },
    onMainClick () {
      this.$message.info('点击了主操作')
    }
  }
}
</script>

<style lang="less" scoped>
.page-form {
  padding-bottom: 56px;
  .header-info {
    .C666 {
      display: inline-block;
      width: 90px;
      text-align: right;
    }
  }
}
</style>
