import { validateRequire, validateAllCn, validateEmail, validateMobile, validateUsername } from 'abbott-methods/import'
import { fields } from '@/views/aConstant/manager/modules/fields'
export const rules = {
  username: [{ validator: validateUsername }],
  password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, `${fields.password}`, '填写', 6, 20) }],
  affirmPassword: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, `${fields.affirmPassword}`, '填写', 6, 20) }],
  petName: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.petName, '填写', 2, 20) }],
  realName: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.realName, 2, 20) }],
  email: [{ validator: (rule, value, callback) => validateEmail(rule, value, callback) }],
  mobile: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }]
}
