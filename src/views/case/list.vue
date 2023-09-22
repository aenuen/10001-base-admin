<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 年份搜索 -->
      <el-date-picker v-model="queryList.caseYear" :placeholder="fields.caseYear" class="filter-ele" value-format="yyyy" type="year" @change="handleFilter" />
      <!-- 年月搜索 -->
      <el-date-picker v-model="queryList.createYearMonth" :placeholder="fields.createYearMonth" class="filter-ele" value-format="yyyy-MM" type="month" @change="handleFilter" />
      <!-- 律师搜索 -->
      <el-select v-if="isAdmin" v-model="queryList.createRealName" filterable class="filter-ele" :placeholder="fields.createRealName" clearable @change="handleFilter">
        <el-option v-for="item in lawyerAry" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
      <!-- 案号搜索 -->
      <el-select v-model="queryList.caseName" filterable class="filter-ele" :placeholder="fields.caseName" clearable @change="handleFilter">
        <el-option v-for="item in caseNameAry" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
      <!-- 类别搜索 -->
      <el-select v-model="queryList.type" filterable class="filter-ele" :placeholder="fields.type" clearable @change="handleFilter">
        <el-option v-for="item in typeAry" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
      <!-- 委托人搜索 -->
      <el-input v-model="queryList.client" :placeholder="fields.client" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <el-button class="filter-btn el-icon-search" @click="handleFilter"> 搜索 </el-button>
      <el-button type="success" class="filter-btn el-icon-plus" @click="$router.push('create')"> 新增 </el-button>
    </div>
    <!-- 列表 -->
    <div id="caseListTable">
      <ListTable :table-data="tableData" :table-loading="tableLoading" :table-sort="tableSort" :is-use="tableIsUse" @onSortChange="onSortChange" @onSureDelivery="onSureDelivery" @onIsUseChange="onIsUseChange" @onRemoveAlone="onRemoveAlone" @onManager="managerOpen" />
    </div>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.page" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <!-- 发票列表 -->
    <Dialog :control="managerShow" :title="'“' + managerName + '字' + managerNumber + '号”发票列表'" @controlChange="managerClose">
      <InvoiceList ref="manager" :case-id="managerId" @onAddInvoice="addInvoice = true" @onInvoiceEnter="onInvoiceEnter" @invoiceRemove="invoiceRemove" />
    </Dialog>
    <!-- 增加发票 -->
    <Dialog :control="addInvoice" title="增加发票" :width="700" @controlChange="addInvoice = false">
      <AddInvoice :case-id="managerId" :case-name="managerName" :case-number="managerNumber" @invoiceSuccess="invoiceSuccess" />
    </Dialog>
    <!-- 发票入账 -->
    <Dialog :control="enterShow" title="发票入账" :width="700" @controlChange="enterShow = false">
      <Enter :case-id="managerId" :invoice-id="invoiceId" :case-name="managerName" :case-number="managerNumber" @enterSuccess="enterSuccess" />
    </Dialog>
  </div>
</template>
<script>
// api
import { caseApi } from '@/api/case'
// components
import ListTable from './components/ListTable'
import Dialog from '@/components/Dialog'
import Pagination from '@/components/Pagination'
import InvoiceList from './components/InvoiceList'
import AddInvoice from './components/AddInvoice'
import Enter from './components/Enter'
// data
import { fields } from './modules/fields'
import { typeAry } from './modules/typeAry'
import { lawyerAry } from './modules/lawyerAry'
import { caseNameAry } from './modules/caseNameAry'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
import { keyLight } from 'abbott-methods/import'
import { mapGetters } from 'vuex'
// settings
export default {
  name: 'CaseList',
  components: { Dialog, ListTable, Pagination, InvoiceList, AddInvoice, Enter },
  mixins: [ListMixin],
  data() {
    return {
      fields,
      typeAry,
      lawyerAry,
      caseNameAry,
      tableIsUse: [],
      managerShow: false,
      managerList: [],
      managerId: 0,
      managerName: '',
      managerNumber: 0,
      addInvoice: false,
      enterShow: false,
      invoiceId: 0
    }
  },
  computed: {
    ...mapGetters(['roles', 'realName']),
    isAdmin() {
      return this.roles.includes('admin')
    }
  },
  methods: {
    // 设置数据
    setData() {
      return {
        sort: '-id'
      }
    },
    // 获取列表数据
    startHandle() {
      caseApi.list(this.queryList).then(({ code, data }) => {
        const { list, count } = data
        if (code === 200) {
          this.tableData = list
          this.tableDataLength = count
          this.tableData.forEach((item) => {
            this.tableIsUse[item.id] = +item.isUse === 1
            item.createRealName_key = keyLight(this.queryList, 'createRealName', item.createRealName)
            item.caseName_key = keyLight(this.queryList, 'caseName', item.caseName)
            item.type_key = keyLight(this.queryList, 'type', item.type)
            item.client_key = keyLight(this.queryList, 'client', item.client)
          })
        }
      })
    },
    // 单个删除案件
    removeAlone() {
      caseApi.remove({ id: this.removeId }).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.startHandle()
        }
      })
    },
    // 确认原件已收到
    onSureDelivery(id) {
      caseApi
        .delivery({ id })
        .then(({ code, msg }) => {
          if (code === 200) {
            this.$message.success(msg)
            this.refreshStrong()
          } else {
            this.$message.error(msg)
          }
        })
        .catch(() => {
          this.$message.error(`确认失败…`)
        })
    },
    // 状态改变
    onIsUseChange(event, id) {
      event = event ? '1' : '0'
      caseApi.isUse({ id, event }).then((res) => {
        const { data, msg } = res
        if (+data === 1) {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
      })
    },
    // 打开入账管理
    managerOpen(id, caseName, caseNumber) {
      this.managerId = id
      this.managerName = caseName
      this.managerNumber = caseNumber
      this.managerShow = true
    },
    // 关闭入账管理
    managerClose() {
      this.managerId = 0
      this.managerName = ''
      this.managerNumber = 0
      this.managerShow = false
    },
    // 增加发票成功
    invoiceSuccess(invoice) {
      this.addInvoice = false // 关闭发票列表窗口
      this.startHandle() // 更新案件列表
      this.$refs.manager.invoiceSuccess(invoice) // 发票列表加入新增加内容
    },
    // 删除发票成功
    invoiceRemove() {
      this.startHandle() // 更新案件列表
      this.$refs.manager.startHandle() // 更新发票列表
    },
    // 打开发票入账
    onInvoiceEnter(id) {
      this.invoiceId = id
      this.enterShow = true
    },
    // 发票入账成功
    enterSuccess() {
      this.startHandle() // 更新案件列表
      this.$refs.manager.startHandle() // 更新发票列表
    }
  }
}
</script>
<style lang="scss" scoped></style>
