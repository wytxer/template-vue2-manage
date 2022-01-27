const mock = require('mockjs2')
const { builder, createTablePage } = require('../utils')

const common = {
  // 请求成功
  ok: builder(),
  // 请求失败
  error: builder(null, 500, '服务器异常'),
  // 提交
  submit: builder(),
  // 段位列表
  ranks: builder([{
    value: 1, label: '筑基期'
  }, {
    value: 2, label: '斗皇'
  }, {
    value: 3, label: '魂斗罗'
  }, {
    value: 4, label: '巅峰战神'
  }, {
    value: 5, label: '金丹期'
  }, {
    value: 6, label: '地元境'
  }, {
    value: 7, label: '元丹大圆满'
  }]),
  // 下拉列表
  selectList: builder([
    { value: '1', label: '正常' },
    { value: '2', label: '异常' }
  ]),
  names: ['韩老魔', '唐三', '武庚', '秦羽', '罗峰', '子羽', '霍雨浩', '纣王', '妲己', '虚无', '逆天而行', '随风起舞', '死亡眼神', '穷凶极恶', '铁血无双', '乱舞狂刀', '星星有泪', '鬼魅森林', '纵横天下', '寒风凛凛', '大吃四方', '木无表情', '不闻不问', '苍白的脸', '蓝月圣王', '玄风圣王', '天武圣王', '白莲圣王', '真禅圣王', '黑龙', '白龙', '赤龙', '黄龙', '十刑', '心月魁', '刑天', '神眼', '兵主神蚩尤', '共工', '侯费', '黑羽', '天明', '项羽', '荆轲', '卫庄', '盖聂', '萧炎', '比比东', '美杜莎', '冰皇海波东', '火灵儿', '石昊', '宝儿姐', '紫川秀', '张楚岚', '白小纯']
}

// 通用的表格数据
const tableList = Array(28).fill(0).map((item, i) => {
  return {
    id: mock.Random.integer(100, 10000),
    description: mock.Random.cparagraph(1, 3),
    money: mock.Random.integer(10000, 10000000),
    status: Math.random() > 0.5 ? 1 : 2,
    updateTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    name: common.names[Math.floor(Math.random() * common.names.length)]
  }
})

// 详情数据
const detailInfo = builder({
  baseInfo: {
    caseCode: '武0301民初888号',
    type: '打野纠纷',
    judgeName: common.names[Math.floor(Math.random() * common.names.length)],
    accuser: common.names[Math.floor(Math.random() * common.names.length)],
    accused: common.names[Math.floor(Math.random() * common.names.length)],
    courtTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    status: '待分案',
    reportTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    reportMobile: 13722221112,
    address: '史莱克学院 F5 幢 99 楼 9908',
    intermediator: Math.random() > 0.5 ? common.names[Math.floor(Math.random() * common.names.length)] : '',
    streetName: '叶陵城',
    dispatchName: common.names[Math.floor(Math.random() * common.names.length)]
  },
  // 案件流程
  processInfo: [{
    id: 1, name: '立案'
  }, {
    id: 2, name: '分案', value: '待分案'
  }, {
    id: 3, name: '排期'
  }, {
    id: 4, name: '送达'
  }, {
    id: 5, name: '开庭审理'
  }, {
    id: 6, name: '结案'
  }, {
    id: 7, name: '归档'
  }],
  bondInfo: {
    stackCode: '300301.TM',
    bondName: '武魂殿证券',
    amount: mock.Random.integer(10010000, 100000000000),
    number: 'SASDSL233SH',
    stockMarket: '潜力股',
    account: '魂殿的破产申请',
    idCode: 'XY30293820302',
    fact: '魂殿原是中州最大势力，乃是远古种族魂族的附属势力。由于与主角萧炎有恩怨，遭到疯狂报复，现已覆灭。',
    tradeCode: 'XY230030000',
    startTime: Math.random() > 0.3 ? mock.Random.datetime('yyyy-MM-dd HH:mm:ss') : '',
    updateTime: Math.random() < 0.5 ? mock.Random.datetime('yyyy-MM-dd HH:mm:ss') : '',
    benchmarkTime: Math.random() < 0.5 ? mock.Random.datetime('yyyy-MM-dd HH:mm:ss') : '',
    benchmarkPrice: Math.random() < 0.5 ? 32323 : null
  },
  userInfo: {
    id: mock.Random.guid(),
    name: common.names[Math.floor(Math.random() * common.names.length)],
    nation: '龙族',
    mobile: 13900000000,
    email: mock.Random.email(),
    idCardType: '身份证',
    idCardCode: mock.Random.id(),
    address: '潜龙大陆江南基地市魂殿长老院韩跑跑病房 35 号'
  },
  callInfo: []
})

// 电话记录
const callRecords = builder({
  rows: Array(28).fill(0).map((item, i) => ({
    id: i + 1,
    callName: common.names[Math.floor(Math.random() * common.names.length)],
    mobile: 13611111111 + i,
    callTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    duration: mock.Random.integer(1000, 100000)
  })),
  currentPage: 1,
  totalSize: 28
})

// 操作记录
const actionLogs = builder({
  rows: Array(6).fill(0).map((item, i) => ({
    id: i + 1,
    type: `操作类型 - ${i + 1}`,
    department: '补天阁',
    actionName: common.names[Math.floor(Math.random() * common.names.length)],
    result: Math.random() > 0.5 ? 0 : 1,
    actionTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remarks: mock.Random.cparagraph(2)
  })),
  currentPage: 1,
  totalSize: 6
})

// 表盒数据支持简单的分页查询
const queryTableData = (req, res) => {
  const { pageSize, currentPage, pageNo } = req.body
  const result = builder(createTablePage(+currentPage || +pageNo, +pageSize, tableList))
  return res.json(result)
}

// 统计数据
const dataOverview = builder({
  overview: {
    popularityNumber: 2022000000,
    playNumber: 30191990,
    newPlayNumber: 1282800,
    fundsNumber: 7802200000,
    score: '98.00'
  },
  chartData: Array(30).fill(0).map((item, i) => ({
    time: `2022-01-${i + 1}`,
    popularityNumber: i * Math.floor(Math.random() * 180000 + 80000),
    playNumber: i * Math.floor(Math.random() * 90000 + 10000)
  })),
  paymentRecords: Array(30).fill(0).map((item, i) => ({
    id: mock.Random.integer(1000, 100000),
    nickName: common.names[Math.floor(Math.random() * common.names.length)],
    powerNumber: mock.Random.integer(1000000, 10000000000),
    evaluateAt: mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
  })).sort((a, b) => b.powerNumber - a.powerNumber)
})

// 接口列表
module.exports = {
  'POST /submit': common.submit,
  'GET /ranks': common.ranks,
  'GET /select/list': common.selectList,
  'POST /table/list': queryTableData,
  'GET /detail/info': detailInfo,
  'GET /detail/call/records': callRecords,
  'GET /detail/action/logs': actionLogs,
  'GET /data/overview': dataOverview
}
