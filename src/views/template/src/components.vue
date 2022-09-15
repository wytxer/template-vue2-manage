<template>
  <layout-wrapper card class="page-components">
    <a-tag :color="themeColor" class="MB8">筛选项单行布局</a-tag>
    <layout-query-filter1 />

    <a-tag :color="themeColor" class="MB8 MT64">筛选项两行布局</a-tag>
    <layout-query-filter2 />

    <a-tag :color="themeColor" class="MB16 MT64">卡片和两行栅格标签</a-tag>
    <layout-card-row1 />

    <a-tag :color="themeColor" class="MB16 MT64">卡片和进度条</a-tag>
    <layout-card-steps />

    <a-tag :color="themeColor" class="MB16 MT64">多行栅格标签和操作</a-tag>
    <layout-card-row2 />
  </layout-wrapper>
</template>

<script>
import { mapState } from 'vuex'

import LayoutQueryFilter1 from './layouts/layout-query-filter1'
import LayoutQueryFilter2 from './layouts/layout-query-filter2'
import LayoutCardRow1 from './layouts/layout-card-row1'
import LayoutCardRow2 from './layouts/layout-card-row2'
import LayoutCardSteps from './layouts/layout-card-steps'

export default {
  components: {
    LayoutQueryFilter1,
    LayoutQueryFilter2,
    LayoutCardRow1,
    LayoutCardRow2,
    LayoutCardSteps
  },
  computed: {
    ...mapState({
      themeColor: state => state.app.themeColor
    })
  }
}
</script>

<style lang="less" scoped>
.page-components {
  :deep(.ak-query-filter::after) {
    margin: 0 -48px 0;
  }
}
</style>
