<template>
  <a-card class="MB16" title="流程进度" :loading="false" :bordered="false">
   <a-steps progress-dot :current="1" class="ak-step-overflow-x">
      <a-step title="立案"></a-step>
      <a-step title="分案">
        <span slot="description">待分案</span>
      </a-step>
      <a-step title="排期"></a-step>
      <a-step title="送达"></a-step>
      <a-step title="开庭审理"></a-step>
      <a-step title="结案"></a-step>
      <a-step title="归档"></a-step>
    </a-steps>
  </a-card>
</template>
