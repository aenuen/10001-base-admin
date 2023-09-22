export const lastYear = (year, lawyer) => {
  // 这里加数据
  const replenish = {
    2022: [
      { people: '叶文', price: 20000 }
    ]
  }
  // 下面开始计算
  let otherItem = 0
  Object.keys(replenish).forEach((key) => {
    if (+key === year) {
      Object.keys(replenish[key]).forEach((index) => {
        if (replenish[key][index].people === lawyer) {
          otherItem = otherItem + +replenish[key][index].price
        }
      })
    }
  })
  // 返回
  return otherItem
}
