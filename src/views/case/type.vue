<!--
 * @Author: abbott
 * @Date: 2022-11-01 10:27:26
 * @LastEditors: abbott
 * @LastEditTime: 2022-11-11 10:02:56
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 类别搜索 -->
      <el-select v-model="queryList.caseName" filterable class="filter-ele" :placeholder="fields.type" @change="handleFilter">
        <el-option v-for="item in caseNameAry" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
      <!-- 年月搜索 -->
      <el-date-picker v-model="queryList.caseYear" :placeholder="fields.caseYear" class="filter-ele" value-format="yyyy" type="year" :clearable="false" @change="handleFilter" />
      <el-dropdown trigger="click">
        <el-button class="filter-btn el-icon-document"> 导出 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportData(tableData, exportHeader, exportFields, exportFilename, 'xls')"> 导出EXCEL </el-dropdown-item>
          <el-dropdown-item @click.native="exportData(tableData, exportHeader, exportFields, exportFilename, 'csv')"> 导出CSV </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button class="filter-btn el-icon-printer" @click="printTable('TypeList', exportFilename)">打印</el-button>
    </div>
    <TypeList id="TypeList" :table-data="tableData" :table-loading="tableLoading" />
  </div>
</template>
<script>
// api
import { caseApi } from '@/api/case'
// components
import TypeList from './components/TypeList'
// data
import { fields } from './modules/fields'
import { caseNameAry } from './modules/caseNameAry'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import Output from '@/components/Mixins/Output'
// plugins
import { timeGetYear } from 'abbott-methods/import'
// settings
export default {
  name: 'CaseType',
  components: { TypeList },
  mixins: [ListMixin, Output],
  data() {
    return {
      fields,
      caseNameAry
    }
  },
  computed: {
    exportFilename() {
      return `${this.queryList.caseYear}年度${this.queryList.caseName}案件统计表`
    }
  },
  created() {
    if (!this.queryList.caseName) {
      this.queryList.caseName = caseNameAry[0].value
    }
  },
  methods: {
    // 设置数据
    setData() {
      return {
        caseYear: timeGetYear()
      }
    },
    // 获取导出数据
    getExportData() {
      const { id, createDate, caseUseName, client, createRealName, inNumber, delivery, enterDate } = this.fields
      this.exportObject = { index: id, createDate, case: caseUseName, client, createRealName, inNumber, deliveryChar: delivery, enterDate }
    },
    // 获取列表
    startHandle() {
      caseApi.typeCase(this.queryList).then(({ code, data }) => {
        if (code === 200) {
          if (data.length > 0) {
            data.forEach((element, index) => {
              element.index = index + 1
              element.createDate = element.createTimestamp
              element.case = `(${element.caseYear})${element.caseName}字${element.caseNumber}号`
              element.deliveryChar = +element.delivery === 1 ? '√' : '×'
            })
            this.tableData = [...data]
          } else {
            this.tableData = [...[]]
          }
          this.tableLoading = false
        }
        if (code === 200) {
          this.tableData = data
          this.tableLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
