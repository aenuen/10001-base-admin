import { pmValidate } from 'plugins-methods'
import fields from './fields'

export default {
  expressCompany: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.expressCompany) }],
  expressId: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.expressId) }],
  sendTime: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.sendTime) }],
  sender: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.sender) }],
  content: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.content) }],
  address: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.address) }],
  recipients: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.recipients) }]
}
