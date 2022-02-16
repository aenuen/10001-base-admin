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
      <el-input
        v-model="queryList.name"
        class="filter-ele"
        :placeholder="fields.name"
        clearable
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-date-picker
        v-model="queryList.startDate"
        class="filter-ele"
        type="month"
        value-format="yyyy-MM"
        :placeholder="fields.startDate"
        :picker-options="pickerOptions"
        clearable
        @change="handleFilter"
      />
      <el-select
        v-model="queryList.department"
        class="filter-ele"
        clearable
        :placeholder="fields.department"
        @change="handleFilter"
        @clear="handleFilter"
      >
        <el-option v-for="(value,index) in departmentArray" :key="index" :value="value" :label="value" />
      </el-select>
      <el-button type="primary" class="filter-ele filter-btn el-icon-search" @click="handleFilter">查询</el-button>
      <el-button type="primary" class="filter-ele filter-btn el-icon-edit" @click="gotoCreate">录入</el-button>
      <el-button type="primary" class="filter-ele filter-btn el-icon-tickets" @click="gotoMonth">月表</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="tableLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :default-sort="tableSort"
      @sort-change="sortChange"
    >
      <el-table-column :label="fields.id" prop="id" sortable="custom" align="center" width="80" />
      <el-table-column :label="fields.edit" align="center" width="80">
        <template slot-scope="{row:{id}}">
          <el-button type="primary" size="mini" class="el-icon-edit" @click="gotoEdit(id)" />
        </template>
      </el-table-column>
      <el-table-column :label="fields.company" prop="company" align="center" />
      <el-table-column :label="fields.name" prop="name" align="center" width="230" />
      <el-table-column :label="fields.original" prop="original" align="center" />
      <el-table-column :label="fields.startDate" prop="startDate" align="center" />
      <el-table-column :label="fields.department" prop="department" align="center" />
      <el-table-column :label="fields.months" prop="months" align="center" />
      <el-table-column :label="fields.delete" align="center" width="80">
        <template slot-scope="{row:{id}}">
          <el-button type="danger" size="mini" class="el-icon-delete" @click="gotoDelete(id)" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="tableCount>0"
      :total="tableCount"
      :page.sync="queryList.page"
      :limit.sync="queryList.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
import { fields, companyArray, departmentArray } from './components/config'
import Pagination from '@/components/Pagination'
import { amortizationList, amortizationDel } from '@/api/amortization'

export default {
  name: 'ViewsAmortizationList', /* 组件名称 */
  components: { /* 应用组件 */
    Pagination
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      companyArray: companyArray,
      departmentArray: departmentArray,
      queryList: {},
      pickerOptions: {
        disabledDate: (time) => time.getTime() < new Date('2010-01-01').getTime() || time.getTime() > new Date().getTime()
      },
      tableLoading: true,
      tableKey: 1,
      tableData: [],
      tableSort: {},
      tableCount: 0
    }
  },
  mounted() { /* 渲染后运行 */
    this.getTableList()
  },
  beforeRouteUpdate(to, from, next) { // 路由更新前
    if (to.path === from.path) {
      const oldQuery = Object.assign({}, from.query)
      const newQuery = Object.assign({}, to.query)
      JSON.stringify(oldQuery) === JSON.stringify(newQuery) || this.getTableList()
    }
    next()
  },
  created() { /* 创建后运行 */
    this.parseQuery()
  },
  methods: { /* 函数及方法 */
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      // noinspection JSValidateTypes
      query.page && (query.page = +query.page)
      // noinspection JSValidateTypes
      query.pageSize && (query.pageSize = +query.pageSize)
      const sort = query.sort || '-id'
      const listQuery = { refresh: 0, page: 1, pageSize: 20, sort }
      const sortSymbol = sort[0]
      const sortOrder = sort.slice(1, sort.length)
      this.tableSort = { order: sortSymbol === '+' ? 'ascending' : 'descending', prop: sortOrder }
      this.queryList = { ...listQuery, ...query }
    },
    getTableList() {
      amortizationList(this.queryList).then(res => {
        const { data } = res
        const { list, count } = data
        this.tableCount = count
        this.tableLoading = false
        this.tableData = list
      })
    },
    handleFilter() {
      this.queryList.page = 1
      this.refresh()
    },
    sortChange(data) {
      const { prop, order } = data
      this.queryList.sort = (order === 'descending' ? `-` : `+`) + `${prop}`
      this.refresh()
    },
    refresh() {
      this.$router.push({ path: '/amortization/list', query: this.queryList })
    },
    gotoCreate() {
      this.$router.push({ path: '/amortization/create' })
    },
    gotoMonth() {
      this.$router.push({ path: '/amortization/month' })
    },
    gotoEdit(id) {
      this.$router.push({ path: `/amortization/edit/${id}` })
    },
    gotoDelete(id) {
      this.$confirm(
        '是否删除这条记录，此操作无法恢复,确定是否继续？',
        '继续',
        { type: 'warning' }
      ).then(() => {
        amortizationDel({ id }).then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.queryList.refresh = Math.random() * 100000
          this.refresh()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
