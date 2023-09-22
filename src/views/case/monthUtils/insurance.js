import { caseApi } from '@/api/case'
export const insurance = (yearMonth, lawyer) => new Promise((resolve) => {
  caseApi.insurance({ yearMonth, lawyer }).then(({ code, data }) => {
    const list = code === 200 ? data.list : []
    const isThat = ['梁泓燕', '许永云'].includes(lawyer) // '梁泓燕', '许永云' 只需要付单位
    let total = 0
    let myIncomeTax = 0
    list.forEach((res) => {
      const one = +(+res.unPension + +res.unUnemployment + +res.unMedicalCare + +res.unBirth + +res.unInjury).toFixed(2)
      const two = +(+one + +res.myPension + +res.myUnemployment + +res.myMedicalCare).toFixed(2)
      res.subtotal = isThat ? one : two
      total += +res.subtotal
      myIncomeTax += +res.myIncomeTax
    })
    total = +total.toFixed(2)
    myIncomeTax = +myIncomeTax.toFixed(2)
    resolve({ list, total, myIncomeTax, isThat })
  })
})
