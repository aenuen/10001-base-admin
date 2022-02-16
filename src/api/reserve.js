import request from '@/libs/axios/request'

export const reserveExist = (data) => request({ url: '/reserve/exist', method: 'post', data }) // 是否存在
export const reserveCreate = (data) => request({ url: '/reserve/create', method: 'post', data }) // 创建
export const reserveList = (params) => request({ url: '/reserve/list', method: 'get', params }) // 列表
export const reserveData = (params) => request({ url: '/reserve/data', method: 'get', params }) // 数据
export const reserveHistory = (params) => request({ url: '/reserve/history', method: 'get', params }) // 数据
export const reserveAddNumber = (data) => request({ url: '/reserve/addNumber', method: 'post', data }) // 增加数量
export const reserveOut = (data) => request({ url: '/reserve/out', method: 'post', data }) // 出库
export const reserveEdit = (data) => request({ url: '/reserve/edit', method: 'post', data }) // 编辑
export const reserveMonth = (params) => request({ url: '/reserve/month', method: 'get', params }) // 月数据
