<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="queryList.company"
        :placeholder="`${fields['company']}`"
        clearable
        class="filter-item"
        @clear="handleFilter"
        @change="handleFilter"
      >
        <el-option v-for="(value,index) in companyArray" :key="index" :value="value" :label="value" />
      </el-select>
      <el-select v-model="queryList.area" :placeholder="`${fields['area']}`" clearable class="filter-item" @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(value,index) in areaArray" :key="index" :value="value" :label="value" />
      </el-select>
      <el-input
        v-model="queryList.name"
        :placeholder="`${fields['name']}`"
        clearable
        class="filter-item"
        @clear="handleFilter"
        @change="handleFilter"
      />
      <el-button type="primary" class="filter-item filter-button el-icon-search" @click="handleFilter">查询</el-button>
      <el-button type="primary" class="filter-item filter-button el-icon-edit" @click="handleCreate">录入</el-button>
      <el-badge :value="showNumber">
        <el-button type="warning" class="filter-item filter-button el-icon-truck" @click="showOutList">出库车</el-button>
      </el-badge>
    </div>
    <div v-if="addNumberShow">
      <el-dialog title="数量增加" width="1200px" :lock-scroll="true" :fullscreen="true" :visible.sync="addNumberShow">
        <add-number :add-number-id="addNumberId" @onAddNumberSuccess="onAddNumberSuccess" @onAddNumberError="onAddNumberError" />
      </el-dialog>
    </div>
    <div v-if="showOutCar">
      <el-dialog title="产品出库" width="1200px" :lock-scroll="true" :fullscreen="true" :visible.sync="showOutCar">
        <out-car :show-list="showList" @onOutCarSuccess="onOutCarSuccess" />
      </el-dialog>
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
      <el-table-column :label="`${fields['id']}`" prop="id" sortable="custom" align="center" width="80" />
      <el-table-column :label="`${fields['edit']}`" align="center" width="80">
        <template slot-scope="{row:{id}}">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="gotoEdit(id)" />
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['company']}`" prop="company" align="center" width="80" />
      <el-table-column :label="`${fields['area']}`" prop="area" align="center" />
      <el-table-column :label="`${fields['name']}`" prop="name" align="center" width="200" />
      <el-table-column :label="`${fields['type']}`" align="center" width="200">
        <template slot-scope="{row:{type}}">{{ type|emptyValueFilter }}</template>
      </el-table-column>
      <el-table-column :label="`${fields['price']}`" prop="price" align="center" />
      <el-table-column :label="`${fields['number']}`" prop="number" align="center" />
      <el-table-column :label="`${fields['add']}`" align="center" width="80">
        <template slot-scope="{row:{id}}">
          <el-button type="success" icon="el-icon-plus" size="small" @click="gotoAdd(id)" />
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['outNumber']}`" align="center" width="155">
        <template slot-scope="{row}">
          <el-input-number
            v-model="outNumber[row.id]"
            step-strictly
            size="mini"
            :min="0"
            :max="+row.number"
            :precision="3"
            :step="0.001"
            placeholder="0"
            @blur="outNumberChange(row)"
            @change="outNumberChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['balance']}`" align="center" width="200">
        <template slot-scope="{row:{number,totalNumber,totalAmount}}">{{ (number / totalNumber * totalAmount).toFixed(2) }}</template>
      </el-table-column>
      <el-table-column :label="`${fields['totalNumber']}`" prop="totalNumber" align="center" />
      <el-table-column :label="`${fields['totalAmount']}`" prop="totalAmount" align="center" />
    </el-table>
    <Pagination v-show="tableCount>0" :total="tableCount" :page.sync="queryList.page" :limit.sync="queryList.pageSize" @pagination="refresh" />
  </div>
</template>
<script>
import { fields, companyArray, areaArray } from './components/config'
import Pagination from '@/components/Pagination'
import AddNumber from './components/AddNumber'
import OutCar from './components/OutCar'
import { reserveList } from '@/api/reserve'
import { emptyValueFilter } from '@/libs/filter'

export default {
  name: 'ViewsReserveList',
  components: { // 引用组件
    Pagination,
    AddNumber,
    OutCar
  },
  filters: {
    emptyValueFilter
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
      tableKey: 1,
      tableData: [],
      tableLoading: true,
      tableSort: {},
      tableCount: 0,
      outNumber: [],
      outList: [],
      showNumber: 0,
      showList: [],
      showOutCar: false,
      addNumberId: 0,
      addNumberShow: false
    }
  },
  computed: { // 监控自定义的变量
  },
  watch: { // 监控值变换
  },
  mounted() { // 渲染后运行
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
  created() { // 渲染时运行
    this.parseQuery()
  },
  methods: { // 方法函数
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      // noinspection JSValidateTypes
      query.page && (query.page = +query.page)
      // noinspection JSValidateTypes
      query.pageSize && (query.pageSize = +query.pageSize)
      const sort = query.sort || '-id'
      const listQuery = { page: 1, pageSize: 20, sort }
      const sortSymbol = sort[0]
      const sortOrder = sort.slice(1, sort.length)
      this.tableSort = { order: sortSymbol === '+' ? 'ascending' : 'descending', prop: sortOrder }
      this.queryList = { ...listQuery, ...query }
    },
    getTableList() {
      reserveList(this.queryList).then(res => {
        const { data } = res
        const { list, count } = data
        this.tableData = list
        this.tableCount = count
        this.tableLoading = false
      })
    },
    handleFilter() {
      this.queryList.page = 1
      this.refresh()
    },
    handleCreate() {
      this.$router.push({ path: '/reserve/create' })
    },
    refresh() {
      this.$router.push({
        path: '/reserve/list',
        query: this.queryList
      })
    },
    sortChange(data) {
      const { prop, order } = data
      this.queryList.sort = (order === 'descending' ? `-` : `+`) + `${prop}`
      this.refresh()
    },
    gotoEdit(id) {
      this.$router.push({ path: `/reserve/edit/${id}` })
    },
    gotoAdd(id) {
      this.addNumberId = id
      this.addNumberShow = true
    },
    onAddNumberSuccess() {
      this.getTableList()
      this.addNumberShow = false
    },
    onAddNumberError() {
      this.$message.error('参数错误，无法增加产品数量')
      this.addNumberShow = false
    },
    outNumberChange(row) {
      const {
        id,
        company,
        area,
        name,
        type,
        amount,
        unit,
        bill,
        price,
        createRealName,
        createYearMonth,
        createTimestamp
      } = row
      this.outList[id] || (this.outList[id] = {})
      this.outList[id] = Object.assign(this.outList[id], {
        id,
        company,
        area,
        name,
        type,
        amount,
        unit,
        bill,
        price,
        createRealName,
        createYearMonth,
        createTimestamp,
        number: this.outNumber[id]
      })
      this.outList[id].subtotal = (this.outList[id].price * this.outList[id].number).toFixed(2)
      this.showList = []
      this.showNumber = 0
      Object.keys(this.outList).forEach(key => {
        const item = this.outList[key]
        if (item.number && item.number > 0) {
          this.showList.push(item)
          this.showNumber = (this.showNumber * 100 + item.number * 100) / 100
        }
      })
    },
    showOutList() {
      this.showNumber > 0 ? (this.showOutCar = true) : this.$message.info('出库车是空的，请选择填写出库产品。')
    },
    closeOutList() {
      this.showOutCar = false
    },
    onOutCarSuccess() {
      this.$message.success('出库成功')
      this.getTableList()
      this.closeOutList()
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

  .filter-item:last-child {
    margin-left: 0
  }

  .filter-button {
    width: 100px;
    margin-left: 0;
  }
}
</style>
