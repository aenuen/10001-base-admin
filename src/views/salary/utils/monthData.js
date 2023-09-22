import { calcSum } from 'abbott-methods/import'
export const monthData = (ary) => {
  ary.forEach((item) => {
    // 工资合计
    item.payTotal = calcSum([item.basePay, item.meritPay])
    // 补贴扣款合计
    item.SAndDTotal = calcSum([item.subsidy, -item.deduct])
    // 收入
    item.income = calcSum([item.payTotal, item.SAndDTotal])
    // 个人代缴合计
    item.personalTotal = calcSum([item.myPension, item.myUnemployment, item.myMedicalCare, item.myAccumulationFund, item.myIncomeTax])
    // 发放表合计
    item.grantPay = +calcSum([item.income, -item.personalTotal]).toFixed(2)
    // 单位社医保
    item.socialPay = calcSum([item.unPension, item.unUnemployment, item.unMedicalCare, item.unAccumulationFund, item.unInjury, item.unBirth])
  })
  return ary
}
