import { validateDate, validateAllNumber, validatePrice } from 'abbott-methods/import'
import { fields } from './fields'
export const rulesForm = {
  inNumber: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, fields.inNumber) }],
  inHave: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.inHave) }],
  inTax: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, fields.inTax) }],
  inRate: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.inRate) }],
  inNot: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.inNot) }],
  invoiceDate: [{ validator: (rule, value, callback) => validateDate(rule, value, callback, fields.invoiceDate) }]
}
