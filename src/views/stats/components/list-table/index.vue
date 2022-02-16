<!--suppress HtmlDeprecatedAttribute -->
<template>
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
    <el-table-column :label="fields.id" prop="id" sortable="custom" align="center" width="80" />
    <el-table-column :label="fields.update" align="center" width="70">
      <template slot-scope="{row:{id}}">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="goToUpdateEmit(id)" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.delete" fixed="right" align="center" width="70">
      <template slot-scope="{row:{id}}">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="goToDeleteEmit(id)" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.yearMonth" prop="yearMonth" align="center">
      <template slot-scope="{row:{yearMonth}}"><span>{{ yearMonth || '--' }}</span></template>
    </el-table-column>
    <el-table-column :label="fields.client" prop="client" align="center" width="180">
      <template slot-scope="{row:{client_keyword}}"><span v-html="client_keyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.product" prop="product" align="center" width="180">
      <template slot-scope="{row:{product_keyword}}"><span v-html="product_keyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.company" prop="company" align="center">
      <template slot-scope="{row:{company_keyword}}"><span v-html="company_keyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.project" prop="project" align="center" width="180">
      <template slot-scope="{row:{project_keyword}}"><span v-html="project_keyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.amount" prop="amount" align="center">
      <template slot-scope="{row:{amount}}"><span>{{ amount || 0 }}</span></template>
    </el-table-column>
    <el-table-column :label="fields.enterAmount" prop="enterAmount" align="center">
      <template slot-scope="{row:{enterAmount}}"><span>{{ enterAmount || 0 }}</span></template>
    </el-table-column>
    <el-table-column :label="fields.enterTime" prop="enterTime" align="center">
      <template slot-scope="{row:{enterTime}}"><span>{{ enterTime || '--' }}</span></template>
    </el-table-column>
    <el-table-column :label="fields.mode" prop="mode" align="center">
      <template slot-scope="{row:{mode}}"><span>{{ mode || '--' }}</span></template>
    </el-table-column>
    <el-table-column :label="fields.outCompany" prop="outCompany" align="center" width="180">
      <template slot-scope="{row:{outCompany_keyword}}"><span v-html="outCompany_keyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.invoice" prop="invoice" align="center">
      <template slot-scope="{row:{invoice}}"><span>{{ invoice || '--' }}</span></template>
    </el-table-column>
    <el-table-column :label="fields.transferAmount" prop="transferAmount" align="center">
      <template slot-scope="{row:{transferAmount}}"><span>{{ transferAmount || 0 }}</span></template>
    </el-table-column>
  </el-table>
</template>

<script>
import Data_fields from '../../modules/data_fields'
import MethodsMixin from '@/components/Mixins/MethodsMixin'

export default {
  name: 'StatsListTable',
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
      fields: Data_fields
    }
  },
  methods: {
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
