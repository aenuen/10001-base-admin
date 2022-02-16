import request from '@/libs/axios/request'
import Dispatch from '@/libs/axios/dispatch'

export const userDispatch = new Dispatch({
  login: ['/user/login', 'post'] // 更新密码
})

export const login = data => request({ url: '/user/login', method: 'post', data })

export const getInfo = () => request({ url: '/user/info', method: 'get' })

export const userList = params => request({ url: '/user/list', method: 'get', params })

export const userLawyer = () => request({ url: '/user/lawyer', method: 'get' })

export const logout = () => request({ url: '/user/logout', method: 'post' })

export const userBase = data => request({ url: '/user/base', method: 'post', data })

export const userEmail = data => request({ url: '/user/email', method: 'post', data })

export const userMobile = data => request({ url: '/user/mobile', method: 'post', data })

export const userPassword = data => request({ url: '/user/password', method: 'post', data })

export const userInsert = data => request({ url: '/user/insert', method: 'post', data })

export const userState = data => request({ url: '/user/State', method: 'post', data })
