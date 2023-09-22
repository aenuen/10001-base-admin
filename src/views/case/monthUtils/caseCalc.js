import { caseApi } from '@/api/case'
import { calcSum } from 'abbott-methods/import'

export const caseCalc = (yearMonth, lawyer) => new Promise((resolve) => {
  caseApi.monthList({ yearMonth, lawyer }).then(({ code, data }) => {
    const list = code === 200 ? [...data.list] : []
    let total = 0 // 案件总额
    let enter = 0 // 入账总额
    const vat = [] // 增值税
    list.forEach((item) => {
      total += +item.price
      enter += +item.enterPrice
      if (item.createYearMonth < '2022-04') {
        vat.push(+item.price)
      }
    })
    const vatTotal = calcSum(vat)
    resolve({
      list,
      total: +total.toFixed(2),
      enter: +enter.toFixed(2),
      vatTotal
    })
  })
})
