import request from '@/libs/axios/request'

export const statsCompany = params => request({ url: '/stats/company', method: 'get', params })
export const statsList = params => request({ url: '/stats/list', method: 'get', params })
export const statsDetail = params => request({ url: '/stats/detail', method: 'get', params })
export const statsMonth = params => request({ url: '/stats/month', method: 'get', params })

export const statsCreate = data => request({ url: '/stats/create', method: 'post', data })
export const statsUpdate = data => request({ url: '/stats/update', method: 'post', data })
export const statsDelete = data => request({ url: '/stats/delete', method: 'post', data })
