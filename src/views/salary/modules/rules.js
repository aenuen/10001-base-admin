import { validateAllCn, validateRequire } from 'abbott-methods/import'
import { fields } from './fields'
export const detailRulesForm = {
  company: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.company) }],
  name: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.name) }]
}
