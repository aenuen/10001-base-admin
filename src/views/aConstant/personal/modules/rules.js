import { pmValidate } from 'plugins-methods'
import { fields } from '@/views/aConstant/personal/modules/fields'

export const BaseDataRule = {
  petName: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.petName, '填写', 3, 20) }],
  realName: [{ validator: (rule, value, callback) => pmValidate.validateAllCn(rule, value, callback, fields.realName, 2, 20) }]
}

export const PasswordRule = {
  passwordOld: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `旧${fields.password}`, '填写', 6, 20) }],
  passwordNew: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `新${fields.password}`, '填写', 6, 20) }],
  passwordRep: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `确认${fields.password}`, '填写', 6, 20) }]
}

export const EmailRule = {
  newEmail: [{ validator: (rule, value, callback) => pmValidate.validateEmail(rule, value, callback) }]
}
export const MobileRule = {
  newEmail: [{ validator: (rule, value, callback) => pmValidate.validateMobile(rule, value, callback) }]
}

export const DetailRule = {
  username: [{ validator: pmValidate.validateUsername }],
  password: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.password, '填写', 6, 20) }],
  petName: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.petName, '填写', 2, 20) }],
  realName: [{ validator: (rule, value, callback) => pmValidate.validateAllCn(rule, value, callback, fields.realName, 2, 20) }],
  email: [{ validator: (rule, value, callback) => pmValidate.validateEmail(rule, value, callback) }],
  mobile: [{ validator: (rule, value, callback) => pmValidate.validateMobile(rule, value, callback) }],
  role: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.role) }]
}
