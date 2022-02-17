import { pmValidate } from 'plugins-methods'
import { fields } from '@/views/aConstant/personal/modules/fields'

export const BaseDataRule = {
  nickName: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.nickName, 3, 20) }],
  realName: [{ validator: (rule, value, callback) => pmValidate.validateAllCn(rule, value, callback, fields.realName, 2, 20) }]
}

export const PasswordRule = {
  passwordOld: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `旧${fields.password}`, '填写', 6, 20) }],
  passwordNew: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `新${fields.password}`, '填写', 6, 20) }],
  passwordRep: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `确认${fields.password}`, '填写', 6, 20) }]
}

export const AvatarRule = {
  avatar: [
    {
      validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.avatar, '选择')
    }
  ]
}
