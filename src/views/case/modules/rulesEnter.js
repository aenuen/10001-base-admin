import { validateDate, validatePrice } from 'abbott-methods/import'
import { fields } from './fields'
export const rulesForm = {
  enterPrice: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.enterPrice) }],
  enterDate: [{ validator: (rule, value, callback) => validateDate(rule, value, callback, fields.enterDate) }]
}
