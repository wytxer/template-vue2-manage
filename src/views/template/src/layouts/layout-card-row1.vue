<template>
  <layout-wrapper title="证券信息" card :bordered="false" :loading="false">
    <a-row :gutter="24" class="PB24">
      <a-col :span="8">
        <div class="PB6 C666">股票代码</div>
        <div>300300.SH</div>
      </a-col>
      <a-col :span="8">
        <div class="PB6 C666">涉及证券名称</div>
        <div>唐门证券</div>
      </a-col>
      <a-col :span="8">
        <div class="PB6 C666">悬赏金额</div>
        <div>210000.28</div>
      </a-col>
    </a-row>

    <a-row :gutter="24" class="PB24">
      <a-col :span="8">
        <div class="PB6 C666">证监会处罚决定书编号</div>
        <div>SD111SL233SH</div>
      </a-col>
      <a-col :span="8">
        <div class="PB6 C666">股票市场</div>
        <div>TH500</div>
      </a-col>
      <a-col :span="8">
        <div class="PB6 C666">涉及证券账户</div>
        <div>魂殿的破产申请</div>
      </a-col>
    </a-row>
  </layout-wrapper>
</template>
