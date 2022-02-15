/**
 * @description 空值
 * @param value
 */
export const emptyValueFilter = value => {
  return !value || value.toString().toLowerCase() === 'null' || value.toString().toLowerCase() === 'undefined' ? '--' : value
}
