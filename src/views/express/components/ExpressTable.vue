<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <el-table
      key="statList_1"
      v-loading="tableLoading"
      :data="tableData"
      :default-sort="tableSort"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChangeEmit"
    >
      <el-table-column label="编号" prop="id" sortable="custom" align="center" width="80" />
      <el-table-column label="编辑" fixed="left" align="center" width="70">
        <template slot-scope="{row:{id}}">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="goToUpdateEmit(id)" />
        </template>
      </el-table-column>
      <el-table-column label="签收" fixed="left" align="center" width="70">
        <template slot-scope="{row:{id,recipients,signer,signTime}}">
          <el-button type="success" icon="el-icon-finished" size="mini" @click="goToSign(id,recipients,signer,signTime)" />
        </template>
      </el-table-column>
      <el-table-column :label="fields.expressCompany" fixed="left" prop="yearMonth" align="center">
        <template slot-scope="{row:{keyword_expressCompany,expressId,expressCompany}}">
          <el-button type="mini" @click="openUrl(expressId,expressCompany)" v-html="keyword_expressCompany" />
        </template>
      </el-table-column>
      <el-table-column label="删除" fixed="right" align="center" width="70">
        <template slot-scope="{row:{id}}">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="goToDeleteEmit(id)" />
        </template>
      </el-table-column>
      <el-table-column :label="fields.expressId" prop="yearMonth" align="center">
        <template slot-scope="{row:{keyword_expressId}}"><span v-html="keyword_expressId" /></template>
      </el-table-column>
      <el-table-column :label="fields.sendTime" prop="client" align="center">
        <template slot-scope="{row:{sendTime}}">{{ sendTime | shortTime }}</template>
      </el-table-column>
      <el-table-column :label="fields.sendCompany" prop="client" align="center">
        <template slot-scope="{row:{keyword_sendCompany}}"><span v-html="keyword_sendCompany" /></template>
      </el-table-column>
      <el-table-column :label="fields.sender" prop="client" align="center">
        <template slot-scope="{row:{keyword_sender}}"><span v-html="keyword_sender" /></template>
      </el-table-column>
      <el-table-column :label="fields.content" prop="client" align="center">
        <template slot-scope="{row:{keyword_content}}"><span v-html="keyword_content" /></template>
      </el-table-column>
      <el-table-column :label="fields.details" prop="client" align="center">
        <template slot-scope="{row:{details}}">{{ details || '--' }}</template>
      </el-table-column>
      <el-table-column :label="fields.memo" prop="client" align="center">
        <template slot-scope="{row:{memo}}">{{ memo || '--' }}</template>
      </el-table-column>
      <el-table-column :label="fields.cityCn" prop="client" align="center">
        <template slot-scope="{row:{keyword_cityCn}}"><span v-html="keyword_cityCn" /></template>
      </el-table-column>
      <el-table-column :label="fields.address" prop="client" align="center">
        <template slot-scope="{row:{keyword_address}}"><span v-html="keyword_address" /></template>
      </el-table-column>
      <el-table-column :label="fields.recipientCompany" prop="client" align="center">
        <template slot-scope="{row:{keyword_recipientCompany}}"><span v-html="keyword_recipientCompany" /></template>
      </el-table-column>
      <el-table-column :label="fields.recipients" prop="client" align="center">
        <template slot-scope="{row:{keyword_recipients}}"><span v-html="keyword_recipients" /></template>
      </el-table-column>
      <el-table-column :label="fields.signer" prop="client" align="center">
        <template slot-scope="{row:{keyword_signer}}"><span v-html="keyword_signer" /></template>
      </el-table-column>
      <el-table-column :label="fields.signTime" prop="client" align="center">
        <template slot-scope="{row:{signTime}}">{{ signTime | shortTime }}</template>
      </el-table-column>
    </el-table>
    <el-dialog v-if="signControl" title="签收" width="500px" :visible.sync="signControl">
      <Sign :sign-id="signObject.id" :signer="signObject.signer" :sign-time="signObject.signTime" @signSuccessEmit="signSuccessEmit" />
    </el-dialog>
  </div>

</template>

<script>
import fields from '../modules/fields'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import Data_url from '../modules/data_url'
import { pmTime } from 'plugins-methods'
import Sign from './Sign'

export default {
  name: 'ExpressListTable',
  components: { Sign },
  filters: {
    shortTime(time) {
      return time ? pmTime.timeShort(time) : '--'
    }
  },
  mixins: [MethodsMixin],
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    tableSort: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      fields,
      urlObject: Data_url,
      signControl: false,
      signObject: {}
    }
  },
  methods: {
    openUrl(id, com) {
      const url = this.urlObject[com]
      const http = `${url}${id}`
      window.open(http)
    },
    signSuccessEmit() {
      this.signControl = false
      this.$emit('signSuccessEmit')
    },
    goToSign(id, recipients, signer, signTime) {
      signer = signer || recipients
      signTime = signTime || pmTime.timeFormat(new Date())
      this.signObject = { ...{ id, signer, signTime }}
      this.signToggle(true)
    },
    signToggle(sign) {
      this.signControl = sign
    },
    sortChangeEmit(data) {
      this.$emit('sortChangeEmit', data)
    },
    goToDeleteEmit(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('goToDeleteEmit', id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    goToUpdateEmit(id) {
      this.$emit('goToUpdateEmit', id)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
