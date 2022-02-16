<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="queryList.yearMonth"
        type="month"
        class="filter-span"
        placeholder="请选择年月"
        value-format="yyyy-MM"
        :clearable="false"
        :picker-options="pickerOptions"
        @change="handleFilter"
      />
      <el-button type="default" class="el-icon-printer filter-span" style="width: auto" @click="printContent">打印发票记录</el-button>
    </div>
    <div id="printContentCaseInvoice">
      <div style="width: 100%;font-size:14px;line-height:30px;color:#333;">
        <div style="width:50%;float:left;padding: 10px 0;">{{ queryList.yearMonth ? `所属月份：${queryList.yearMonth}` : '' }}</div>
        <div style="width:50%;float:left;padding: 10px 0;">{{ queryList.caseName ? `所属案名：${queryList.caseName}` : '' }}</div>
      </div>
      <el-table ref="table" :key="tableKey" v-loading="tableLoading" :data="tableData" show-summary border fit highlight-current-row style="width: 100%">
        <el-table-column :label="`${fields['orderId']}`" type="index" align="center" width="80" />
        <el-table-column :label="`${fields['inNumber']}`" align="center" width="150">
          <template slot-scope="{row:{inNumber}}"><span>{{ inNumber }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['caseUseName']}`" align="center" width="210">
          <template slot-scope="{row:{caseYear,caseName,caseNumber}}"><span>{{ `(${caseYear})${caseName}字${caseNumber}号` }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['client']}`" width="350" align="center">
          <template slot-scope="{row:{client}}"><span>{{ client }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['invoiceDate']}`" align="center" width="200">
          <template slot-scope="{row:{invoiceDate}}"><span>{{ invoiceDate }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['enterDate']}`" align="center" width="200">
          <template slot-scope="{row:{enterDate}}"><span>{{ enterDate }}</span></template>
        </el-table-column>
        <el-table-column prop="inType" :label="`${fields['inType']}`" align="center" />
        <el-table-column prop="inNot" :label="`${fields['inNot']}`" align="center" />
        <el-table-column prop="inRate" :label="`${fields['inRate']}`" align="center" />
        <el-table-column prop="inHave" :label="`${fields['inHave']}`" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { pmDate } from 'plugins-methods'
import { fields, startYearMonth, caseNameObject } from './components/config'
import { caseMonth } from '@/api/case'
import print from 'print-js'

export default {
  name: 'ViewsCaseInvoice', // 发票统计
  data() { // 定义数据
    return {
      fields,
      caseNameObject,
      queryList: {},
      pickerOptions: {
        disabledDate: (time) => time.getTime() < new Date(startYearMonth).getTime() || time.getTime() > new Date().getTime()
      },
      tableKey: 1,
      tableData: [],
      tableLoading: true
    }
  },
  mounted() { // 渲染后运行
    this.getMonthData()
  },
  beforeRouteUpdate(to, from, next) { // 路由更新前
    if (to.path === from.path) {
      const oldQuery = Object.assign({}, from.query)
      const newQuery = Object.assign({}, to.query)
      JSON.stringify(oldQuery) !== JSON.stringify(newQuery) && this.getMonthData()
    }
    next()
  },
  created() { // 创建时运行
    this.parseQuery()
  },
  methods: { // 方法函数
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      const queryList = { yearMonth: pmDate.dateYearMonth() }
      this.queryList = { ...queryList, ...query }
    },
    handleFilter() {
      this.refresh()
    },
    refresh() {
      this.$router.push({
        path: '/case/invoice',
        query: this.queryList
      })
    },
    getMonthData() {
      caseMonth(this.queryList).then(res => {
        const { data } = res
        const newDate = []
        Object.keys(data).forEach(item => {
          const row = data[item]
          const step = +row.step
          row.enterDate = step === 3 ? '未填写发票' : step === 4 ? '未确认' : step === 5 ? row.enterDate : '未审批'
          row.invoiceDate = step >= 4 ? row.invoiceDate : '--'
          row.inType = step >= 4 ? row.inType : '--'
          row.inNumber = step >= 4 ? row.inNumber : '--'
          row.inNot = step >= 4 ? +row.inNot : '--'
          row.inRate = step >= 4 ? +row.inRate : '--'
          row.inHave = step >= 4 ? +row.inHave : '--'
          newDate.push(row)
        })
        this.tableData = newDate
        this.tableLoading = false
      })
    },
    printContent() {
      print({
        printable: 'printContentCaseInvoice',
        type: 'html',
        header: '发票统计表',
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th{border-collapse:collapse;padding:15px;border:1px #000 solid;text-align:center}'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.filter-container {
  .filter-span {
    margin-right: 5px;
  }
}
</style>
