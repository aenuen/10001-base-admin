import request from '@/libs/axios/request'

export const salaryBatchUpdate = data => request({ url: '/salary/batchUpdate', method: 'post', data })

export const salaryInsert = data => request({ url: '/salary/insert', method: 'post', data })

export const salaryUpdate = data => request({ url: '/salary/update', method: 'post', data })

export const salaryMonthUpdate = data => request({ url: '/salary/monthUpdate', method: 'post', data })

export const salaryData = id => request({ url: '/salary/data', method: 'get', params: { id }})

export const salaryMonthData = id => request({ url: '/salary/monthData', method: 'get', params: { id }})

export const salaryList = params => request({ url: '/salary/list', methods: 'get', params })

export const salaryMonth = params => request({ url: '/salary/month', methods: 'get', params })

export const salaryState = data => request({ url: '/salary/State', method: 'post', data })

export const salarySave = data => request({ url: '/salary/Save', method: 'post', data })

export const salaryIncomeTax = data => request({ url: '/salary/incomeTax', method: 'post', data })

export const salaryName = params => request({ url: '/salary/name', methods: 'get', params })

export const salaryPersonal = params => request({ url: '/salary/personal', methods: 'get', params })

export const salaryLawyer = params => request({ url: '/salary/lawyer', methods: 'get', params })

export const salaryClear = data => request({ url: '/salary/clear', method: 'post', data })

export const salaryMonthDel = data => request({ url: '/salary/monthDel', method: 'post', data })

export const salaryAllList = params => request({ url: '/salary/allList', methods: 'get', params })

export const salaryAddMonthPersonnel = data => request({ url: '/salary/addMonthPersonnel', method: 'post', data })
