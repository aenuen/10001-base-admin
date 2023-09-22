<template>
  <el-table :key="1" :loading="tableLoading" :data="tableData" border fit highlight-current-row show-summary style="width: 100%">
    <template slot="empty">
      <el-empty :image-size="100" :description="emptyText" />
    </template>
    <el-table-column :label="fields.index" type="index" align="center" width="80" />
    <el-table-column prop="name" :label="fields.name" align="center" />
    <el-table-column prop="yearMonth" :label="fields.yearMonth" align="center" />
    <el-table-column prop="company" :label="fields.company" align="center" />
    <!-- 养老保险个人 -->
    <el-table-column :label="fields.myPension" align="center">
      <el-table-column prop="myPension" :label="fields.personal" align="center" />
    </el-table-column>
    <!-- 失业保险个人 -->
    <el-table-column :label="fields.myUnemployment" align="center">
      <el-table-column prop="myUnemployment" :label="fields.personal" align="center" />
    </el-table-column>
    <!-- 医疗保险个人 -->
    <el-table-column :label="fields.myMedicalCare" align="center">
      <el-table-column prop="myMedicalCare" :label="fields.personal" align="center" />
    </el-table-column>
    <!-- 养老保险单位 -->
    <el-table-column :label="fields.unPension" align="center">
      <el-table-column prop="unPension" :label="fields.unit" align="center" />
    </el-table-column>
    <!-- 失业保险单位 -->
    <el-table-column :label="fields.unUnemployment" align="center">
      <el-table-column prop="unUnemployment" :label="fields.unit" align="center" />
    </el-table-column>
    <!-- 医疗保险单位 -->
    <el-table-column :label="fields.unMedicalCare" align="center">
      <el-table-column prop="unMedicalCare" :label="fields.unit" align="center" />
    </el-table-column>
    <!-- 伤保险单位 -->
    <el-table-column :label="fields.unInjury" align="center">
      <el-table-column prop="unInjury" :label="fields.unit" align="center" />
    </el-table-column>
    <!-- 生育保险单位 -->
    <el-table-column :label="fields.unBirth" align="center">
      <el-table-column prop="unBirth" :label="fields.unit" align="center" />
    </el-table-column>
    <!-- 小计 -->
    <el-table-column prop="subtotal" label="小计" align="center" />
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
  name: 'SalaryComponentsDetailsTable', // 社医保明细表格
  components: {},
  props: {
    tableLoading: Boolean,
    name: { type: String, default: '' },
    tableData: { type: Array, default: () => [] }
  },
  data() {
    return {
      fields
    }
  },
  computed: {
    emptyText() {
      return this.name ? '未能找到符合条件的数据' : '请先选择一个员工姓名'
    }
  }
}
</script>
<style lang="scss" scoped></style>
