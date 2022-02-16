<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="queryList.yearMonth"
        type="month"
        class="filter-item"
        placeholder="选择月"
        value-format="yyyy-MM"
        :clearable="false"
        @change="handleFilter"
      />
    </div>
    <el-tabs @tab-click="tabsClick">
      <el-tab-pane label="未到帐" name="0" />
      <el-tab-pane label="未开发票" name="1" />
      <el-tab-pane label="未转账" name="2" />
    </el-tabs>
    <div style="padding:10px 0;text-align: center;font-size: 14px;color:#333">{{ title }}</div>
    <month-table
      :table-loading="tableLoading"
      :table-data="tableData"
    />
  </div>
</template>

<script>
import ListMixin from '@/components/Mixins/ListMixin'
import { pmTime } from 'plugins-methods'
import Data_tabsAry from './modules/data_tabsAry'
import MonthTable from './components/month-table'
import { statsMonth } from '@/api/stats'

export default {
  name: 'StatsMonth',
  components: { MonthTable },
  mixins: [ListMixin],
  data() {
    return {
      tabsAry: Data_tabsAry
    }
  },
  computed: {
    tabName() {
      return this.queryList.currentTab === '0' ? '未到帐' : '未到帐'
    },
    title() {
      return `${this.queryList.yearMonth}【${this.tabName}】表`
    }
  },
  methods: {
    setData() {
      return {
        currentTab: 0,
        yearMonth: pmTime.timeFormat(new Date(), '{y}-{m}')
      }
    },
    tabsClick(tab) {
      this.queryList.currentTab = tab.name
      this.handleFilter()
    },
    startAction() {
      statsMonth(this.queryList).then(({ code, data }) => {
        if (code === 0) {
          this.tableData = data
          this.tableLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
