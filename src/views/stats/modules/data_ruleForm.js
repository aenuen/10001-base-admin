import { pmValidate } from 'plugins-methods'
import fields from './data_fields'

export default {
  yearMonth: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.yearMonth) }],
  client: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.client) }],
  product: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.product) }],
  company: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.company) }],
  project: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.project) }]
}
