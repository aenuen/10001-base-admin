<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="queryList.company"
        class="filter-ele"
        :placeholder="fields.company"
        clearable
        @clear="handleFilter"
        @change="handleFilter"
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
      <div style="width: 100%;padding:20px 0;line-height:20px;font-size:14px;">
        <span>{{ fields.department }}：</span>
        <span
          v-for="(value,index) in departmentArray"
          :key="index"
          style="margin-right:20px;line-height:20px;font-size:14px;"
        >
          <span style="color:#333">{{ value.remarks }}</span>
          <span style="color:#999">（{{ value.theMonth }}）</span>
        </span>
      </div>
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
        <el-table-column :label="fields.yearMonth" prop="yearMonth" align="center" />
        <el-table-column :label="fields.nowMonth" prop="nowMonth" align="center" />
        <el-table-column :label="fields.original" prop="original" align="center" />
        <el-table-column :label="fields.theMonth" prop="theMonth" align="center" />
        <el-table-column :label="fields.months" align="center">
          <template slot-scope="{row:{months}}"><span>{{ months }}</span></template>
        </el-table-column>
        <el-table-column :label="fields.cumulative" prop="cumulative" align="center" />
        <el-table-column :label="fields.surplus" prop="surplus" align="center" />
        <el-table-column :label="fields.rate" align="center">
          <template slot-scope="{row:{rate}}"><span>{{ rate }}</span></template>
        </el-table-column>
        <el-table-column :label="fields.remarks" prop="remarks" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { pmDate, pmMonth } from 'plugins-methods'
import { fields, companyArray } from './components/config'
import { depreciationMonth } from '@/api/depreciation'
import print from 'print-js'

export default {
  name: 'ViewsDepreciationMonth', /* 组件名称 */
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
      tableId: 'depreciationMonthTable',
      tableKey: 1,
      tableData: [],
      departmentArray: {}
    }
  },
  computed: { /* 计算属性 */
    tableName() {
      return `${this.queryList.company} ${this.queryList.yearMonth} 固定资产折旧清单`
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
      const queryList = {
        company: '尚德',
        yearMonth: pmDate.dateYearMonth()
      }
      this.queryList = { ...queryList, ...query }
    },
    handleFilter() {
      this.refresh()
    },
    refresh() {
      this.$router.push({
        path: '/depreciation/month',
        query: this.queryList
      })
    },
    getMonthData() {
      depreciationMonth(this.queryList).then(res => {
        const { data } = res
        this.parseData(data)
      })
    },
    parseData(data) {
      const departmentArray = {}
      data.forEach(item => {
        item.nowMonth = this.queryList.yearMonth
        const months = pmMonth.monthDifference(this.queryList.yearMonth, item.yearMonth)
        item.months = months < 0 ? '0' : months > 36 ? '>36' : months // 已折旧月数
        const theMonth = (item.original * item.rate).toFixed(2)
        item.theMonth = months <= 0 || months > 36 ? '0' : theMonth // 本月折旧
        const calcMonths = months < 0 ? 0 : (months > 36 ? 36 : months)
        item.cumulative = (theMonth * calcMonths).toFixed(2) // 累计折旧
        item.surplus = ((item.original * 100 - item.cumulative * 100) / 100).toFixed(2)
        const remarks = item.remarks === '管理部' ? 'RD00' : item.remarks
        if (departmentArray[remarks]) {
          departmentArray[remarks].theMonth = ((departmentArray[remarks].theMonth * 100 + item.theMonth * 100) / 100).toFixed(2)
        } else {
          departmentArray[remarks] = { remarks: item.remarks, theMonth: item.theMonth }
        }
        this.departmentArray = departmentArray
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
