<template>
  <el-table :key="1" :data="tableData" :loading="tableLoading" border fit show-summary highlight-current-row style="width: 100%">
    <el-table-column prop="yearMonth" label="年月" align="center" />
    <el-table-column v-if="!isThat" prop="myPension" label="养老保险个人" align="center" />
    <el-table-column v-if="!isThat" prop="myUnemployment" label="失业保险个人" align="center" />
    <el-table-column v-if="!isThat" prop="myMedicalCare" label="医疗保险个人" align="center" />
    <el-table-column prop="unPension" label="养老保险单位" align="center" />
    <el-table-column prop="unUnemployment" label="失业保险单位" align="center" />
    <el-table-column prop="unMedicalCare" label="医疗保险单位" align="center" />
    <el-table-column prop="unInjury" label="工伤保险单位" align="center" />
    <el-table-column prop="unBirth" label="生育保险单位" align="center" />
    <el-table-column prop="subtotal" label="小计" align="center" />
  </el-table>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  components: {},
  props: {
    tableLoading: Boolean,
    tableData: { type: Array, default: () => [] },
    isThat: Boolean
  }
}
</script>
<style lang="scss" scoped></style>
