<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="queryList.company"
        class="filter-ele"
        clearable
        :placeholder="fields.company"
        @change="handleFilter"
        @clear="handleFilter"
      >
        <el-option v-for="(value,index) in companyArray" :key="index" :value="value" :label="value" />
      </el-select>
      <el-date-picker
        v-model="queryList.yearMonth"
        type="month"
        class="filter-ele"
        placeholder="请选择年月"
        value-format="yyyy-MM"
        :clearable="false"
        :picker-options="pickerOptions"
        @change="handleFilter"
      />
      <el-button
        class="filter-ele el-icon-printer"
        style="width: 300px"
        @click="printContent"
      >
        打印 {{ tableName }}
      </el-button>
    </div>
    <div :id="tableId">
      <el-table
        :key="tableKey"
        :data="tableData"
        border
        fit
        highlight-current-row
        show-summary
      >
        <el-table-column :label="fields.id" prop="id" width="80" align="center" />
        <el-table-column :label="fields.name" prop="name" align="center" width="230" />
        <el-table-column :label="fields.original" prop="original" align="center" />
        <el-table-column :label="fields.startDate" prop="startDate" align="center" />
        <el-table-column :label="fields.endDate" prop="endDate" align="center" />
        <el-table-column :label="fields.months" align="center">
          <template slot-scope="{row:{months}}"><span>{{ months }}</span></template>
        </el-table-column>
        <el-table-column :label="fields.theMonth" prop="theMonth" align="center" />
        <el-table-column :label="fields.usedMonths" align="center">
          <template slot-scope="{row:{usedMonths}}"><span>{{ usedMonths }}</span></template>
        </el-table-column>
        <el-table-column :label="fields.nowMonth" prop="nowMonth" align="center" />
        <el-table-column :label="fields.cumulative" prop="cumulative" align="center" />
        <el-table-column :label="fields.surplus" prop="surplus" align="center" />
        <el-table-column :label="fields.department" prop="department" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import print from 'print-js'
import { pmDate, pmMonth } from 'plugins-methods'
import { fields, companyArray } from './components/config'
import { amortizationMonth } from '@/api/amortization'

export default {
  name: 'ViewsAmortizationMonth', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */ },
  data() { /* 定义数据 */
    return {
      fields: fields,
      companyArray: companyArray,
      queryList: {},
      pickerOptions: {
        disabledDate: (time) => time.getTime() < new Date('2010-01-01').getTime() || time.getTime() > new Date().getTime()
      },
      tableId: 'amortizationMonthTable',
      tableKey: 1,
      tableData: [],
      departmentArray: {}
    }
  },
  computed: { /* 计算属性 */
    tableName() {
      return `${this.queryList.company} ${this.queryList.yearMonth} 无形资产摊销明细表`
    }
  },
  watch: { /* 监控值变换 */ },
  mounted() { /* 渲染后运行 */
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
  created() { /* 创建后运行 */
    this.parseQuery()
  },
  methods: { /* 函数及方法 */
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      const queryList = { company: '尚德', yearMonth: pmDate.dateYearMonth() }
      this.queryList = { ...queryList, ...query }
    },
    handleFilter() {
      this.refresh()
    },
    refresh() {
      this.$router.push({
        path: '/amortization/month',
        query: this.queryList
      })
    },
    getMonthData() {
      amortizationMonth(this.queryList).then(res => {
        const { data } = res
        this.parseData(data)
      })
    },
    parseData(data) {
      data.forEach(item => {
        item.endDate = pmMonth.monthApartNumberDate(item.startDate, item.months - 1)
        let usedMonths = pmMonth.monthDifference(this.queryList.yearMonth, item.startDate) + 1
        usedMonths = usedMonths < 0 ? 0 : usedMonths
        item.theMonth = (item.original / item.months).toFixed(2) // 月摊销数
        item.usedMonths = usedMonths > item.months ? `>${item.months}` : usedMonths // 已摊销月数
        if (usedMonths === +item.months) {
          item.nowMonth = (item.original - (item.theMonth * (item.months - 1))).toFixed(2)
          item.cumulative = item.original
          item.surplus = 0
        } else if (usedMonths > +item.months) {
          item.nowMonth = 0
          item.cumulative = item.original
          item.surplus = 0
        } else {
          item.nowMonth = usedMonths > item.months ? '0.00' : item.theMonth // 本月实际摊销额
          item.cumulative = (item.usedMonths * item.theMonth).toFixed(2) // 累计摊销额
          item.surplus = ((item.original * 100 - item.cumulative * 100) / 100).toFixed(2) // 无形资产净值
        }
      })
      this.tableData = data
    },
    printContent() {
      print({
        printable: this.tableId,
        type: 'html',
        header: this.tableName,
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th{border-collapse:collapse;padding:5px;border:1px #000 solid;text-align:center}'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
