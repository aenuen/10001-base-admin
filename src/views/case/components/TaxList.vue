<!--
 * @Author: abbott
 * @Date: 2022-11-10 15:42:25
 * @LastEditors: abbott
 * @LastEditTime: 2022-11-10 17:22:35
 * @Description:
-->
<template>
  <el-table :key="1" :loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
    <template slot="empty">
      <el-empty :image-size="100" description="没有此类案件" />
    </template>
    <el-table-column :label="fields.id" type="index" align="center" width="80" />
    <el-table-column :label="fields.inNumber" align="center">
      <template slot-scope="{ row: { inNumber } }">
        <span>{{ inNumber || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.caseUseName" align="center" width="200">
      <template slot-scope="{ row: { caseYear, caseName, caseNumber } }">
        <span>{{ `(${caseYear})${caseName}字${caseNumber}号` }}</span>
      </template>
    </el-table-column>
    <el-table-column label="委托人" align="center" :width="350">
      <template slot-scope="{ row: { client } }">
        <span v-html="client" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.inType" align="center">
      <template slot-scope="{ row: { inType } }">
        <span v-html="inType" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.invoiceDate" align="center">
      <template slot-scope="{ row: { invoiceDate } }">
        <span v-html="invoiceDate" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.inNot" align="center">
      <template slot-scope="{ row: { inNot } }">
        <span v-html="inNot" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.inRate" align="center">
      <template slot-scope="{ row: { inRate } }">
        <span v-html="inRate" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.inTax" align="center">
      <template slot-scope="{ row: { inTax } }">
        <span>{{ inTax ? inTax + '%' : '' }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.inHave" align="center">
      <template slot-scope="{ row: { inHave } }">
        <span v-html="inHave" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.enterDate" align="center">
      <template slot-scope="{ row: { enterDate } }">
        <span>{{ enterDate || '--' }}</span>
      </template>
    </el-table-column>
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
  components: {},
  props: {
    tableLoading: Boolean,
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
