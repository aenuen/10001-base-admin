import request from '@/libs/axios/request'
// post
export const amortizationCreate = (data) => request({ url: '/amortization/create', method: 'post', data }) // 创建
export const amortizationEdit = (data) => request({ url: '/amortization/edit', method: 'post', data }) // 创建
export const amortizationDel = (data) => request({ url: '/amortization/del', method: 'post', data }) // 删除

// get
export const amortizationList = (params) => request({ url: '/amortization/list', method: 'get', params }) // 列表
export const amortizationData = (params) => request({ url: '/amortization/data', method: 'get', params }) // 资料
export const amortizationMonth = (params) => request({ url: '/amortization/month', method: 'get', params }) // 月表
