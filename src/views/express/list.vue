<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="queryList.expressCompany" :placeholder="fields.expressCompany" clearable class="filter-span" @change="handleFilter" @clear="handleFilter">
        <el-option v-for="(item,index) in expressCompanyAry" :key="index" :label="item.value" :value="item.value" />
      </el-select>
      <el-autocomplete
        v-model="queryList.expressId"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.expressId)"
        :placeholder="fields.expressId"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.sendCompany"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.sendCompany)"
        :placeholder="fields.sendCompany"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.sender"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.sender)"
        :placeholder="fields.sender"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.content"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.content)"
        :placeholder="fields.content"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
    </div>
    <div class="filter-container">
      <el-autocomplete
        v-model="queryList.cityCn"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.cityCn)"
        :placeholder="fields.cityCn"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.address"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.address)"
        :placeholder="fields.address"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.recipientCompany"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.recipientCompany)"
        :placeholder="fields.recipientCompany"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.recipients"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.recipients)"
        :placeholder="fields.recipients"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
      <el-autocomplete
        v-model="queryList.signer"
        :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.signer)"
        :placeholder="fields.signer"
        clearable
        class="filter-span"
        @select="handleFilter"
        @clear="handleFilter"
      />
    </div>
    <div class="filter-container">
      <el-date-picker
        v-model="queryList.sendTime"
        type="daterange"
        value-format="yyyy-MM-dd hh:mm:ss"
        range-separator="至"
        start-placeholder="寄件开始日期"
        end-placeholder="寄件结束日期"
        class="filter-span"
        style="width: 370px"
        @change="handleFilter"
        @clear="handleFilter"
      />
      <el-date-picker
        v-model="queryList.signTime"
        type="daterange"
        value-format="yyyy-MM-dd hh:mm:ss"
        range-separator="至"
        start-placeholder="收件开始日期"
        end-placeholder="收件结束日期"
        class="filter-span"
        style="width: 370px"
        @change="handleFilter"
        @clear="handleFilter"
      />
      <el-button type="primary" class="el-icon-search filter-span" style="width: auto;" @click="refresh">查询</el-button>
      <el-button type="success" class="el-icon-plus filter-span" style="width: auto;" @click="routerGo('/express/create')">创建</el-button>
    </div>
    <ExpressTable
      :table-loading="tableLoading"
      :table-data="tableData"
      :table-sort="tableSort"
      @sortChangeEmit="sortChangeEmit"
      @goToDeleteEmit="goToDeleteEmit"
      @goToUpdateEmit="goToUpdateEmit"
      @signSuccessEmit="signSuccessEmit"
    />
    <div align="center">
      <Pagination
        v-show="tableDataLength>0"
        :total="tableDataLength"
        :page.sync="queryList.page"
        :limit.sync="queryList.pageSize"
        @pagination="refresh"
      />
    </div>
  </div>
</template>

<script>
import ListMixin from '@/components/Mixins/ListMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import fields from './modules/fields'
import Detail_onceAry from './modules/data_onceAry'
import Data_expressAry from './modules/data_expressAry'
import Pagination from '@/components/Pagination'
import ExpressTable from './components/ExpressTable'
import { autoQuery, pmKeyword } from 'plugins-methods'
import { expressOnce, expressList, expressDelete } from '@/api/express'
export default {
  name: 'ExpressList', // 列表
  components: { Pagination, ExpressTable },
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {
      queryList: {
        signTime: ''
      },
      defaultTableSort: '-id',
      fields,
      expressCompanyAry: Data_expressAry,
      onceAry: Detail_onceAry
    }
  },
  mounted() {
    this.getOnce()
  },
  methods: {
    signSuccessEmit() {
      this.startAction()
    },
    goToDeleteEmit(id) {
      expressDelete({ id }).then(({ code, msg }) => {
        if (code === 0) {
          this.$message.success(msg)
          this.startAction()
        } else {
          this.$message.error(msg)
        }
      })
    },
    goToUpdateEmit(id) {
      this.routerGo(`/express/update/${id}`)
    },
    getOnce() {
      expressOnce().then(({ code, data }) => {
        if (code === 0) {
          this.onceAry = { ...data }
        }
      })
    },
    autoQuery(q, s, a) {
      autoQuery(q, s, a)
    },
    startAction() {
      expressList(this.queryList).then(({ code, data: { list, count }}) => {
        if (code === 0) {
          this.tableData = list
          this.tableDataLength = count
          this.tableLoading = false
          this.tableData.forEach(item => {
            item.keyword_expressCompany = pmKeyword.keywordHeightLight(this.queryList, 'expressCompany', item.expressCompany)
            item.keyword_expressId = pmKeyword.keywordHeightLight(this.queryList, 'expressId', item.expressId)
            item.keyword_sendCompany = pmKeyword.keywordHeightLight(this.queryList, 'sendCompany', item.sendCompany)
            item.keyword_sender = pmKeyword.keywordHeightLight(this.queryList, 'sender', item.sender)
            item.keyword_content = pmKeyword.keywordHeightLight(this.queryList, 'content', item.content)
            item.keyword_cityCn = pmKeyword.keywordHeightLight(this.queryList, 'cityCn', item.cityCn)
            item.keyword_address = pmKeyword.keywordHeightLight(this.queryList, 'address', item.address)
            item.keyword_recipientCompany = pmKeyword.keywordHeightLight(this.queryList, 'recipientCompany', item.recipientCompany)
            item.keyword_recipients = pmKeyword.keywordHeightLight(this.queryList, 'recipients', item.recipients)
            item.keyword_signer = pmKeyword.keywordHeightLight(this.queryList, 'signer', item.signer)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
