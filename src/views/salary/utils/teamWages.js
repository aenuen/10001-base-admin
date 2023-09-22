// 解析数据
export const teamWages = (data) => {
  const json = {}
  data.forEach((item) => {
    if (item.team) {
      if (json[item.team]) {
        json[item.team] = {
          team: item.team,
          number: +json[item.team].number + 1,
          basePay: (+json[item.team].basePay * 100 + +item.basePay * 100) / 100,
          meritPay: (+json[item.team].meritPay * 100 + +item.meritPay * 100) / 100,
          payTotal: (+json[item.team].payTotal * 100 + +item.payTotal * 100) / 100
        }
      } else {
        json[item.team] = {
          team: item.team,
          number: 1,
          basePay: +item.basePay,
          meritPay: +item.meritPay,
          payTotal: +item.payTotal
        }
      }
    }
  })
  const teamArray = []
  for (const i in json) teamArray.push(json[i])
  return teamArray.sort(function (a, b) {
    const x = a['team']
    const y = b['team']
    return x < y ? -1 : x > y ? 1 : 0
  })
}
