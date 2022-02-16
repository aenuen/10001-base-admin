import request from '@/libs/axios/request'
export const ebookInsert = ebook => request({ url: '/ebook/insert', method: 'post', data: ebook }) // 新增电子书
export const ebookDelete = fileName => request({ url: '/ebook/delete', methods: 'post', params: { fileName }}) // 更新电子书
export const ebookUpdate = ebook => request({ url: '/ebook/update', method: 'post', data: ebook })
export const ebookData = fileName => request({ url: '/ebook/data', method: 'get', params: { fileName }}) // 获取电子书
export const ebookList = params => request({ url: '/ebook/list', methods: 'get', params }) // 获取电子书列表
export const categoryList = () => request({ url: '/ebook/categoryList', methods: 'get' }) // 获取电子书分类

