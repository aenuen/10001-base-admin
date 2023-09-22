<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 姓名搜索 -->
      <el-select v-model="queryList.name" filterable class="filter-ele" :placeholder="fields.name" @change="handleFilter">
        <el-option v-for="item in nameAry" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
      <!-- 公司搜索 -->
      <el-select v-model="queryList.company" filterable class="filter-ele" :placeholder="fields.company" clearable @change="handleFilter">
        <el-option v-for="item in companyAry" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
      <!-- 开始年月 -->
      <el-date-picker v-model="queryList.aheadYearMonth" :placeholder="fields.aheadYearMonth" class="filter-ele" value-format="yyyy-MM" type="month" @change="handleFilter" />
      <!-- 结束年月 -->
      <el-date-picker v-model="queryList.afterYearMonth" :placeholder="fields.afterYearMonth" class="filter-ele" value-format="yyyy-MM" type="month" @change="handleFilter" />
      <!-- 搜索 -->
      <el-button type="primary" class="filter-btn el-icon-search" @click="handleFilter"> 搜索 </el-button>
      <!-- 导出 -->
      <el-dropdown class="avatar-container hover-effect" trigger="click">
        <el-button type="default" class="filter-btn el-icon-document"> 导出 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportData(tableData, detailsExport.header, detailsExport.fields, eFilename)"> 导出EXCEL </el-dropdown-item>
          <el-dropdown-item @click.native="exportData(tableData, detailsExport.header, detailsExport.fields, eFilename, 'csv')"> 导出CSV </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 打印 -->
      <el-button type="default" class="filter-btn el-icon-printer" @click="printTable('TableList', eFilename)"> 打印 </el-button>
    </div>
    <details-table id="TableList" :name="queryList.name" :table-data="tableData" :table-loading="tableLoading" />
    <div style="height: 50px" />
  </div>
</template>
<script>
// api
import { salaryApi } from '@/api/salary'
// components
import DetailsTable from './components/detailsTable'
// data
import { fields } from './modules/fields'
import { detailsExport } from './modules/exportData'
// filter
// function
import { subtotal } from './utils/details'
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { autoQuery, arrayOrderByField } from 'abbott-methods/import'
import { printTable } from '@/libs/print'
import { exportData } from '@/libs/export'
// settings
export default {
  name: 'SalaryDetails',
  components: { DetailsTable },
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {
      fields,
      autoQuery,
      printTable,
      exportData,
      detailsExport,
      nameAry: [],
      companyAry: []
    }
  },
  computed: {
    eFilename() {
      return `${this.queryList.name}医社保明细`
    }
  },
  mounted() {
    this.getUsed()
  },
  methods: {
    getUsed() {
      salaryApi.used({ name: 1, company: 1 }).then(({ code, data }) => {
        if (code === 200) {
          this.nameAry = [...data.name]
          this.companyAry = [...data.company]
        }
      })
    },
    startHandle() {
      salaryApi.details(this.queryList).then(({ code, data }) => {
        if (code === 200) {
          const { list, count } = data
          const tableData = subtotal(arrayOrderByField(list, 'yearMonth', true))
          this.tableData = tableData
          this.tableDataLength = count
          this.tableLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
