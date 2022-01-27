<template>
  <div class="common-detail-view W100">
    <ak-container type="white" class="header-info-main" card :bodyStyle="{padding: 0}" :loading="loading">
      <a-row :gutter="gutter" class="MB16">
        <a-col :span="24" class="FB FBJC-SB FBAI-C">
          <div class="F18 F-BOLD" style="font-weight: bold">{{ baseInfo.caseCode }}</div>
          <div class="action-main">
            <a-button-group>
              <a-button>操作</a-button>
              <a-button>操作</a-button>
              <a-button>操作</a-button>
            </a-button-group>
            <a-button type="primary" @click="onMainClick" style="margin-left: 16px">
              主操作
            </a-button>
          </div>
        </a-col>
      </a-row>

      <a-row :gutter="gutter" class="PB16">
        <a-col :span="6">
          <span class="C-666">类型：</span>
          {{ baseInfo.type }}
        </a-col>
        <a-col :span="6">
          <span class="C-666">上报时间：</span>
          {{ baseInfo.reportTime }}
        </a-col>
        <a-col :span="6">
          <span class="C-666">上报电话：</span>
          {{ baseInfo.reportMobile }}
        </a-col>
      </a-row>

      <a-row :gutter="gutter" class="PB16">
        <a-col :span="24">
          <span class="C-666">地址：</span>
          {{ baseInfo.address }}
        </a-col>
      </a-row>

      <a-row :gutter="gutter" class="PB16">
        <a-col :span="6">
          <span class="C-666">中间人：</span>
          <ak-text-fill :text="baseInfo.intermediator" />
        </a-col>
        <a-col :span="6">
          <span class="C-666">归属镇街：</span>
          {{ baseInfo.streetName }}
        </a-col>
        <a-col :span="6">
          <span class="C-666">指派人：</span>
          {{ baseInfo.dispatchName }}
        </a-col>
      </a-row>
    </ak-container>

    <ak-container title="证券信息" card :loading="loading">
      <a-row :gutter="gutter" class="PB24">
        <a-col :span="8">
          <div class="PB6 C-666">股票代码</div>
          <div>{{ bondInfo.stackCode }}</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">涉及证券名称</div>
          <div>{{ bondInfo.bondName }}</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">标的金额</div>
          <div>{{ bondInfo.amount }}</div>
        </a-col>
      </a-row>

      <a-row :gutter="gutter" class="PB24">
        <a-col :span="8">
          <div class="PB6 C-666">证监会处罚决定书编号</div>
          <div>{{ bondInfo.number }}</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">股票市场</div>
          <div>{{ bondInfo.stockMarket }}</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">涉及证券账户</div>
          <div>{{ bondInfo.account }}</div>
        </a-col>
      </a-row>

      <a-row :gutter="gutter" class="PB24">
        <a-col :span="16">
          <div class="PB6 C-666">违法信息披露事实</div>
          <div>{{ bondInfo.fact }}</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">涉及投资者交易编码</div>
          <div>{{ bondInfo.tradeCode }}</div>
        </a-col>
      </a-row>

      <a-row :gutter="gutter" class="PB24">
        <a-col :span="8">
          <div class="PB6 C-666">实施日</div>
          <ak-text-fill :text="bondInfo.startTime" />
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">更正日</div>
          <ak-text-fill :text="bondInfo.updateTime" />
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">基准日</div>
          <ak-text-fill :text="bondInfo.benchmarkTime" />
        </a-col>
      </a-row>

      <a-row :gutter="gutter">
        <a-col :span="8">
          <div class="PB6 C-666">基准价</div>
          <ak-text-fill :text="bondInfo.benchmarkPrice" />
        </a-col>
      </a-row>
    </ak-container>
  </div>
</template>

<script>
import { queryDetailInfo } from '@/api/mock'

export default {
  data () {
    return {
      gutter: 24,
      loading: false,
      baseInfo: {},
      bondInfo: {}
    }
  },
  created () {
    this.queryData()
  },
  methods: {
    queryData () {
      this.loading = true
      queryDetailInfo()
        .then(res => {
          const data = res.data || {}
          this.baseInfo = data.baseInfo || {}
          this.bondInfo = data.bondInfo || {}
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
.common-detail-view {
  .header-info-main {
    .C-666 {
      display: inline-block;
      width: 90px;
      text-align: right;
    }
  }
}
</style>
