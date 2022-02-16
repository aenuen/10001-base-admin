<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="queryList.yearMonth"
        type="month"
        class="filter-item"
        placeholder="请选择年月"
        value-format="yyyy-MM"
        :clearable="false"
        :picker-options="pickerOptions"
        @change="handleFilter"
      />
    </div>
    <el-tabs v-model="queryList.tabs" type="border-card" @tab-click="tabsClick">
      <el-tab-pane label="月余额表" name="balance">
        <month-balance-table :balance-data="balanceData" :year-month="queryList.yearMonth" />
      </el-tab-pane>
      <el-tab-pane label="月变动表" name="change">
        <month-change-table :change-data="changeData" :year-month="queryList.yearMonth" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { pmDate } from 'plugins-methods'
import { fields, companyArray, areaArray } from './components/config'
import MonthBalanceTable from './components/MonthBalanceTable'
import MonthChangeTable from './components/MonthChangeTable'
import { reserveMonth } from '@/api/reserve'

export default {
  name: 'ViewsReserveMonth',
  components: { /* 引用组件 */
    MonthBalanceTable,
    MonthChangeTable
  },
  filters: { // 过滤器
  },
  directives: { // 自定义指令
  },
  props: { // 定义传值
  },
  data() { // 定义数据
    return {
      fields: fields,
      companyArray: companyArray,
      areaArray: areaArray,
      queryList: {},
      pickerOptions: {
        disabledDate: (time) => time.getTime() < new Date('2020-01-01').getTime() || time.getTime() > new Date().getTime()
      },
      balanceData: [],
      changeData: [],
      isCurrentYearMonth: true
    }
  },
  computed: { // 计算属性
  },
  watch: { // 监控值变换
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
  created() { // 渲染时运行
    this.parseQuery()
  },
  methods: { // 方法函数
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      const queryList = {
        company: '尚德',
        area: '2020',
        yearMonth: pmDate.dateYearMonth(),
        tabs: 'balance'
      }
      this.queryList = { ...queryList, ...query }
    },
    handleFilter() {
      this.refresh()
    },
    refresh() {
      this.$router.push({
        path: '/reserve/month',
        query: this.queryList
      })
    },
    tabsClick(tabs) {
      this.queryList.tabs = tabs.name
      this.refresh()
    },
    getMonthData() {
      reserveMonth(this.queryList).then(res => {
        const { data } = res
        const { balanceData, changeData } = data
        let newBalanceData = []
        if (balanceData[0].createYearMonth !== this.queryList.yearMonth) {
          balanceData.forEach(item => item.number !== '0' && newBalanceData.push(item))
        } else {
          newBalanceData = balanceData
        }
        this.balanceData = newBalanceData
        this.changeData = changeData
      })
    }
  }
}
</script>

<style scoped lang="scss">
.filter-container {
  .filter-item {
    width: 180px;
    margin-right: 10px;
  }
}
</style>
