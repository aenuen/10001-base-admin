<!--suppress HtmlDeprecatedAttribute -->
<template>
  <el-table
    v-if="tableData.length>0"
    :key="1"
    :data="tableData"
    border
    fit
    show-summary
    highlight-current-row
    style="width: 100%"
  >
    <el-table-column prop="yearMonth" label="年月" align="center" />
    <el-table-column prop="myPension" label="养老保险个人" align="center" />
    <el-table-column prop="myUnemployment" label="失业保险个人" align="center" />
    <el-table-column prop="myMedicalCare" label="医疗保险个人" align="center" />
    <el-table-column prop="unPension" label="养老保险单位" align="center" />
    <el-table-column prop="unUnemployment" label="失业保险单位" align="center" />
    <el-table-column prop="unMedicalCare" label="医疗保险单位" align="center" />
    <el-table-column prop="unInjury" label="工伤保险单位" align="center" />
    <el-table-column prop="unBirth" label="生育保险单位" align="center" />
    <el-table-column prop="subtotal" label="小计" align="center" />
  </el-table>
</template>

<script>
import { chain } from 'mathjs'

export default { // 律师统计：医社保详情
  name: 'ViewsCaseLawyerBoon',
  props: {
    salary: { type: Array, default: () => [] }
  },
  data() {
    return {
      tableData: []
    }
  },
  watch: {
    salary: {
      handler(value) {
        this.parseData(value)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    parseData() {
      const tableData = this.salary
      Object.keys(tableData).forEach(key => {
        const item = tableData[key]
        const { value: subtotal } = chain(item.myPension).add(item.myUnemployment).add(item.myMedicalCare)
          .add(item.unPension).add(item.unUnemployment).add(item.unMedicalCare).add(item.unInjury).add(item.unBirth)
        item.subtotal = subtotal.toFixed(2)
        const { value: salary } = chain(item.basePay).add(item.meritPay).subtract(item.myPension)
          .subtract(item.myUnemployment).subtract(item.myMedicalCare)
        item.salary = salary.toFixed(2)
      })
      this.tableData = tableData
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
