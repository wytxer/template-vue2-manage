<template>
  <ak-container class="workplace-view">
    <a-card class="query-filter-main" :bordered="false">
      <div class="date-filter-box">
        <div>
          <span v-for="item in dateFilters" :key="item.key" :class="['date-item', {active: filterKey === item.key}]" @click="onDateFilter(item.key)">
            {{ item.name }}
          </span>
        </div>
        <a-range-picker style="width: 300px" v-model="dateFilter" @change="onDateChange" :allowClear="false" />
      </div>
    </a-card>

    <div class="index-card-main">
      <a-card class="index-card-item" v-for="item in titles" :key="item.key" :bordered="false" :loading="loading">
        <div class="label">
          <span>{{ item.cardName }}</span>
          <a-tooltip :placement="item.key === 'score' ? 'left' : 'top'" :title="item.tips">
            <a-icon class="icon-info" type="info-circle" />
          </a-tooltip>
        </div>
        <div class="value">{{ overview[item.key] }}</div>
      </a-card>
    </div>

    <a-card class="MT16" style="min-height: 240px" :bordered="false" :loading="loading">
      <div :id="chartId"></div>
    </a-card>

    <a-card class="ak-card-table MT16" title="战力排行榜" :bordered="false" :loading="loading">
      <ak-table ref="table" rowKey="id" :columns="columns" :loadData="paymentRecords">
        <template #powerNumber="text">
          {{ $utils.formatCurrency(text) }}
        </template>
        <template #actions="text, record">
          <router-link :to="`/detail/base?id=${record.id}`">详情</router-link>
        </template>
      </ak-table>
    </a-card>

    <nav-footer style="padding-bottom: 0" />
  </ak-container>
</template>

<script>
import { mapState } from 'vuex'
import { Chart } from '@antv/g2'
import moment from 'moment'
import { NavFooter } from '@/components'
import { queryDataOverview } from '@/api/mock'

// 用户列定义
const columns = [{
  title: '昵称',
  dataIndex: 'nickName',
  width: '20%'
}, {
  title: '战力值',
  dataIndex: 'powerNumber',
  scopedSlots: { customRender: 'powerNumber' },
  align: 'right',
  width: '20%'
}, {
  title: '评估时间',
  dataIndex: 'evaluateAt',
  align: 'center',
  width: '35%'
}, {
  title: '操作',
  dataIndex: 'actions',
  scopedSlots: { customRender: 'actions' },
  width: '25%'
}]

export default {
  components: {
    NavFooter
  },
  data () {
    const yesterday = moment().clone().subtract(30, 'd')

    return {
      columns,
      // 概览要展示的数据列表
      titles: [{
        key: 'popularityNumber',
        type: 1,
        cardName: '人气值',
        tips: '人气值人气值人气值人气值人气值'
      }, {
        key: 'playNumber',
        type: 2,
        cardName: '播放量',
        tips: '播放量播放量播放量播放量播放量播放量播放量'
      }, {
        key: 'newPlayNumber',
        type: 3,
        cardName: '新增播放量',
        tips: '新增播放量新增播放量新增播放量新增播放量新增播放量'
      }, {
        key: 'fundsNumber',
        type: 4,
        cardName: '经费',
        tips: '经费计算方式说明经费计算方式说明经费计算方式说明经费计算方式说明'
      }, {
        key: 'score',
        type: 5,
        cardName: '评分',
        tips: '评分计算方式评分计算方式评分计算方式评分计算方式评分计算方式评分计算方式评分计算方式'
      }],
      // 时间筛选列表
      dateFilters: [{
        key: 0, name: '今日'
      }, {
        key: 1, name: '昨日'
      }, {
        key: 7, name: '最近7日'
      }, {
        key: 30, name: '最近30日'
      }],
      filterKey: 30,
      dateFilter: [yesterday, yesterday],
      queryFilters: {
        startAt: yesterday.format('YYYY-MM-DD 00:00:00'),
        endAt: yesterday.format('YYYY-MM-DD 23:59:59')
      },
      // 全局数据概览
      overview: {},
      paymentRecords: [],
      chartData: [],
      chartId: `chart-${this.$utils.createId()}`,
      // 加载状态
      loading: false
    }
  },
  computed: {
    ...mapState({
      isSideMenu: state => state.app.layout === 'side',
      menuCollapsed: state => state.app.menuCollapsed
    })
  },
  watch: {
    isSideMenu () {
      this.drawUserLineChart()
    },
    menuCollapsed () {
      this.drawUserLineChart()
    }
  },
  created () {
    this.getOverview()
  },
  methods: {
    // 获取统计数据
    getOverview () {
      this.loading = true
      return queryDataOverview(this.queryFilters)
        .then(res => {
          this.loading = false
          const data = res.data || {}
          this.overview = data.overview
          this.paymentRecords = data.paymentRecords
          this.chartData = data.chartData
          this.$nextTick(() => {
            this.drawUserLineChart()
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 根据指定日期筛选
    onDateFilter (key) {
      const today = moment()
      const endAt = key <= 0 ? today : today.clone().subtract(1, 'd')
      const startAt = today.clone().subtract(key, 'd')
      this.dateFilter = [startAt, endAt]
      this.queryFilters.startAt = startAt.format('YYYY-MM-DD 00:00:00')
      this.queryFilters.endAt = endAt.format('YYYY-MM-DD 23:59:59')
      this.filterKey = key
    },
    onDateChange ([startAt, endAt]) {
      this.queryFilters.startAt = startAt.format('YYYY-MM-DD 00:00:00')
      this.queryFilters.endAt = endAt.format('YYYY-MM-DD 23:59:59')
      this.filterKey = ''
    },
    // 绘制用户折线图
    drawUserLineChart () {
      const data = []
      this.chartData.forEach(item => {
        data.push({
          time: item.time,
          value: item.popularityNumber,
          name: '人气值'
        }, {
          time: item.time,
          value: item.playNumber,
          name: '播放量'
        })
      })
      if (this.chart) {
        this.chart.forceFit()
      } else {
        const chart = new Chart({
          container: this.chartId,
          autoFit: true,
          width: 600,
          height: 300
        })
        this.chart = chart
        this.chart.option('slider', {})
        this.chart.tooltip({
          // 展示 Tooltip 辅助线
          showCrosshairs: true,
          shared: true,
          title: 'time',
          showMarkers: true
        })
        this.chart.legend({ position: 'top' })
        this.chart.line().position('time*value').color('name').shape('smooth')
        this.chart.data(data)
        const max = Math.max(...data.map(item => item.value))
        this.chart.scale({
          value: { nice: true, min: 0, max }
        })
        this.chart.render()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.workplace-view {
  min-height: calc(100vh - 201px);
  .index-card-main {
    display: flex;
    .index-card-item {
      flex: 1;
      height: 160px;
      position: relative;
      &:not(:last-child) {
        margin-right: 24px;
      }
    }
    .label {
      width: 100%;
      height: 24px;
      line-height: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgba(0, 0, 0, 0.45) !important;
      .icon-info {
        margin-left: 16px;
        width: 14px;
        height: 14px;
        color: rgba(0, 0, 0, 0.45) !important;
      }
    }
    .value {
      font-size: 30px;
      line-height: 88px;
      text-align: center;
    }
  }
  .query-filter-main {
    margin-bottom: 16px;
    .date-filter-box {
      display: flex;
      justify-content: space-between;
    }
    .date-item {
      line-height: 40px;
      margin-right: 24px;
      cursor: pointer;
      transition: all 0.15s;
      &.active {
        color: @primary-color;
      }
    }
  }
}
</style>
