import request from '@/libs/axios/request'

// 项目添加
export const projectInsert = data => request({ url: '/project/insert', method: 'post', data })

// 项目列表
export const projectList = params => request({ url: '/project/list', methods: 'get', params })
