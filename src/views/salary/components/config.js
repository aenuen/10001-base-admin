export const fields = {
  personal: '个人',
  unit: '单位',
  id: '编号',
  work: '操作',
  company: '所属公司',
  name: '姓名',
  department: '所属部门',
  team: '项目组',
  basePay: '基本工资',
  meritPay: '绩效工资',
  assessment: '考核',
  subsidy: '补贴',
  myPension: '养老保险',
  myUnemployment: '失业保险',
  myMedicalCare: '医疗保险',
  myIncomeTax: '所得税',
  unPension: '养老保险',
  unUnemployment: '失业保险',
  unInjury: '工伤保险',
  unMedicalCare: '医疗保险',
  unBirth: '生育保险',
  isUse: '启用状态',
  subtotal: '小计'
}

export const validateRequire = (rule, value, callback) => {
  if (!value || value.length === 0) {
    return callback(new Error(fields[rule.field] + '必须填写'))
  } else {
    callback()
  }
}

export const companyObject = {
  1: { key: 1, value: '尚德', label: '尚德' },
  2: { key: 2, value: '露申', label: '露申' },
  3: { key: 3, value: '兴晨', label: '兴晨' },
  4: { key: 4, value: '律所', label: '律所' },
  5: { key: 5, value: '鑫焱', label: '鑫焱' },
  6: { key: 6, value: '逸嘉', label: '逸嘉' },
  7: { key: 7, value: '居乐', label: '居乐' },
  8: { key: 8, value: '康鑫诚', label: '康鑫诚' },
  9: { key: 9, value: '陆鲁', label: '陆鲁' }
}

export const departmentObject = [
  { value: '研发' },
  { value: '管理组' },
  { value: '律师组' }
]

export const teamObject = [
  { value: 'RD01' },
  { value: 'RD02' },
  { value: 'RD03' },
  { value: 'RD04' },
  { value: 'RD05' },
  { value: 'RD06' },
  { value: 'RD07' },
  { value: 'RD08' },
  { value: 'RD09' },
  { value: 'RD10' },
  { value: '销售人员' },
  { value: '行政人员' }
]

export const basePayObject = [
  { value: '3500' },
  { value: '4000' },
  { value: '4500' },
  { value: '5000' }
]
export const meritPayObject = [
  { value: '3000' },
  { value: '3500' },
  { value: '4000' },
  { value: '4500' },
  { value: '5000' }
]

export const myPensionObject = [
  { value: '0' },
  { value: '280' }
]

export const myUnemploymentObject = [
  { value: '0' },
  { value: '17.5' }
]

export const myMedicalCareObject = [
  { value: '0' },
  { value: '69.77' },
  { value: '70' },
  { value: '73.52' }
]

export const myMedicalCareLinkage = [
  ['0', '0'],
  ['279.07', '24.42'],
  ['280', '24.5'],
  ['294.08', '25.73']
]

export const unPensionObject = [
  { value: '0' },
  { value: '560' }
]

export const unUnemploymentObject = [
  { value: '0' },
  { value: '17.5' }
]

export const unInjuryObject = [
  { value: '0' },
  { value: '7' },
  { value: '12.25' },
  { value: '19.25' }
]

export const unMedicalCareObject = [
  { value: '0' },
  { value: '279.07' },
  { value: '280' }
]

export const unBirthObject = [
  { value: '0' },
  { value: '24.42' },
  { value: '24.5' }
]

export const startYeahMonth = '2021-01'

export const defaultPostForm = {
  department: '研发',
  basePay: 3500,
  myPension: 280,
  myUnemployment: 17.5,
  myMedicalCare: 0,
  unPension: 560,
  unUnemployment: 17.5,
  unInjury: 7,
  unMedicalCare: 0,
  unBirth: 0
}
