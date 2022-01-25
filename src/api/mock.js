/**
 * 给模板库使用的 mock 接口
 */

import request from '@/utils/request'

// 通用的表单提交
export function onSubmit (data) {
  return request({
    mockUrl: '/mock/submit',
    method: 'post',
    data
  })
}

// 获取列表信息
export function queryTableData (data) {
  return request({
    method: 'post',
    mockUrl: '/mock/table/list',
    data
  })
}

// 获取下拉列表
export function querySelectData (params) {
  return request({
    mockUrl: '/mock/select/list',
    method: 'get',
    params
  })
}

// 获取角色信息
export function queryRoles (params) {
  return request({
    mockUrl: '/mock/roles',
    method: 'get',
    params
  })
}

// 获取详情信息
export function queryDetailInfo (params) {
  return request({
    mockUrl: '/mock/detail/info',
    method: 'get',
    params
  })
}

// 获取通话记录
export function queryCallRecords (params) {
  return request({
    mockUrl: '/mock/detail/call/records',
    method: 'get',
    params
  })
}

// 获取详情的日志记录
export function queryActionLogs (params) {
  return request({
    mockUrl: '/mock/detail/action/logs',
    method: 'get',
    params
  })
}
