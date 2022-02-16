import request from '@/libs/axios/request'

export const expressCreate = data => request({ url: '/express/create', method: 'post', data })
export const expressDelete = data => request({ url: '/express/delete', method: 'post', data })
export const expressUpdate = data => request({ url: '/express/update', method: 'post', data })
export const expressSignIn = data => request({ url: '/express/SignIn', method: 'post', data })

export const expressList = params => request({ url: '/express/list', method: 'get', params })
export const expressDetail = params => request({ url: '/express/detail', method: 'get', params })
export const expressOnce = () => request({ url: '/express/once', method: 'get' }) // 曾经的记录
