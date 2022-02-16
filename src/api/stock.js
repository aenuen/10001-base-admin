import request from '@/libs/axios/request'

// 是否存在
export const stockExist = stock => request({ url: '/stock/exist', method: 'post', data: stock })

export const stockInsert = stock => request({ url: '/stock/insert', method: 'post', data: stock })

export const stockUpdate = stock => request({ url: '/stock/update', method: 'post', data: stock })

export const stockData = id => request({ url: '/stock/data', method: 'get', params: { id }})

export const stockHistory = id => request({ url: '/stock/history', method: 'get', params: { id }})

// 获取列表
export const stockList = params => request({ url: '/stock/list', methods: 'get', params })

export const stockOut = stock => request({ url: '/stock/out', method: 'post', data: stock })

export const stockAttr = params => request({ url: '/stock/attr', methods: 'get', params })

// 获取列表
export const stockMonth = params => request({ url: '/stock/month', methods: 'get', params })
