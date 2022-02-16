<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="queryList.yearMonth"
        type="month"
        value-format="yyyy-MM"
        :placeholder="`请选择${fields.yearMonth}`"
        clearable
        class="filter-span"
        @change="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.client"
        :fetch-suggestions="clientSearch"
        :placeholder="fields.client"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-input
        v-model="queryList.product"
        :placeholder="fields.product"
        clearable
        class="filter-span"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.company"
        :fetch-suggestions="companySearch"
        :placeholder="fields.company"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-input
        v-model="queryList.project"
        :placeholder="fields.project"
        clearable
        class="filter-span"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
      />
    </div>
    <div class="filter-container">
      <el-select
        v-model="queryList.enterAmount"
        :placeholder="fields.enterAmount"
        clearable
        class="filter-span"
        @change="handleFilter"
        @clear="handleFilter"
      >
        <el-option v-for="(item,index) in enterAmountAry" :key="index" :label="item.value" :value="item.value" />
      </el-select>
      <el-date-picker
        v-model="queryList.enterTime"
        type="daterange"
        range-separator="至"
        start-placeholder="进帐开始日期"
        end-placeholder="进帐结束日期"
        class="filter-span"
        style="width: 370px"
        @change="handleFilter"
        @clear="handleFilter"
      />
      <el-select
        v-model="queryList.mode"
        :placeholder="fields.mode"
        clearable
        class="filter-span"
        @change="handleFilter"
        @clear="handleFilter"
      >
        <el-option v-for="(item,index) in modeAry" :key="index" :label="item.value" :value="item.value" />
      </el-select>
      <el-autocomplete
        v-model="queryList.outCompany"
        :fetch-suggestions="outCompanySearch"
        :placeholder="fields.outCompany"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
    </div>
    <div class="filter-container">
      <el-select
        v-model="queryList.invoice"
        :placeholder="fields.invoice"
        clearable
        class="filter-span"
        @change="handleFilter"
        @clear="handleFilter"
      >
        <el-option v-for="(item,index) in invoiceAry" :key="index" :label="item.value" :value="item.value" />
      </el-select>
      <el-button type="primary" class="el-icon-search filter-span" style="width: auto;">查询</el-button>
      <el-button type="warning" class="el-icon-upload filter-span" style="width: auto;" @click="controlImport(true)">导入</el-button>
      <el-button type="success" class="el-icon-plus filter-span" style="width: auto;" @click="routerGo('/stats/create')">创建</el-button>
      <el-button type="success" class="el-icon-tickets filter-span" style="width: auto;" @click="routerGo('/stats/month')">月表</el-button>
    </div>
    <ListTable
      :table-loading="tableLoading"
      :table-data="tableData"
      :table-sort="tableSort"
      @sortChangeEmit="sortChangeEmit"
      @goToDeleteEmit="goToDeleteEmit"
      @goToUpdateEmit="goToUpdateEmit"
    />
    <Pagination
      v-show="tableDataLength>0"
      :total="tableDataLength"
      :page.sync="queryList.page"
      :limit.sync="queryList.pageSize"
      @pagination="refresh"
    />
    <el-dialog v-if="importShow" title="导入数据" width="500px" :visible.sync="importShow">
      <import
        @uploadSuccessEmit="uploadSuccessEmit"
      />
    </el-dialog>
  </div>
</template>

<script>
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import Data_fields from './modules/data_fields'
import Data_modeAry from './modules/data_modeAry'
import Data_enterAmountAry from './modules/data_enterAmountAry'
import Data_invoiceAry from './modules/data_invoiceAry'
import Pagination from '@/components/Pagination'
import ListTable from './components/list-table'
import Import from './components/import'
import { pmKeyword } from 'plugins-methods'
import { statsCompany, statsList, statsDelete } from '@/api/stats'

export default {
  name: 'StatsList',
  components: { Pagination, ListTable, Import },
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {
      fields: Data_fields,
      modeAry: Data_modeAry,
      enterAmountAry: Data_enterAmountAry,
      invoiceAry: Data_invoiceAry,
      importShow: false,
      clientAry: [],
      companyAry: [],
      outCompanyAry: []
    }
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    startAction() {
      statsList(this.queryList).then(({ code, data }) => {
        if (code === 0) {
          const { list, count } = data
          this.tableData = list
          this.tableDataLength = count
          this.tableLoading = false
          this.tableData.forEach(item => {
            item.client_keyword = pmKeyword.keywordHeightLight(this.queryList, 'client', item.client)
            item.product_keyword = pmKeyword.keywordHeightLight(this.queryList, 'product', item.product)
            item.company_keyword = pmKeyword.keywordHeightLight(this.queryList, 'company', item.company)
            item.project_keyword = pmKeyword.keywordHeightLight(this.queryList, 'project', item.project)
            item.outCompany_keyword = pmKeyword.keywordHeightLight(this.queryList, 'outCompany', item.outCompany)
          })
        }
      })
    },
    setData() {
      return {
        sort: '-id'
      }
    },
    uploadSuccessEmit() {
      this.controlImport(false)
      this.startAction()
    },
    controlImport(control) {
      this.importShow = control
    },
    goToDeleteEmit(id) {
      statsDelete({ id }).then(({ code, msg }) => {
        if (code === 0) {
          this.$message.success(msg)
          this.startAction()
        } else {
          this.$message.error(msg)
        }
      })
    },
    goToUpdateEmit(id) {
      this.routerGo(`/stats/update/${id}`)
    },
    getCompany() {
      statsCompany().then(({ code, data }) => {
        if (code === 0) {
          const { clientAry, companyAry, outCompanyAry } = data
          this.clientAry = clientAry
          this.companyAry = companyAry
          this.outCompanyAry = outCompanyAry
        }
      })
    },
    clientSearch(queryString, cb) {
      const restaurants = this.clientAry
      cb(queryString ? restaurants.filter(state => state.value.toUpperCase().match(queryString.toUpperCase())) : restaurants)
    },
    companySearch(queryString, cb) {
      const restaurants = this.companyAry
      cb(queryString ? restaurants.filter(state => state.value.toUpperCase().match(queryString.toUpperCase())) : restaurants)
    },
    outCompanySearch(queryString, cb) {
      const restaurants = this.outCompanyAry
      cb(queryString ? restaurants.filter(state => state.value.toUpperCase().match(queryString.toUpperCase())) : restaurants)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
