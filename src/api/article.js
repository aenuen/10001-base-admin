import request from '@/libs/axios/request'

export const fetchList = query => request({ url: '/vue-element-admin/article/list', method: 'get', params: query })
export const fetchArticle = id => request({ url: '/vue-element-admin/article/detail', method: 'get', params: { id }})
export const fetchPv = pv => request({ url: '/vue-element-admin/article/pv', method: 'get', params: { pv }})
export const createArticle = data => request({ url: '/vue-element-admin/article/create', method: 'post', data })
export const updateArticle = data => request({ url: '/vue-element-admin/article/update', method: 'post', data })
