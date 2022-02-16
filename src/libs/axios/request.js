import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/libs/utils/token'
import { apiBaseUrl } from './settings'

const service = axios.create({ // 创建一个axios实例
  baseURL: apiBaseUrl,
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 5000 // 超时时间
})

service.interceptors.request.use( // 请求拦截器
  config => {
    if (store.getters.token) {
      config.headers = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        'cached-control': 'no-cache'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(response => { // 响应拦截器
  const res = response.data
  if (res.code !== 200) {
    const errMsg = res.msg || '请求失败！'
    Message({ message: errMsg, type: 'error', duration: 5 * 1000 })
    if (res.code === 2) {
      MessageBox.confirm('您已注销，可以取消以停留在此页面，或重新登录', '确认登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => { location.reload() })
      })
    }
    return Promise.reject(new Error(errMsg))
  } else {
    return res
  }
}, error => { // 状态非200才会到这里来
  const { code, msg } = error.response.data
  Message({ message: msg || '', type: 'error', duration: 5 * 1000 })
  if (code === 599) {
    setTimeout(() => { location.reload() }, 1000)
  }
  return Promise.reject(error)
})

export default service
