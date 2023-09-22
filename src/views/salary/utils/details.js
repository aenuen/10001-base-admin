export const subtotal = (data) => {
  data.forEach((item) => {
    item.subtotal =
      (+item.myPension * 100 +
        +item.unPension * 100 +
        +item.myUnemployment * 100 +
        +item.unUnemployment * 100 +
        +item.myMedicalCare * 100 +
        +item.unMedicalCare * 100 +
        +item.unInjury * 100 +
        +item.unBirth * 100) /
      100
  })
  return data
}
