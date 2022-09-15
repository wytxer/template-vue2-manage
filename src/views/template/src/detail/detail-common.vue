<template>
  <div class="page-detail">
    <layout-wrapper type="white" class="header-info" card :bodyStyle="{padding: 0}" :loading="loading">
      <a-row :gutter="gutter" class="MB16">
        <a-col :span="24" class="FB FBJC-SB FBAI-C">
          <div class="header-info__code">{{ baseInfo.caseCode }}</div>
          <div>
            <a-button-group>
              <a-button>操作</a-button>
              <a-button>操作</a-button>
              <a-button>操作</a-button>
            </a-button-group>
            <a-button type="primary" @click="onMainClick" class="header-info__main-btn">
              主操作
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
          <a-tag color="blue" class="header-info__status">
            {{ baseInfo.status }}
          </a-tag>
        </a-col>
      </a-row>
    </layout-wrapper>

    <layout-wrapper v-paddingRight="130" :key="isSideMenu">
      <a-card class="MB16" title="流程进度" id="detail-card1" :bordered="false" :loading="loading">
        <a-steps progress-dot :current="currentStep" class="ak-step-overflow-x">
          <a-step v-for="item in processInfo" :key="item.id" :title="item.name">
            <span slot="description" v-if="item.value">{{ item.value }}</span>
          </a-step>
        </a-steps>
      </a-card>

      <a-card class="MB16" title="用户信息" id="detail-card2" :bordered="false" :loading="loading">
        <a-row :gutter="gutter" class="PB24">
          <a-col :span="6">
            <div class="PB6 C666">姓名</div>
            <div>{{ userInfo.name }}</div>
          </a-col>
          <a-col :span="6">
            <div class="PB6 C666">民族</div>
            <div>{{ userInfo.nation }}</div>
          </a-col>
          <a-col :span="6">
            <div class="PB6 C666">联系电话</div>
            <div>{{ userInfo.mobile }}</div>
          </a-col>
          <a-col :span="6">
            <div class="PB6 C666">邮箱</div>
            <div>{{ userInfo.email }}</div>
          </a-col>
        </a-row>

        <a-row :gutter="gutter">
          <a-col :span="6">
            <div class="PB6 C666">证件类型</div>
            <div>{{ userInfo.idCardType }}</div>
          </a-col>
          <a-col :span="6">
            <div class="PB6 C666">证件号码</div>
            <div>{{ userInfo.idCardCode }}</div>
          </a-col>
          <a-col :span="12">
            <div class="PB6 C666">地址</div>
            <div>{{ userInfo.address }}</div>
          </a-col>
        </a-row>
      </a-card>

      <a-card class="ak-card-table MB16" title="来电记录" id="detail-card3" :bordered="false" :loading="loading">
        <ak-table rowKey="id" :columns="callColumns" :loadData="queryCallRecords">
          <template #duration="text">
            {{ text | filterTime }}
          </template>

          <template #action>
            <a>偷听</a>
            <a-divider type="vertical" />
            <a>销毁</a>
          </template>
        </ak-table>
      </a-card>

      <a-card class="ak-card-table" title="操作日志" id="detail-card4" :bordered="false" :loading="loading">
        <ak-table rowKey="id" :columns="logColumns" :loadData="queryActionLogs">
          <template #result="text">
            <a-tag v-if="text" color="blue" key="success">
              成功
            </a-tag>
            <a-tag v-else color="red" key="error">
              失败
            </a-tag>
          </template>
        </ak-table>
      </a-card>

      <!-- 快捷菜单 -->
      <a-anchor class="shortcut-menu" v-right="130" :offset-top="48">
        <a-anchor-link href="#detail-card1" title="流程进度" />
        <a-anchor-link href="#detail-card2" title="用户信息" />
        <a-anchor-link href="#detail-card3" title="来电记录" />
        <a-anchor-link href="#detail-card4" title="操作日志" />
      </a-anchor>
    </layout-wrapper>
  </div>
</template>

<script>
import { queryDetailInfo, queryCallRecords, queryActionLogs } from '@/api/mock'
import { fullZero } from '@/utils/utils'
import { mapGetters } from 'vuex'

// 通话记录的表头信息
const callColumns = [{
  title: '通话对象',
  dataIndex: 'callName'
}, {
  title: '电话号码',
  dataIndex: 'mobile'
}, {
  title: '开始通话时间',
  dataIndex: 'callTime'
}, {
  title: '通话时长',
  dataIndex: 'duration',
  scopedSlots: { customRender: 'duration' }
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}]

// 操作日志的表头信息
const logColumns = [{
  title: '操作类型',
  dataIndex: 'type',
  width: '15%'
}, {
  title: '操作人',
  dataIndex: 'actionName',
  width: '15%'
}, {
  title: '操作结果',
  dataIndex: 'result',
  width: '15%',
  scopedSlots: {
    customRender: 'result'
  }
}, {
  title: '操作时间',
  dataIndex: 'actionTime',
  width: '15%'
}, {
  title: '备注',
  dataIndex: 'remarks'
}]

export default {
  data () {
    return {
      gutter: 24,
      loading: false,
      currentStep: 0,
      baseInfo: {},
      processInfo: [],
      userInfo: {},
      callInfo: [],
      callColumns,
      logColumns
    }
  },
  computed: {
    ...mapGetters(['isSideMenu'])
  },
  created () {
    this.queryData()
  },
  filters: {
    filterTime (time) {
      const t = Math.abs(time)
      // 天
      const d = fullZero(Math.floor(t / 1000 / 60 / 60 / 24))
      // 时
      const h = fullZero(Math.floor(t / 1000 / 60 / 60 % 24))
      // 分
      const m = fullZero(Math.floor(t / 1000 / 60 % 60))
      // 秒
      const s = fullZero(Math.floor(t / 1000 % 60))

      // 最终拼接的时间字符串
      let str = ''
      // 总共加起来有多少小时
      const th = fullZero(h * 1 + d * 24)
      if (th > 0) {
        str += `${th}:${m}:${s}`
      } else if (m > 0) {
        str += `${m}:${s}`
      } else if (s > 0) {
        str += s
      } else {
        str += '00'
      }
      return str
    }
  },
  methods: {
    queryActionLogs,
    queryCallRecords,
    queryData () {
      this.loading = true
      queryDetailInfo()
        .then(res => {
          const data = res.data || {}
          this.baseInfo = data.baseInfo || {}
          this.processInfo = data.processInfo || []
          this.userInfo = data.userInfo || {}
          this.callInfo = data.callInfo || []
          this.currentStep = this.processInfo.findIndex(item => item.value)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onMainClick () {
      this.$message.info('点击了主操作')
    }
  }
}
</script>

<style lang="less" scoped>
.page-detail {
  .header-info {
    .C666 {
      display: inline-block;
      width: 90px;
      text-align: right;
    }
    &__code {
      font-size: 18px;
      font-weight: bold;
    }
    &__main-btn {
      margin-left: 16px;
    }
    &__status {
      position: relative;
      top: -2px;
    }
  }
  .shortcut-menu {
    position: fixed;
    width: 130px;
    right: 24px;
    top: 256px;
    :deep(.ant-anchor-wrapper) {
      background-color: transparent;
    }
  }
}
</style>
