<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="queryList.state"
        :placeholder="`${fields['state']}`"
        class="filter-span"
        clearable
        @clear="handleFilter"
        @change="handleFilter"
      >
        <el-option v-for="item in stateObject" :key="item['key']" :label="item['label']" :value="item['value']" />
      </el-select>
      <el-select
        v-model="queryList.caseName"
        :placeholder="`${fields['caseName']}`"
        class="filter-span"
        clearable
        @clear="handleFilter"
        @change="handleFilter"
      >
        <el-option v-for="item in caseNameObject" :key="item['key']" :label="item['label']" :value="item['value']" />
      </el-select>
      <el-input
        v-model="queryList.caseNumber"
        class="filter-span"
        clearable
        :placeholder="`${fields['caseNumber']}`"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-input
        v-model="queryList.why"
        class="filter-span"
        clearable
        :placeholder="`${fields['why']}`"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
    </div>
    <div class="filter-container">
      <el-select
        v-model="queryList.type"
        :placeholder="`${fields['type']}`"
        class="filter-span"
        clearable
        @clear="handleFilter"
        @change="handleFilter"
      >
        <el-option v-for="item in typeObject" :key="item['key']" :label="item['label']" :value="item['value']" />
      </el-select>
      <el-input
        v-model="queryList.client"
        class="filter-span"
        clearable
        :placeholder="`${fields['client']}`"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-input
        v-model="queryList.oppositeLitigant"
        class="filter-span"
        clearable
        :placeholder="`${fields['oppositeLitigant']}`"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-button type="primary" class="el-icon-search filter-span" style="width: auto;" @click="refresh">查询</el-button>
      <el-button type="success" class="el-icon-plus filter-span" style="width: auto;" @click="gotoCreate">创建</el-button>
    </div>
    <el-table
      :key="tableKey"
      :loading="tableLoading"
      :data="tableData"
      :default-sort="tableSort"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item :label="`${fields['name']}`" :label-width="labelWidth">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item :label="`${fields['idNumber']}`" :label-width="labelWidth">
              <span>{{ `${props.row.idType} ${props.row.idNumber}` }}</span>
            </el-form-item>
            <el-form-item :label="`${fields['parties']}`" :label-width="labelWidth">
              <span>{{ props.row.parties }}</span>
            </el-form-item>
            <el-form-item :label="`${fields['disputePrice']}`" :label-width="labelWidth">
              <span>{{ props.row.disputePrice || '--' }}</span>
            </el-form-item>
            <el-form-item :label="`${fields['price']}`" :label-width="labelWidth">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="案件作废" :label-width="labelWidth">
              <el-button v-if="+props.row.isUse===1" type="danger" @click="isUseToggle(props.row.id,0)">确定作废</el-button>
              <el-button v-else type="success" @click="isUseToggle(props.row.id,1)">取消作废</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['view']}`" align="center" width="80">
        <template slot-scope="{row:{id}}">
          <el-button type="text" class="el-icon-view" @click="caseView(id)">浏览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="合同原件" align="center">
        <el-table-column label="交付情况" align="center" width="100">
          <template slot-scope="{row:{id,delivery}}">
            <template v-if="queryList.isLawyer">
              <i v-if="+delivery===1" class="el-icon-check" />
              <i v-else class="el-icon-close" />
            </template>
            <template v-else>
              <i v-if="+delivery===1" class="el-icon-check" />
              <el-button v-else type="text" class="el-icon-message" @click="confirmDelivery(id)">确认收到</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作状态" align="center">
        <el-table-column label="入账时间" align="center" width="160">
          <template slot-scope="{row:{step,id,caseName,caseNumber,enterDate,createTimestamp}}">
            <template v-if="queryList.isLawyer">
              <el-button v-if="step===1" class="el-icon-edit" type="text" @click="continueCreate(id)">{{ `${stateObject[0]['value']}` }}</el-button>
              <span v-else-if="step===2">{{ `${stateObject[1]['value']}` }}</span>
              <span v-else-if="step===3">{{ `${stateObject[2]['value']}` }}</span>
              <span v-else-if="step===4">{{ `${stateObject[3]['value']}` }}</span>
              <span v-else-if="step===5">{{ enterDate }}</span>
            </template>
            <template v-else>
              <el-button v-if="step===1" class="el-icon-hot-water" type="text" :disabled="true">尚未提交</el-button>
              <el-button v-else-if="step===2" class="el-icon-tickets" type="text" @click="approvalCase(id)">进行审批</el-button>
              <el-button v-else-if="step===3" class="el-icon-s-check" type="text" @click="showInvoice(id, caseName, caseNumber,createTimestamp)">填写发票</el-button>
              <el-button v-else-if="step===4" class="el-icon-finished" type="text" @click="showEnter(id, caseName, caseNumber,createTimestamp)">确认入款</el-button>
              <span v-else-if="step===5">{{ enterDate }}</span>
            </template>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="caseName" :label="`${fields['caseName']}`" align="center" width="100">
        <template slot-scope="{row:{caseName,isUse}}">
          <span v-if="+isUse===1" v-html="caseName" />
          <del v-else style="color:#c00;" v-html="caseName" />
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['caseNumber']}`" align="center" width="80">
        <template slot-scope="{row:{caseNumberKeyword,isUse}}">
          <span v-if="+isUse===1" v-html="caseNumberKeyword" />
          <del v-else style="color:#c00;" v-html="caseNumberKeyword" />
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['createRealName']}`" align="center" width="80">
        <template slot-scope="{row:{createRealName}}"><span>{{ createRealName }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['why']}`" align="center">
        <template slot-scope="{row:{whyKeyword}}"><span v-html="whyKeyword" /></template>
      </el-table-column>
      <el-table-column prop="type" :label="`${fields['type']}`" align="center" width="80" />
      <el-table-column prop="stage" :label="`${fields['stage']}`" align="center" width="80" />
      <el-table-column :label="`${fields['client']}`" align="center">
        <template slot-scope="{row:{clientKeyword}}"><span v-html="clientKeyword" /></template>
      </el-table-column>
      <el-table-column :label="`${fields['oppositeLitigant']}`" align="center">
        <template slot-scope="{row:{oppositeLitigantKeyword}}"><span v-html="oppositeLitigantKeyword" /></template>
      </el-table-column>
      <el-table-column :label="`${fields['price']}`" align="center">
        <template slot-scope="{row:{price,inHave}}"><span>{{ price || inHave }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['contract']}`" align="center" width="120">
        <template slot-scope="{row:{contractFile}}">
          <el-button v-if="contractFile!==''" icon="el-icon-download" type="text" @click="downloadFile(contractFile)">下载</el-button>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['letter']}`" align="center" width="120">
        <template slot-scope="{row:{letterFile,letterOld}}">
          <el-button v-if="letterFile!==''" icon="el-icon-download" type="text" @click="downloadFile(letterFile,letterOld)">下载</el-button>
          <span v-else>--</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-show="tableCount>0" :total="tableCount" :page.sync="queryList.page" :limit.sync="queryList.pageSize" @pagination="refresh" />
    <el-dialog v-if="invoiceShow" title="填写发票" width="500px" :visible.sync="invoiceShow" @click="closeInvoiceShow">
      <invoice :in-params="inParams" @onInvoiceSuccess="onInvoiceSuccess" />
    </el-dialog>
    <el-dialog v-if="enterShow" title="确认入账" width="500px" :visible.sync="enterShow" @click="closeEnterShow">
      <enter :en-params="enParams" @onEnterSuccess="onEnterSuccess" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import Invoice from './components/Invoice'
import Enter from './components/Enter'
import { fields, typeObject, stateObject, caseNameObject } from './components/config'
import { caseList, caseCheck, caseDelivery, caseIsUse } from '@/api/case'

export default {
  name: 'ViewsCaseList', /* 组件名称 */
  components: { Pagination, Invoice, Enter },
  data() { /* 定义数据 */
    return {
      fields: fields,
      caseNameObject,
      typeObject,
      stateObject,
      queryList: {},
      tableKey: 1,
      tableData: [],
      tableCount: 0,
      tableLoading: true,
      tableSort: {},
      labelWidth: '200px',
      inParams: {},
      invoiceShow: false,
      enParams: {},
      enterShow: false
    }
  },
  computed: { /* 计算属性 */
    ...mapGetters(['roles'])
  },
  watch: { /* 监控值变换 */ },
  mounted() { /* 渲染后运行 */
    this.getIsLawyer()
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
    getIsLawyer() {
      this.queryList.isLawyer = this.roles.includes('lawyer')
    },
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      // noinspection JSValidateTypes
      query.page && (query.page = +query.page)
      // noinspection JSValidateTypes
      query.pageSize && (query.pageSize = +query.pageSize)
      const sort = query.sort || '-id'
      const queryList = { isLawyer: false, page: 1, pageSize: 20, sort }
      const sortSymbol = sort[0]
      const sortOrder = sort.slice(1, sort.length)
      this.tableSort = { order: sortSymbol === '+' ? 'ascending' : 'descending', prop: sortOrder }
      this.queryList = { ...queryList, ...query }
    },
    heightLightKeyword(k, v) {
      return v ? (this.queryList[k] ? v.replace(new RegExp(this.queryList[k], 'ig'), value => {
        return `<span style="color:#1980ff">${value}</span>`
      }) : v) : '--'
    },
    getTableList() {
      caseList(this.queryList).then(res => {
        const { data } = res
        const { list, count } = data
        this.tableData = list
        this.tableCount = count
        this.tableData.forEach(item => {
          item.caseNumberKeyword = this.heightLightKeyword('caseNumber', item.caseNumber)
          item.whyKeyword = this.heightLightKeyword('why', item.why)
          item.clientKeyword = this.heightLightKeyword('client', item.client)
          item.oppositeLitigantKeyword = this.heightLightKeyword('oppositeLitigant', item.oppositeLitigant)
          item.nameKeyword = this.heightLightKeyword('name', item.name)
          item.partiesKeyword = this.heightLightKeyword('parties', item.parties)
        })
        this.tableLoading = false
      })
    },
    downloadFile(file, name) {
      console.log(name)
      file && window.open(file)
    },
    continueCreate(id) {
      this.$router.push({ path: `create/${id}` })
    },
    approvalCase(id) {
      this.$confirm('是否确定审批？', '提示', { type: 'warning' }).then(() => {
        caseCheck({ id }).then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.getTableList()
        })
      }).catch(() => {
        this.submitLoading = false
      })
    },
    showInvoice(id, caseName, caseNumber, createTimestamp) {
      this.inParams = { id, caseName, caseNumber, createTimestamp }
      this.invoiceShow = true
    },
    closeInvoiceShow() {
      this.invoiceShow = false
    },
    onInvoiceSuccess() {
      this.closeInvoiceShow()
      this.getTableList()
    },
    showEnter(id, caseName, caseNumber, createTimestamp) {
      this.enParams = { id, caseName, caseNumber, createTimestamp }
      this.enterShow = true
    },
    closeEnterShow() {
      this.enterShow = false
    },
    onEnterSuccess() {
      this.closeEnterShow()
      this.getTableList()
    },
    refresh() {
      this.$router.push({
        path: '/case/list',
        query: this.queryList
      })
    },
    sortChange(data) {
      const { prop, order } = data
      this.queryList.sort = (order === 'descending' ? `-` : `+`) + `${prop}`
      this.refresh()
    },
    handleFilter() {
      this.queryList.page = 1
      this.refresh()
    },
    gotoCreate() {
      this.$router.push({ path: `create` })
    },
    confirmDelivery(id) {
      this.$confirm('是否确认原件已经收到', '提示', { type: 'warning' }).then(() => {
        caseDelivery({ id }).then(() => {
          this.$message.success('确认收到成功')
          this.getTableList()
        })
      }).catch(() => {
      })
    },
    caseView(id) {
      this.$router.push({ path: `view/${id}` })
    },
    isUseToggle(id, isUse) { // 取消作废
      caseIsUse({ id, isUse }).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.queryList.timestamp = Math.random() * 1000
        this.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  .filter-span {
    width: 180px;
    margin-right: 5px;
  }
}

.table-expand {
  font-size: 0;

  label {
    width: 90px;
    color: #99a9bf;
  }

  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
}
</style>
