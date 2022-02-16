<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="queryList.year"
        type="year"
        class="filter-span"
        placeholder="请选择年份"
        value-format="yyyy"
        :clearable="false"
        @change="handleFilter"
      />
      <el-button class="el-icon-printer filter-item" @click="printContent">{{ printText }}</el-button>
    </div>
    <div style="width: 100%;overflow: hidden">
      <div style="width: 100px;float: left">
        <el-tabs v-model="queryList.tabsCurrent" tab-position="left" @tab-click="tabsClick">
          <el-tab-pane
            v-for="item in caseNameObject"
            :key="item.key"
            :label="item.value"
            :name="`${(item.key).toString().padStart(4,'0')}`"
          />
        </el-tabs>
      </div>
      <div style="width: calc(100% - 100px);float:left">
        <div id="printContentCaseCase">
          <el-table
            :key="tableKey"
            v-loading="tableLoading"
            :data="tableData"
            border
            fit
            show-summary
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
            <el-table-column :label="`${fields['createTime']}`">
              <template slot-scope="{row:{createTimestamp}}"><span>{{ createTimestamp|timeFormatDate }}</span></template>
            </el-table-column>
            <el-table-column :label="`${fields['caseUseName']}`" width="200">
              <template slot-scope="{row:{caseYear,caseName,caseNumber}}"><span>{{ `(${caseYear})${caseName}字${caseNumber}号` }}</span></template>
            </el-table-column>
            <el-table-column :label="`${fields['clientUseName']}`">
              <template slot-scope="{row:{client}}"><span>{{ client }}</span></template>
            </el-table-column>
            <el-table-column :label="`${fields['price']}`" prop="price" align="center" />
            <el-table-column :label="`${fields['createRealName']}`">
              <template slot-scope="{row:{createRealName}}"><span>{{ createRealName }}</span></template>
            </el-table-column>
            <el-table-column :label="`${fields['inNumber']}`">
              <template slot-scope="{row:{inNumber}}"><span>{{ inNumber ? inNumber : '--' }}</span></template>
            </el-table-column>
            <el-table-column :label="`${fields['delivery']}`">
              <template slot-scope="{row:{delivery}}"><span v-html="delivery" /></template>
            </el-table-column>
            <el-table-column :label="`${fields['enterDate']}`">
              <template slot-scope="{row:{enterDate}}"><span>{{ enterDate ? enterDate : '--' }}</span></template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import print from 'print-js'
import { pmTime, pmDate } from 'plugins-methods'
import { fields, caseNameObject } from './components/config'
import { caseCaseName } from '@/api/case'

export default {
  name: 'ViewsCaseLawyer',
  filters: { // 过滤器
    timeFormatDate(value) {
      return pmTime.timeFormat(value, pmTime.H_DATE)
    }
  },
  data() { // 定义数据
    return {
      fields,
      caseNameObject,
      queryList: {
        tabsName: '乐民一',
        tabsCurrent: '001',
        year: pmDate.dateYear()
      },
      tableKey: 1,
      tableData: [],
      tableLoading: true
    }
  },
  computed: {
    printText() {
      return `打印${this.queryList.tabsName || ''}案件统计表`
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
  methods: { // 方法函数
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      const queryList = { tabsCurrent: '0001', tabsName: '乐民一' }
      this.queryList = { ...queryList, ...query }
    },
    handleFilter() {
      this.refresh()
    },
    refresh() {
      this.$router.push({
        path: '/case/case',
        query: this.queryList
      })
    },
    tabsClick(tabs) {
      this.queryList.tabsCurrent = tabs.name
      this.queryList.tabsName = tabs.label
      this.refresh()
    },
    getMonthData() {
      caseCaseName({ caseName: this.queryList.tabsName, year: this.queryList.year }).then(res => {
        const { data } = res
        if (data && data.length > 0) {
          Object.keys(data).forEach(key => {
            data[key].delivery = +data[key].delivery === 1 ? `&radic;` : `&Chi;`
          })
          this.tableData = data
        } else {
          this.tableData = []
        }
        this.tableLoading = false
      })
    },
    printContent() {
      print({
        printable: 'printContentCaseCase',
        type: 'html',
        header: `${this.queryList.tabsName}案件统计表`,
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th{border-collapse:collapse;padding:15px;border:1px #000 solid;text-align:center}'
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
