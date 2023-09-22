<!--
 * @Author: abbott
 * @Date: 2022-09-09 15:31:00
 * @LastEditors: abbott
 * @LastEditTime: 2023-04-19 15:49:36
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 年月搜索 -->
      <el-date-picker v-model="queryList.yearMonth" placeholder="请输入" class="filter-ele" value-format="yyyy-MM" type="month" :clearable="false" @change="handleFilter" />
      <el-button class="filter-btn el-icon-printer" style="width: auto" @click="printTable('content', exportFilename, printStyle)">打印{{ exportFilename }}</el-button>
    </div>
    <div id="monthContent">
      <div class="lawyer">
        <el-tabs v-model="queryList.tabsCurrent" tab-position="left" @tab-click="tabsClick">
          <el-tab-pane v-for="(item, index) in lawyers" :key="index" :label="item" :name="String(index + 1)" />
        </el-tabs>
      </div>
      <div id="content" class="content">
        <Header :name="queryList.tabsName" :year-month="queryList.yearMonth" :year="+currentYear" :month-number="monthNumber" />
        <MonthList v-if="tableData.length > 0" :table-data="tableData" :table-loading="tableLoading" />
        <div style="height: 20px" />
        <DetailTable :data="detailTable" />
        <div style="height: 20px" />
        <Salary v-if="salaryAry.length > 0" :table-data="salaryAry" :table-loading="salaryLoading" :is-that="monthData.isThat" />
        <div style="height: 20px" />
        <Pay v-if="payAry.length > 0" :table-data="payAry" :table-loading="payLoading" />
      </div>
    </div>
  </div>
</template>
<script>
// api
// components
import Header from './monthCom/header'
import MonthList from './monthCom/monthList'
import Salary from './monthCom/salary'
import Pay from './monthCom/pay'
import DetailTable from './monthCom/detailTable'
// data
import { fields } from './modules/fields'
import { lawyers } from './modules/lawyers'
import { printStyle } from './modules/printStyle'
// filter
// function
import { caseCalc } from './monthUtils/caseCalc'
import { insurance } from './monthUtils/insurance'
import { payAction } from './monthUtils/payAction'
import { isBoss } from './monthUtils/isBoss'
import { lastYear } from './monthUtils/lastYear'
import { rental } from './monthUtils/rental'
import { detailTable } from './monthUtils/detailTable'
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import Output from '@/components/Mixins/Output'
// plugins
import { timeGetYearMonth, timeFormat, calcSum } from 'abbott-methods/import'
// settings
export default {
  name: 'CaseMonth',
  components: { Header, MonthList, Salary, Pay, DetailTable },
  mixins: [ListMixin, Output],
  data() {
    return {
      fields,
      printStyle,
      lawyers,
      monthData: { isThat: true },
      lastData: {},
      detailTable: [],
      salaryAry: [],
      salaryLoading: false,
      payAry: [],
      payLoading: false
    }
  },
  computed: {
    exportFilename() {
      return `${this.queryList.yearMonth}${this.queryList.tabsName}律师统计表`
    },
    currentYear() {
      return ~~timeFormat(`${this.queryList.yearMonth}-01`, '{y}')
    },
    monthNumber() {
      const month = ~~timeFormat(`${this.queryList.yearMonth}-01`, '{m}')
      return this.currentYear === 2021 ? month - 5 : month
    }
  },
  created() {
    if (!this.queryList.tabsName) {
      this.queryList.tabsCurrent = String(1)
      this.queryList.tabsName = this.lawyers[0]
    }
  },
  methods: {
    // 设置数据
    setData() {
      return {
        yearMonth: timeGetYearMonth()
      }
    },
    // tabs点击事件
    tabsClick(tabs) {
      this.queryList.tabsCurrent = tabs.name
      this.queryList.tabsName = tabs.label
      this.refresh()
    },
    // 获取案件列表
    async startHandle() {
      const result = await caseCalc(this.queryList.yearMonth, this.queryList.tabsName)
      this.tableData = result.list
      this.tableLoading = false
      this.monthData = {}
      this.monthData = {
        ...this.monthData,
        ...{
          caseTotal: result.total,
          enterTotal: result.enter,
          vatTotal: result.vatTotal
        }
      }
      this.insurance()
    },
    // 获取保险列表
    async insurance() {
      const result = await insurance(this.queryList.yearMonth, this.queryList.tabsName)
      this.salaryAry = result.list
      this.salaryLoading = false
      this.monthData = {
        ...this.monthData,
        ...{ insuranceTotal: result.total, myIncomeTax: result.myIncomeTax, isThat: result.isThat }
      }
      this.payList()
    },
    // 已支付列表
    async payList() {
      const result = await payAction(this.queryList.yearMonth, this.queryList.tabsName)
      this.payAry = result.list
      this.payLoading = false
      this.monthData = {
        ...this.monthData,
        ...result.data
      }
      console.log('🚀 ~ file: month.vue:143 ~ payList ~ this.monthData:', this.monthData)
      this.lastCalc()
    },
    // 最后计算
    lastCalc() {
      const {
        caseTotal, // 案件总额
        enterTotal, // 入账总额
        vatTotal: vat, // 增值税
        insuranceTotal, // 医保社保
        myIncomeTax, // 个税
        memberTotal, // 会员费个人
        payTotal, // 已支付
        salaryTotal, // 工资
        unclearedTotal // 未结清
      } = this.monthData
      const manage = +(caseTotal * 0.05).toFixed(2) // 管理费
      const vatTotal = +((vat / 1.01) * 0.01).toFixed(2) // 增值税
      const areBoss = isBoss(this.queryList.tabsName)
      const accountantTotal = areBoss ? +((2000 / 3) * this.monthNumber).toFixed(2) : 0 // 会计
      const financeTotal = areBoss ? +((6000 / 3) * this.monthNumber).toFixed(2) : 0 // 财务
      const memberCompany = areBoss ? 5000 : 0 // 会员费律所
      const taxPointTotal = +((enterTotal / 0.1) * 0.01).toFixed(2) // 税点费
      const mutualFund = (100).toFixed(2) // 互助基金
      const businessInsurance = 180 // 商业保险
      const medicalInsurance = 0 // 医疗补充保险
      const employmentFund = (enterTotal * 0.01).toFixed(2) // 残疾人就业基金
      const labourUnion = salaryTotal > 0 ? +(salaryTotal * 0.025).toFixed(2) : 0 // 工会
      const surcharges = (vatTotal * 0.125).toFixed(2) // 附加费
      const soft = areBoss ? (10000 / 3).toFixed(2) : 0 // 软件费
      const residue = lastYear(this.currentYear, this.queryList.tabsName) // 去年案件到账
      const rentals = rental(this.queryList.yearMonth, this.monthNumber, this.queryList.tabsName) // 房间租用费
      const total = calcSum([+manage, +insuranceTotal, +salaryTotal, +myIncomeTax, +vatTotal, +accountantTotal, +financeTotal, +taxPointTotal, +memberTotal, +memberCompany, +mutualFund, +businessInsurance, +medicalInsurance, +employmentFund, +labourUnion, +surcharges, +soft, +rentals])
      const needPay = +(enterTotal - payTotal - residue - total).toFixed(2)
      this.lastData = {
        caseTotal, // 案件总额
        enterTotal, // 入账总额
        vatTotal, // 增值税
        insuranceTotal, // 医保社保
        myIncomeTax, // 个税
        memberTotal, // 会员费个人
        payTotal, // 已支付
        salaryTotal, // 工资
        unclearedTotal, // 未结清
        manage, // 管理费
        accountantTotal, // 会计
        financeTotal, // 财务
        memberCompany, // 会员费律所
        taxPointTotal, // 税点
        mutualFund, // 互助基金
        businessInsurance, // 商业保险
        medicalInsurance, // 医疗补充保险
        employmentFund, // 残疾人就业基金
        labourUnion, // 工会
        surcharges, // 附加费
        soft, // 软件使用费
        residue, // 去年案件到账
        rentals, // 房间租用费
        total, // 总和
        needPay // 律所需支付
      }
      this.detailTable = detailTable(this.lastData, this.queryList.tabsName)
    }
  }
}
</script>
<style lang="scss" scoped>
#monthContent {
  width: 100%;
  display: flex;
  .lawyer {
    width: 110px;
  }
  .content {
    flex: 1;
  }
}
</style>
