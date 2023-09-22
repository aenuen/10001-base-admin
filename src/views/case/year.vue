<!--
 * @Author: abbott
 * @Date: 2022-11-01 10:26:26
 * @LastEditors: abbott
 * @LastEditTime: 2023-03-09 16:35:53
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 年月搜索 -->
      <el-date-picker v-model="queryList.caseYear" :placeholder="fields.caseYear" class="filter-ele" value-format="yyyy" type="year" :clearable="false" @change="handleFilter" />
      <el-dropdown trigger="click">
        <el-button class="filter-btn el-icon-document"> 导出 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportData(tableData, exportHeader, exportFields, exportFilename, 'xls')"> 导出EXCEL </el-dropdown-item>
          <el-dropdown-item @click.native="exportData(tableData, exportHeader, exportFields, exportFilename, 'csv')"> 导出CSV </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button class="filter-btn el-icon-printer" @click="printTable('YearList', exportFilename)">打印</el-button>
    </div>
    <div class="stat">{{ stat }}</div>
    <YearList id="YearList" :table-data="tableData" :table-loading="tableLoading" />
  </div>
</template>
<script>
// api
import { caseApi } from '@/api/case'
// components
import YearList from './components/YearList'
// data
import { fields } from './modules/fields'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import Output from '@/components/Mixins/Output'
// plugins
import { timeGetYear } from 'abbott-methods/import'
import { exportData } from '@/libs/export'
// settings
export default {
  name: 'CaseYear',
  components: { YearList },
  mixins: [ListMixin, Output],
  data() {
    return {
      fields,
      exportData,
      stat: ''
    }
  },
  computed: {
    exportFilename() {
      return `${this.queryList.caseYear}年案件统计表`
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
      caseApi.year(this.queryList).then(({ code, data }) => {
        if (code === 200) {
          const { list, type } = data
          if (list.length > 0) {
            list.forEach((element, index) => {
              element.index = index + 1
              element.createDate = element.createTimestamp
              element.case = `(${element.caseYear})${element.caseName}字${element.caseNumber}号`
              element.deliveryChar = +element.delivery === 1 ? '√' : '×'
            })
            this.tableData = [...list]
            let count = ''
            let total = 0
            type.forEach((res) => {
              count += `,${res.name}案件${res.num}件`
              total += +res.num
            })
            this.stat = `总计${total}件（其中${count}）`
          } else {
            this.tableData = [...[]]
          }
          this.tableLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.stat {
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #999;
  padding: 20px 0;
}
</style>
