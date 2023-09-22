export const teamSocial = (data) => {
  const json = {}
  data.forEach((item) => {
    if (item.team) {
      if (json[item.team]) {
        json[item.team] = {
          team: item.team,
          number: +json[item.team].number + 1,
          unPension: (+json[item.team].unPension * 100 + +item.unPension * 100) / 100,
          unUnemployment: (+json[item.team].unUnemployment * 100 + +item.unUnemployment * 100) / 100,
          unInjury: (+json[item.team].unInjury * 100 + +item.unInjury * 100) / 100,
          unMedicalCare: (+json[item.team].unMedicalCare * 100 + +item.unMedicalCare * 100) / 100,
          unAccumulationFund: (+json[item.team].unAccumulationFund * 100 + +item.unAccumulationFund * 100) / 100,
          unBirth: (+json[item.team].unBirth * 100 + +item.unBirth * 100) / 100
        }
      } else {
        json[item.team] = {
          team: item.team,
          number: 1,
          unPension: +item.unPension,
          unUnemployment: +item.unUnemployment,
          unInjury: +item.unInjury,
          unMedicalCare: +item.unMedicalCare,
          unAccumulationFund: +item.unAccumulationFund,
          unBirth: +item.unBirth
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
