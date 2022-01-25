const mock = require('mockjs2')
const { builder, createTablePage } = require('../utils')

const common = {
  // 请求成功
  ok: builder(),
  // 请求失败
  error: builder(null, 500, '服务器异常'),
  // 提交
  submit: builder(),
  // 角色列表
  roles: builder([{
    value: 1, label: '上单'
  }, {
    value: 2, label: '中单'
  }, {
    value: 3, label: '打野'
  }, {
    value: 4, label: '下单'
  }, {
    value: 5, label: '辅助'
  }, {
    value: 6, label: '射手'
  }, {
    value: 7, label: '全能'
  }]),
  // 下拉列表
  selectList: builder([
    { value: '1', label: '正常' },
    { value: '2', label: '禁用' }
  ])
}

// 通用的表格数据
const tableList = Array(28).fill(0).map((item, i) => {
  return {
    id: mock.Random.integer(100, 1000),
    description: mock.Random.cparagraph(1, 3),
    money: mock.Random.integer(10000, 10000000),
    status: Math.random() > 0.5 ? 1 : 2,
    updateTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    name: mock.Random.cname()
  }
})

// 详情数据
const detailInfo = builder({
  baseInfo: {
    // 案号
    caseCode: '粤0304民初888号',
    // 类型
    type: '打野纠纷',
    // 审判法官
    judgeName: mock.Random.cname(),
    // 原告
    accuser: mock.Random.cname(),
    // 被告
    accused: mock.Random.cname(),
    // 开庭时间
    courtTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    // 案件状态
    status: '待分案',
    // 上报时间
    reportTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    // 上报电话
    reportMobile: 13722221112,
    // 地址
    address: '史莱克学院 F5 幢 99 楼 9908',
    // 中间人
    intermediator: Math.random() > 0.5 ? mock.Random.cname() : '',
    // 归属镇街
    streetName: '叶陵城',
    // 指派人
    dispatchName: mock.Random.cname()
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
    // 股票代码
    stockCode: '310300.SH',
    // 证券名称
    bondName: '武魂殿证券',
    // 标的金额
    amount: mock.Random.integer(10010000, 100000000000),
    // 处罚决定书编号
    number: 'SASDSL233SH',
    // 股票市场
    stockMarket: '潜力股',
    // 涉及证券账户
    account: '魂殿的破产申请',
    // 涉及投资者交易编码
    transactionCode: 'XY30293820302',
    // 披露事实
    fact: '第十条 发行人申请公开发行股票、可转换为股票的公司债券，依法采取承销方式的，或者公开发行法律、行政法规规定实行保荐制度的其他证券的，应当聘请证券公司担任保荐人。',
    // 实施日
    startTime: Math.random() > 0.3 ? mock.Random.datetime('yyyy-MM-dd HH:mm:ss') : '',
    // 更正日
    updateTime: Math.random() < 0.5 ? mock.Random.datetime('yyyy-MM-dd HH:mm:ss') : '',
    // 基准日
    benchmarkTime: Math.random() < 0.5 ? mock.Random.datetime('yyyy-MM-dd HH:mm:ss') : '',
    // 基准价
    benchmarkPrice: Math.random() < 0.5 ? 32323 : null
  },
  userInfo: {
    id: mock.Random.guid(),
    name: mock.Random.cname(),
    nation: '龙族',
    mobile: 13911112222,
    email: mock.Random.email(),
    idCardType: '身份证',
    idCardCode: mock.Random.id(),
    address: '潜龙大陆江南基地市魂殿长老院韩跑跑病房 35 号'
  },
  callInfo: []
})

// 电话记录
const callRecords = builder({
  rows: Math.random() > 0.1 ? Array(8).fill(0).map((item, i) => ({
    id: i + 1,
    callName: mock.Random.cname(),
    mobile: Math.random() > 0.5 ? 0 : 1,
    callTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    duration: mock.Random.integer(1000, 100000)
  })) : [],
  currentPage: 1,
  totalSize: 8
})

// 操作记录
const actionLogs = builder({
  rows: Array(29).fill(0).map((item, i) => ({
    id: i + 1,
    type: `操作类型 - ${i + 1}`,
    department: '技术部',
    actionName: mock.Random.cname(),
    result: Math.random() > 0.5 ? 0 : 1,
    actionTime: mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remarks: mock.Random.cparagraph()
  })),
  currentPage: 1,
  totalSize: 29
})

// 表盒数据支持简单的分页查询
const queryTableData = (req, res) => {
  const { pageSize, currentPage, pageNo } = req.body
  const result = builder(createTablePage(+currentPage || +pageNo, +pageSize, tableList))
  return res.json(result)
}

// 接口列表
module.exports = {
  'POST /submit': common.submit,
  'GET /roles': common.roles,
  'GET /select/list': common.selectList,
  'POST /table/list': queryTableData,
  'GET /detail/info': detailInfo,
  'GET /detail/call/records': callRecords,
  'GET /detail/action/logs': actionLogs
}
