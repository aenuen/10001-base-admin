export const medicalCareChange = (value) => {
  if (+value % 69.77 === 0) {
    const multiple = value / 69.77
    return [279.07 * multiple, 24.42 * multiple]
  } else if (value % 70 === 0) {
    const multiple = value / 70
    return [280 * multiple, 24.5 * multiple]
  } else if (value % 73.52 === 0) {
    const multiple = value / 73.52
    return [294.08 * multiple, 25.73 * multiple]
  } else {
    return [0, 0]
  }
}
