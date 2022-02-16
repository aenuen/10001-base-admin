import request from '@/libs/axios/request'

export const searchUser = name => request({ url: '/vue-element-admin/search/user', method: 'get', params: { name }})

export const transactionList = query => request({ url: '/vue-element-admin/transaction/list', method: 'get', params: query })
