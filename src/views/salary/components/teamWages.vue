<template>
  <el-table :key="2" :data="tableData" border fit show-summary highlight-current-row style="width: 100%">
    <el-table-column :label="fields.index" type="index" align="center" width="80" />
    <el-table-column prop="team" :label="fields.team" align="center" />
    <el-table-column prop="number" label="人数" align="center" />
    <el-table-column prop="basePay" :label="fields.basePay" align="center" />
    <el-table-column prop="meritPay" :label="fields.meritPay" align="center" />
    <el-table-column prop="payTotal" :label="fields.subtotal" align="center" />
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
  name: 'SalaryComponentsTeamWages',
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
