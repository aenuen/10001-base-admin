import { validateUsername, validateRequire } from 'abbott-methods/import'
export const loginRules = {
  username: [{ validator: validateUsername }],
  password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '密码', 6, 20) }]
}
