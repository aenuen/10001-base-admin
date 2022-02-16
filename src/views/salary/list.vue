<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.company"
        :placeholder="`${fields['company']}`"
        class="filter-item"
        clearable
        @clear="handleFilter"
        @change="handleFilter"
      >
        <el-option v-for="item in companyObject" :key="item['key']" :label="item['label']" :value="item['value']" />
      </el-select>
      <el-input
        v-model="listQuery.name"
        :placeholder="`${fields['name']}`"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @select="handleFilter"
      />
      <el-autocomplete
        v-model="listQuery.department"
        class="el-input filter-item"
        :fetch-suggestions="querySearchAsync"
        :placeholder="`${fields['department']}`"
        clearable
        @focus="attr=departmentObject"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @select="handleFilter"
      />
      <el-autocomplete
        v-model="listQuery.team"
        class="el-input filter-item"
        :fetch-suggestions="querySearchAsync"
        :placeholder="`${fields['team']}`"
        clearable
        @focus="attr=teamObject"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @select="handleFilter"
      />
      <el-select v-model="listQuery.isUse" class="filter-item" :placeholder="`${fields['isUse']}`" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item,key) in isUseAry" :key="key" :value="item.value" :label="item.label" />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="width:auto"
        @click="handleFilter"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        style="width:auto"
        @click="goCreate"
      >
        录入
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-s-marketing"
        style="width:auto"
        @click="goMonth"
      >
        月结
      </el-button>
      <el-button
        v-if="listQuery.company"
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        style="width:auto"
        @click="clear"
      >
        清除此公司五险数据
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="tableLoading"
      :data="tableList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :default-sort="tableSort"
      @row-dblclick="editRow"
      @sort-change="sortChange"
    >
      <el-table-column :label="`${fields['id']}`" prop="id" sortable="custom" align="center" width="80" />
      <el-table-column :label="`${fields['work']}`" align="center" fixed="left" width="100">
        <template slot-scope="{row:{id}}">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="goEdit(id)" />
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['name']}`" align="center">
        <template slot-scope="{row:{nameKeyword}}"><span v-html="nameKeyword" /></template>
      </el-table-column>
      <el-table-column :label="`${fields['company']}`" align="center">
        <template slot-scope="{row:{company}}"><span>{{ company|emptyValueFilter }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['department']}`" align="center">
        <template slot-scope="{row:{department}}"><span>{{ department|emptyValueFilter }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['team']}`" align="center">
        <template slot-scope="{row:{team}}"><span>{{ team|emptyValueFilter }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['basePay']}`" align="center">
        <template slot-scope="{row:{basePay}}"><span>{{ basePay|emptyValueFilter }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['meritPay']}`" align="center">
        <template slot-scope="{row:{meritPay}}"><span>{{ meritPay|emptyValueFilter }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['myPension']}`" align="center">
        <el-table-column :label="`${fields['personal']}`" align="center">
          <template slot-scope="{row:{myPension}}"><span>{{ myPension|emptyValueFilter }}</span></template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="`${fields['myUnemployment']}`" align="center">
        <el-table-column :label="`${fields['personal']}`" align="center">
          <template slot-scope="{row:{myUnemployment}}"><span>{{ myUnemployment|emptyValueFilter }}</span></template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="`${fields['myMedicalCare']}`" align="center">
        <el-table-column :label="`${fields['personal']}`" align="center">
          <template slot-scope="{row:{myMedicalCare}}"><span>{{ myMedicalCare|emptyValueFilter }}</span></template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="`${fields['unPension']}`" align="center">
        <el-table-column :label="`${fields['unit']}`" align="center">
          <template slot-scope="{row:{unPension}}"><span>{{ unPension|emptyValueFilter }}</span></template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="`${fields['unUnemployment']}`" align="center">
        <el-table-column :label="`${fields['unit']}`" align="center">
          <template slot-scope="{row:{unUnemployment}}"><span>{{ unUnemployment|emptyValueFilter }}</span></template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="`${fields['unMedicalCare']}`" align="center">
        <el-table-column :label="`${fields['unit']}`" align="center">
          <template slot-scope="{row:{unMedicalCare}}"><span>{{ unMedicalCare|emptyValueFilter }}</span></template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="`${fields['unInjury']}`" align="center">
        <el-table-column :label="`${fields['unit']}`" align="center">
          <template slot-scope="{row:{unInjury}}"><span>{{ unInjury|emptyValueFilter }}</span></template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="`${fields['unBirth']}`" align="center">
        <el-table-column :label="`${fields['unit']}`" align="center">
          <template slot-scope="{row:{unBirth}}"><span>{{ unBirth|emptyValueFilter }}</span></template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="`${fields['isUse']}`" align="center">
        <template slot-scope="{row:{id}}">
          <el-switch v-model="tableIsUse[id]" active-color="#13ce66" inactive-color="#ff4949" @change="isUseChange($event,id)" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-show="tableCount>0" :total="tableCount" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="refresh" />
    <el-dialog title="人员编辑" width="1200px" :visible.sync="dialogShow" @close="closeDialogShow">
      <detail :edit-data="editData" @onUpdateSuccess="onUpdateSuccess" />
    </el-dialog>
  </div>
</template>

<script>
import { isUseAry } from 'plugins-methods'
import Pagination from '@/components/Pagination'
import Detail from './components/Detail'
import { companyObject, departmentObject, fields, teamObject } from './components/config'
import { salaryClear, salaryList, salaryState } from '@/api/salary'

export default {
  name: 'ViewsSalaryComponentsList', /* 组件名称 */
  components: { /* 应用组件 */
    Pagination,
    Detail
  },
  filters: {
    emptyValueFilter(value) {
      return !value || value.toString().toLowerCase() === 'null' || value.toString().toLowerCase() === 'undefined' ? '--' : value
    }
  },
  data() { /* 定义数据 */
    return {
      fields,
      companyObject,
      departmentObject,
      teamObject,
      isUseAry,
      tableList: [],
      listQuery: {},
      tableKey: 1,
      tableLoading: true,
      tableSort: {},
      tableIsUse: [],
      tableCount: 0,
      dialogShow: false,
      editData: 0
    }
  },
  mounted() { /* 渲染后运行 */
    this.getTableList()
  },
  beforeRouteUpdate(to, from, next) { // 路由更新前
    if (to.path === from.path) {
      const oldQuery = Object.assign({}, from.query)
      const newQuery = Object.assign({}, to.query)
      if (JSON.stringify(oldQuery) !== JSON.stringify(newQuery)) this.getTableList()
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
      const sort = query.sort || '+id'
      const listQuery = { page: 1, pageSize: 20, sort }
      const sortSymbol = sort[0]
      const sortOrder = sort.slice(1, sort.length)
      this.tableSort = { order: sortSymbol === '+' ? 'ascending' : 'descending', prop: sortOrder }
      this.listQuery = { ...listQuery, ...query }
    },
    heightLightKeyword(k, v) {
      return v ? (this.listQuery[k] ? v.replace(new RegExp(this.listQuery[k], 'ig'), value => {
        return `<span style="color:#1980ff">${value}</span>`
      }) : v) : '--'
    },
    getTableList() {
      salaryList(this.listQuery).then(res => {
        const { data } = res
        const { list, count } = data
        this.tableList = list
        this.tableCount = count
        this.tableList.forEach(item => {
          this.tableIsUse[item.id] = item['isUse'] === '1'
          item.nameKeyword = this.heightLightKeyword('name', item.name)
        })
        this.tableLoading = false
      })
    },
    sortChange(data) {
      const { prop, order } = data
      this.listQuery.sort = (order === 'descending' ? `-` : `+`) + `${prop}`
      this.refresh()
    },
    refresh() {
      this.$router.push({
        path: '/salary/list',
        query: this.listQuery
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.refresh()
    },
    tableLineEdit(id) {
      this.$router.push({ path: `edit/${id}` })
    },
    querySearchAsync(queryString, cb) {
      const restaurants = this.attr
      cb(queryString ? restaurants.filter(state =>
        state.value.toUpperCase().match(queryString.toUpperCase())
      ) : restaurants)
    },
    editRow(row) {
      this.editData = row.id
      this.dialogShow = true
    },
    goEdit(id) {
      this.$router.push({ path: `edit/${id}` })
    },
    goCreate() {
      this.$router.push({ path: `create` })
    },
    goMonth() {
      this.$router.push({ path: `month` })
    },
    clear() {
      if (this.listQuery.company) {
        this.$confirm(
          `是否将此公司五险数据清除，此操作无法恢复，是否继续`,
          '提示',
          { type: 'warning' }
        ).then(() => {
          salaryClear({ company: this.listQuery.company }).then(res => {
            const { msg } = res
            this.$message.success(msg)
            this.getTableList()
          })
        }).catch(() => {
        })
      } else {
        this.$message.error('公司名称不能为空')
      }
    },
    onUpdateSuccess() {
      this.dialogShow = false
      this.listQuery.refresh = this.editData + 10000 * Math.random()
      this.refresh()
    },
    closeDialogShow() {
      this.dialogShow = false
    },
    isUseChange(event, id) {
      event = event ? '1' : '0'
      salaryState({ id, event }).then(res => {
        const { data, msg } = res
        if (data === '1') {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  .filter-item {
    width: 180px;
    margin-right: 5px;
  }
}
</style>
