import request from '@/libs/axios/request'
// post
export const depreciationCreate = (data) => request({ url: '/depreciation/create', method: 'post', data }) // 创建
export const depreciationEdit = (data) => request({ url: '/depreciation/edit', method: 'post', data }) // 创建
export const depreciationDel = (data) => request({ url: '/depreciation/del', method: 'post', data }) // 删除

// get
export const depreciationList = (params) => request({ url: '/depreciation/list', method: 'get', params }) // 列表
export const depreciationData = (params) => request({ url: '/depreciation/data', method: 'get', params }) // 资料
export const depreciationMonth = (params) => request({ url: '/depreciation/month', method: 'get', params }) // 月表
