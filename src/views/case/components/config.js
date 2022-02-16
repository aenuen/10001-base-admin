export const fields = {
  id: '编号',
  orderId: '序号',
  view: '浏览',
  work: '操作/状态/入账时间',
  state: '状态',
  caseName: '案名',
  caseNumber: '字号',
  caseUseName: '案号',
  why: '案由',
  type: '类别',
  client: '委托人',
  oppositeLitigant: '对方当事人',
  litigant: '当事人',
  name: '当事人姓名或单位名称',
  idType: '当事人证件类型',
  idNumber: '当事人证件号码',
  parties: '当事人当事方',
  stage: '代理阶段',
  disputePrice: '争议标的额',
  price: '律师代理费',
  power: '代理权限',
  term: '代理期限',
  department: '受理部门',
  isInvoice: '是否开发票',
  contract: '合同',
  letter: '所函',
  inType: '发票类型',
  inNumber: '发票号码',
  inNot: '不含税价',
  inRate: '税额',
  inHave: '含税价',
  invoiceDate: '发票日期',
  enterDate: '入账时间',
  clientUseName: '合同客户',
  buyCompany: '购访企业',
  createRealName: '承办律师',
  delivery: '合同原件交付情况',
  createTime: '创建时间',
  payed: '现律所已支付',
  addPay: '增加律所已支付',
  membered: '现会员费个人',
  addMember: '增加会员费个人',
  nowSalary: '现有工资',
  addSalary: '增加工资',
  nowUncleared: '现有未结清',
  addUncleared: '增加未结清',
  memo: '备注',
  isRisk: '是否风险'
}

export const startYearMonth = '2021-06'

export const idTypeObject = [
  { key: 1, value: '身份证' },
  { key: 2, value: '社会统一信用代码' }
]

export const typeObject = [
  { key: 1, value: '民事' },
  { key: 2, value: '刑事' },
  { key: 3, value: '顾问' },
  { key: 4, value: '行政' },
  { key: 5, value: '非讼' },
  { key: 6, value: '援助' },
  { key: 7, value: '仲裁' },
  { key: 8, value: '刑附民' },
  { key: 9, value: '风险' }
]

export const stageOne = [ // 民事
  { key: 1, value: '一审' },
  { key: 2, value: '二审' },
  { key: 3, value: '执行' },
  { key: 4, value: '再审' }
]

export const stageTwo = [ // 刑事
  { key: 1, value: '一审' },
  { key: 2, value: '二审' },
  { key: 3, value: '侦查' },
  { key: 4, value: '起诉' }
]

export const stageThree = [
  { key: 1, value: '一审' },
  { key: 2, value: '二审' }
]

export const stageZero = [ // 空
  { key: 1, value: '无' }
]

export const caseNameObject = [
  { key: 1, value: '乐民一' },
  { key: 2, value: '乐民二' },
  { key: 3, value: '乐民执' },
  { key: 4, value: '乐民再' },
  { key: 5, value: '乐刑一' },
  { key: 6, value: '乐刑二' },
  { key: 7, value: '乐刑侦' },
  { key: 8, value: '乐刑起' },
  { key: 9, value: '乐顾' },
  { key: 10, value: '乐行一' },
  { key: 11, value: '乐行二' },
  { key: 12, value: '乐非' },
  { key: 13, value: '乐援' },
  { key: 14, value: '乐仲' },
  { key: 15, value: '乐风险' },
  { key: 16, value: '乐刑附民一' },
  { key: 17, value: '乐刑附民二' },
  { key: 18, value: '乐刑附民侦' },
  { key: 19, value: '乐刑附民起' }
]

export const stateObject = [
  { key: 1, value: '继续录入' },
  { key: 2, value: '等待审批' },
  { key: 3, value: '待开发票' },
  { key: 4, value: '确认入账' },
  { key: 5, value: '款已入账' }
]

export function parseData(data) {
  const big = data.length
  const json = {
    basePay: 0,
    meritPay: 0,
    myPension: 0,
    myUnemployment: 0,
    myMedicalCare: 0,
    myIncomeTax: 0,
    unPension: 0,
    unUnemployment: 0,
    unMedicalCare: 0,
    unInjury: 0,
    unBirth: 0
  }
  if (big) {
    Object.keys(data).forEach(key => {
      const info = data[key]
      // noinspection DuplicatedCode
      json.basePay = (+json.basePay + +info.basePay).toFixed(2)
      json.meritPay = (+json.meritPay + +info.meritPay).toFixed(2)
      json.myPension = (+json.myPension + +info.myPension).toFixed(2)
      json.myUnemployment = (+json.myUnemployment + +info.myUnemployment).toFixed(2)
      json.myMedicalCare = (+json.myMedicalCare + +info.myMedicalCare).toFixed(2)
      // noinspection DuplicatedCode
      json.myIncomeTax = (+json.myIncomeTax + +info.myIncomeTax).toFixed(2)
      json.unPension = (+json.unPension + +info.unPension).toFixed(2)
      json.unUnemployment = (+json.unUnemployment + +info.unUnemployment).toFixed(2)
      json.unMedicalCare = (+json.unMedicalCare + +info.unMedicalCare).toFixed(2)
      json.unInjury = (+json.unInjury + +info.unInjury).toFixed(2)
      json.unBirth = (+json.unBirth + +info.unBirth).toFixed(2)
    })
  }
  return json
}
