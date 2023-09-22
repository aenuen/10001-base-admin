<!--
 * @Author: abbott
 * @Date: 2022-11-01 10:26:49
 * @LastEditors: abbott
 * @LastEditTime: 2022-11-11 10:03:47
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 年月搜索 -->
      <el-date-picker v-model="queryList.createYearMonth" :placeholder="fields.createYearMonth" class="filter-ele" value-format="yyyy-MM" type="month" @change="handleFilter" />
      <!-- 导出 -->
      <el-dropdown trigger="click">
        <el-button class="filter-btn el-icon-document"> 导出 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportData(tableData, exportHeader, exportFields, exportFilename, 'xls')"> 导出EXCEL </el-dropdown-item>
          <el-dropdown-item @click.native="exportData(tableData, exportHeader, exportFields, exportFilename, 'csv')"> 导出CSV </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 打印数据 -->
      <el-button class="filter-btn el-icon-printer" @click="printTable('TaxList', exportFilename)">打印</el-button>
    </div>
    <TaxList id="TaxList" :table-data="tableData" :table-loading="tableLoading" />
  </div>
</template>
<script>
// api
import { caseApi } from '@/api/case'
// components
import TaxList from './components/TaxList'
// data
import { fields } from './modules/fields'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import Output from '@/components/Mixins/Output'
// plugins
import { timeGetYearMonth } from 'abbott-methods/import'
// settings
export default {
  name: 'CaseInvoice',
  components: { TaxList },
  mixins: [ListMixin, Output],
  data() {
    return {
      fields
    }
  },
  computed: {
    exportFilename() {
      return `${this.queryList.createYearMonth}案件发票统计表`
    }
  },
  methods: {
    // 设置数据
    setData() {
      return {
        createYearMonth: timeGetYearMonth()
      }
    },
    // 获取导出数据
    getExportData() {
      const { id, caseUseName, client, inType, inNumber, inNot, inRate, inTax, inHave, enterDate } = this.fields
      this.exportObject = {
        ...{ index: id, inNumber, case: caseUseName, client, inType, inNot, inRate, inTax, inHave, enterDate }
      }
    },
    // 获取列表
    startHandle() {
      caseApi.caseInvoice(this.queryList).then(({ code, data }) => {
        if (code === 200) {
          data.forEach((element, index) => {
            element.index = index + 1
            element.case = `(${element.caseYear})${element.caseName}字${element.caseNumber}号`
          })
          this.tableData = data
          this.tableLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
