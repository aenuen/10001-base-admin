import { validateRequire } from 'abbott-methods/import'
import { fields } from './fields'
export const rulesDetail = {
  why: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.why) }],
  type: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.type, '选择') }],
  client: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.client) }],
  oppositeLitigant: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.oppositeLitigant) }],
  litigant: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.litigant) }],
  name: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.name) }],
  idType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.idType, '选择') }],
  idNumber: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.idNumber) }],
  parties: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.parties) }],
  stage: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.stage, '选择') }],
  price: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.price) }],
  department: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.department) }],
  contract: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.contract, '上传') }],
  letter: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.letter, '上传') }]
}
