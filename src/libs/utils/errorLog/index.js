import Vue from 'vue'
import { pmType } from 'plugins-methods'
import store from '@/store'
import settings from '@/settings'

const { errorLog: needErrorLog } = settings
const checkNeed = () => {
  const env = process.env.NODE_ENV
  if (pmType.typeString(needErrorLog)) {
    return env === needErrorLog
  }
  if (pmType.typeArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info, a) {
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', { err, vm, info, url: window.location.href }).then()
    })
  }
}
