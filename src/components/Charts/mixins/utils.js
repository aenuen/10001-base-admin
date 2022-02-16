/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function() {
    const last = +new Date() - timestamp // 据上一次触发时间间隔
    if (last < wait && last > 0) { // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) { // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait) // 如果延时不存在，重新设定延时
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
