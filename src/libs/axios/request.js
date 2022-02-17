import axios from 'axios'
import { Message } from 'element-ui'
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
    return Promise.reject(new Error(errMsg))
  } else {
    return res
  }
}, error => { // 状态非200才会到这里来
  const { code, msg } = error.response.data
  Message({ message: msg || '', type: 'error', duration: 5 * 1000 })
  if (code === -2) {
    setTimeout(() => {
      location.reload()
    }, 1000)
  }
  return Promise.reject(error)
})

export default service
