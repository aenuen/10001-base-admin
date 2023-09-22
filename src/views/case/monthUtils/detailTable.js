export const detailTable = (obj, lawyer) => {
  const isBoss = lawyer === '叶文' || lawyer === '郭锦标'
  const isTenant = lawyer === '郭锦标'
  const a = { oneName: '管理费', oneValue: obj.manage, oneDetail: '案件总额 * 0.05' }
  const b = { twoName: '社保医保', twoValue: obj.insuranceTotal, twoDetail: '今年累计社保医保' }
  const c = { threeName: '工资', threeValue: obj.salaryTotal, threeDetail: '今年累计工资' }
  const d = { oneName: '个税', oneValue: obj.myIncomeTax, oneDetail: '今年累计个税' }
  const e = { twoName: '增值税款', twoValue: obj.vatTotal, twoDetail: '案件总额 / 1.01 * 0.01' }
  const f = { threeName: '会计', threeValue: obj.accountantTotal, threeDetail: '每月：' + (isBoss ? '2000 / 3 = 666.67' : '0') }
  const g = { oneName: '财务', oneValue: obj.financeTotal, oneDetail: '每月：' + (isBoss ? '6000 / 3 = 2000' : '0') }
  const h = { twoName: '税点', twoValue: obj.taxPointTotal, twoDetail: '入账总额 * 0.1' }
  const i = { threeName: '会员费个人', threeValue: obj.memberTotal, threeDetail: '每年：1700' }
  const j = { oneName: '会员费律所', oneValue: obj.memberCompany, oneDetail: '每年：' + (isBoss ? '5000' : '0') }
  const k = { twoName: '互助基金', twoValue: obj.mutualFund, twoDetail: '每年：100' }
  const l = { threeName: '商业保险', threeValue: obj.businessInsurance, threeDetail: '每年：180' }
  const m = { oneName: '医疗补充保险', oneValue: obj.medicalInsurance, oneDetail: '每年：0' }
  const n = { twoName: '残疾人就业基金', twoValue: obj.employmentFund, twoDetail: '入账总额 * 0.01' }
  const o = { threeName: '工会', threeValue: obj.labourUnion, threeDetail: '工资 * 0.025' }
  const p = { oneName: '附加费', oneValue: obj.surcharges, oneDetail: '每年：增值税 * 0.125' }
  const q = { twoName: '软件费', twoValue: obj.soft, twoDetail: '每年：' + (isBoss ? '10000 / 3' : '0') }
  const r = { threeName: '房间租用费', threeValue: obj.rentals, threeDetail: isTenant ? '每月：3000' : '每年：0' }
  const s = { oneName: '总计', oneValue: obj.total, oneDetail: '以上六行各项的总和' }
  const t = { twoName: '律所已支付	', twoValue: obj.payTotal, twoDetail: '已向律师支付的金额' }
  const u = { threeName: '入账总额	', threeValue: obj.enterTotal, threeDetail: '所有案件入账总和' }
  const v = { oneName: '律所应付	', oneValue: obj.needPay, oneDetail: '注：不包含未结清' }
  const w = { twoName: '未结清	', twoValue: obj.unclearedTotal, twoDetail: '去年还未结清的金额' }

  return [
    { ...a, ...b, ...c },
    { ...d, ...e, ...f },
    { ...g, ...h, ...i },
    { ...j, ...k, ...l },
    { ...m, ...n, ...o },
    { ...p, ...q, ...r },
    { ...s, ...t, ...u },
    { ...v, ...w }
  ]
}
