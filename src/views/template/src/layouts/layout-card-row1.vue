<template>
  <ak-container>
    <a-card title="证券信息" :loading="false" :bordered="false">
      <a-row :gutter="24" class="PB24">
        <a-col :span="8">
          <div class="PB6 C-666">股票代码</div>
          <div>300300.SH</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">涉及证券名称</div>
          <div>华泰证券</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">标的金额</div>
          <div>210000.28</div>
        </a-col>
      </a-row>

      <a-row :gutter="24" class="PB24">
        <a-col :span="8">
          <div class="PB6 C-666">中国证监会处罚决定书编号</div>
          <div>SDSDSL233SH</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">股票市场</div>
          <div>中证500</div>
        </a-col>
        <a-col :span="8">
          <div class="PB6 C-666">涉及证券账户</div>
          <div>巴菲特的破产申请</div>
        </a-col>
      </a-row>
    </a-card>
  </ak-container>
</template>
