import qs from 'qs'
import store from '@/store'
import { getToken } from '@/libs/utils/token'
import request from './request'

const handle = (url, method, dataset = {}) => {
  const param = {
    url,
    method,
    [method === 'get' ? 'params' : 'data']: dataset,
    paramsSerializer: params => qs.stringify(params)
  }
  if (store.getters.token) {
    param.headers = {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      'cached-control': 'no-cache'
    }
  }
  return request(param)
}

export { handle }
