module.exports = {
  // 处理成统一的数据结构
  builder (data = null, code = 0, message = '') {
    return {
      data,
      code,
      message
    }
  },
  // 添加统一的前缀
  addPrefix (data) {
    const res = {}
    Object.entries(data).forEach(([key, value]) => {
      res[key.replace(/\s+\//, ' /mock/')] = value
    })
    return res
  },
  // 创建表格分页数据
  createTablePage (currentPage = 1, pageSize = 10, totalData = []) {
    const totalSize = totalData.length
    const tableData = {
      rows: [],
      currentPage,
      pageSize,
      totalSize
    }
    // pageSize 大于等于总数据长度，说明只有 1 页数据或没有数据
    if (pageSize >= totalSize) {
      tableData.rows = totalData
      // 直接取第 1 页
      tableData.page = 1

    // pageSize 小于总数据长度，数据多余 1 页
    } else {
      // 计算当前页（不含）之前的所有数据总条数
      const total = pageSize * (currentPage - 1)
      // 如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
      if (total < totalSize) {
        // 当前页第一条数据在总数据集中的索引
        const startIndex = total
        // 当前页最后一条数据索引
        const endIndex = total + pageSize - 1
        // 当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
        tableData.rows = totalData.filter((item, index) => index >= startIndex && index <= endIndex)

      // 当前页码超出最大页码，则计算实际最后一页的 page，自动返回最后一页数据
      } else {
        // 取商
        const size = parseInt(totalSize / pageSize)
        // 取余数
        const rest = totalSize % pageSize
        // 余数大于 0，说明实际最后一页数据不足 pageSize，应该取 size + 1 为最后一条的页码
        if (rest > 0) {
          // 当前页码重置，取 size + 1
          tableData.page = size + 1
          tableData.rows = totalData.filter((item, index) => index >= (pageSize * size) && index <= totalSize)

        // 余数等于 0，最后一页数据条数正好是 pageSize
        } else if (rest === 0) {
          // 当前页码重置，取 size
          tableData.page = size
          tableData.rows = totalData.filter((item, index) => index >= (pageSize * (size - 1)) && index <= totalSize)
        }
      }
    }
    return tableData
  },
  // 将 mocker-api 的数据 mock 形式转换成 mockjs2 所支持的形式
  mockerToMock (data) {
    return Object.entries(data).map(([key, fn]) => {
      const [method, link] = key.trim().split(/\s+/)
      // 如果是函数，包装一层，将数据格式转换成 function(req, res) 的形式
      let newFn = fn
      if (typeof fn === 'function') {
        newFn = options => {
          let body = {}
          if (options.body) {
            try {
              // 如果是 JSON 字符串
              body = JSON.parse(options.body)
            } catch (error) {
              // 否则将数据转换成对象，a=1&b=2 => {a: 1, b: 2}
              options.body.split('&').forEach((params) => {
                const [key, value] = params.split('=')
                body[key] = value
              })
            }
          }
          const query = {}
          const queryString = options.url.split('?')[1]
          if (queryString) {
            queryString.split('&').forEach((params) => {
              const [key, value] = params.split('=')
              query[key] = value
            })
          }
          // 请求体
          const req = {
            url: options.url,
            method: options.type,
            body,
            query
          }
          // 响应体
          const res = {
            json: data => data
          }
          return fn(req, res)
        }
      }
      return [method.toLowerCase(), new RegExp(link), newFn]
    })
  }
}
