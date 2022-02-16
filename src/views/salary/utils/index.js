export const startTimeEndNow = (startYeahMonth) => {
  return {
    disabledDate: (time) => time.getTime() < new Date(startYeahMonth).getTime() || time.getTime() > new Date().getTime()
  }
}
