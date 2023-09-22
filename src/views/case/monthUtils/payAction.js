import { caseApi } from '@/api/case'
import { arrayOrderByField } from 'abbott-methods/import'
export const payAction = (yearMonth, lawyer) => new Promise((resolve) => {
  caseApi.payList({ yearMonth, lawyer }).then(({ code, data }) => {
    const list = code === 200 ? data.list : []
    const listData = arrayOrderByField(list, 'yearMonth', true)
    let memberTotal = 0
    let payTotal = 0
    let salaryTotal = 0
    let unclearedTotal = 0
    let taxedTotal = 0
    listData.forEach((res) => {
      memberTotal += +res.member
      payTotal += +res.pay
      salaryTotal += +res.salary
      unclearedTotal += +res.uncleared
      taxedTotal += +res.taxed
    })
    resolve({
      list: listData,
      data: {
        memberTotal: +memberTotal.toFixed(2),
        payTotal: +payTotal.toFixed(2),
        salaryTotal: +salaryTotal.toFixed(2),
        unclearedTotal: +unclearedTotal.toFixed(2),
        taxedTotal: +taxedTotal.toFixed(2)
      }
    })
  })
})
