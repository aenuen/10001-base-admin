import { pmValidate } from 'plugins-methods'
import fields from './fields'

export default {
  signTime: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.signTime) }],
  signer: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.signer) }]
}
