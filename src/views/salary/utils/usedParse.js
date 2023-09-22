import { arrayOrderByField, typeNumber, typeString } from 'abbott-methods/import'

export const usedParseEmpty = (ary, desc) => {
  const result = []
  ary.forEach(item => {
    if (item.value) {
      result.push({ value: item.value, label: item.value })
    }
  })
  const newResult = arrayOrderByField(result, 'value', true)
  newResult.unshift({ value: 'empty', label: desc })
  return newResult
}

export const usedParseOnly = (ary) => {
  const result = []
  ary.forEach(item => {
    if (item.value) {
      if (typeNumber(item.value)) {
        result.push({ value: (+item.value).toFixed(2) })
      } else if (typeString(item.value)) {
        result.push({ value: item.value })
      }
    }
  })
  return arrayOrderByField(result, 'value', true)
}
