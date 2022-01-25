const Mock = require('mockjs2')
const delay = require('mocker-api/lib/delay')
const { addPrefix, mockerToMock } = require('./utils')
const user = require('./modules/user')
const mock = require('./modules/mock')

/**
 * 接口延时时间，模拟真实数据请求状态
 */
const timeout = 30

const data = {
  ...addPrefix(user),
  ...addPrefix(mock)
}

if (process.env.VUE_APP_USE_MOCKER === 'true') {
  module.exports = delay(data, timeout)
} else {
  mockerToMock(data).forEach(([method, link, fn]) => {
    Mock.mock(link, method, fn)
  })
  Mock.setup({
    timeout
  })
}
