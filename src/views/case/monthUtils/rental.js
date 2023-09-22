
import { timeGetYear } from 'abbott-methods/import'
export const rental = (yearMonth, monthNumber, lawyer) => {
  const currentYear = timeGetYear(`${yearMonth}-01`)
  if (lawyer === '郭锦标') { // 郭锦标的房租是2021-06至2022-09
    const number = +currentYear === 2022 || +currentYear === 2021 ? (monthNumber >= 9 ? 9 : monthNumber) : 0
    return number * 3000
  }
  return 0
}

