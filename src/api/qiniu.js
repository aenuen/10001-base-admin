import request from '@/libs/axios/request'

export const getToken = () => request({ url: '/qiniu/upload/token', method: 'get' }) // 假地址 自行替换
