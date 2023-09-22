<template>
  <el-table :key="2" :data="tableData" border fit show-summary highlight-current-row style="width: 100%">
    <el-table-column :label="fields.index" type="index" align="center" width="80" />
    <el-table-column prop="team" :label="fields.team" align="center" />
    <el-table-column prop="number" label="人数" align="center" />
    <el-table-column prop="unPension" :label="`${fields.unPension}${fields.unit}`" align="center" />
    <el-table-column prop="unUnemployment" :label="`${fields.unUnemployment}${fields.unit}`" align="center" />
    <el-table-column prop="unMedicalCare" :label="`${fields.unMedicalCare}${fields.unit}`" align="center" />
    <el-table-column prop="unAccumulationFund" :label="`${fields.unAccumulationFund}${fields.unit}`" align="center" />
    <el-table-column prop="unInjury" :label="`${fields.unInjury}${fields.unit}`" align="center" />
    <el-table-column prop="unBirth" :label="`${fields.unBirth}${fields.unit}`" align="center" />
  </el-table>
</template>
<script>
// api
// components
// data
import { fields } from '../modules/fields'
// filter
// function
// mixin
// plugins
// settings
export default {
  name: 'SalaryComponentsTeamSocial',
  props: {
    tableData: { type: Array, default: () => [] }
  },
  data() {
    return {
      fields
    }
  }
}
</script>
<style lang="scss" scoped></style>
