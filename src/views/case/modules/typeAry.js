export const typeAry = [
  { key: 1, value: '民事' },
  { key: 2, value: '刑事' },
  { key: 3, value: '顾问' },
  { key: 4, value: '行政' },
  { key: 5, value: '非讼' },
  { key: 6, value: '援助' },
  { key: 7, value: '仲裁' },
  { key: 8, value: '刑附民' },
  { key: 9, value: '风险' }
]

export const typeChange = (value) => {
  if (value === '民事') {
    return stageOne
  } else if (value === '刑事' || value === '刑附民') {
    return stageTwo
  } else if (value === '行政') {
    return stageThree
  } else {
    return stageZero
  }
}

const stageOne = [ // 民事
  { key: 1, value: '一审' },
  { key: 2, value: '二审' },
  { key: 3, value: '执行' },
  { key: 4, value: '再审' }
]

const stageTwo = [ // 刑事/刑附民
  { key: 1, value: '一审' },
  { key: 2, value: '二审' },
  { key: 3, value: '侦查' },
  { key: 4, value: '起诉' }
]

const stageThree = [ // 行政
  { key: 1, value: '一审' },
  { key: 2, value: '二审' }
]

const stageZero = [ // 空
  { key: 1, value: '无' }
]
