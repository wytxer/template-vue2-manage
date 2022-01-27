<template>
  <ak-container type="white" class="header-info-main" :loading="false">
    <a-row :gutter="gutter" class="MB16">
      <a-col :span="24" class="FB FBJC-SB FBAI-C">
        <div class="F18" style="font-weight: bold">天0302道清888号</div>
        <div>
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
        <span class="C-666">审判法官：</span>
        比比东
      </a-col>
      <a-col :span="6">
        <span class="C-666">立案时间：</span>
        <ak-text-fill text="2022-01-01" />
      </a-col>
      <a-col :span="6">
        <span class="C-666">开庭时间：</span>
        2022-01-02
      </a-col>
    </a-row>

    <a-row :gutter="gutter" class="PB16">
      <a-col :span="6">
        <span class="C-666">原告：</span>
        萧炎
      </a-col>
      <a-col :span="6">
        <span class="C-666">被告：</span>
        秦羽
      </a-col>
      <a-col :span="6">
        <span class="C-666">案件状态：</span>
        <a-tag color="blue" class="status">
          已结案
        </a-tag>
      </a-col>
    </a-row>
  </ak-container>
</template>

<script>
export default {
  data () {
    return {
      gutter: 24
    }
  },
  methods: {
    onMainClick () {
      this.$message.info('点击了主操作')
    }
  }
}
</script>

<style lang="less" scoped>
.header-info-main {
  .C-666 {
    display: inline-block;
    width: 90px;
    text-align: right;
  }
}
</style>
