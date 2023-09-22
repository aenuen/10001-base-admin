<template>
  <el-table :key="1" :loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%" :default-sort="tableSort" @sort-change="onSortChange">
    <el-table-column :label="fields.id" prop="id" align="center" width="80" sortable="custom" />
    <el-table-column :label="fields.createDate" align="center" width="95">
      <template slot-scope="{ row: { createTimestamp } }">
        <span>{{ createTimestamp | dateFilter }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.work" align="center" width="270">
      <template slot-scope="{ row: { id, caseName, caseNumber } }">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="$router.push({ path: `update/${id}` })" />
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="onRemoveAlone(id)" />
        <el-button type="success" icon="el-icon-view" size="mini" @click="$router.push({ path: `view/${id}` })" />
        <el-button size="mini" @click="onManager(id, caseName, caseNumber)">发票管理</el-button>
      </template>
    </el-table-column>
    <el-table-column :label="fields.delivery" align="center">
      <template slot-scope="{ row: { id, delivery } }">
        <i v-if="+delivery === 1" class="el-icon-circle-check" style="color: green; font-size: 20px" />
        <el-button v-else size="mini" @click="onSureDelivery(id)">确认</el-button>
      </template>
    </el-table-column>
    <el-table-column :label="fields.invoiceDate" align="center" width="95">
      <template slot-scope="{ row: { invoiceDate, price } }">
        <span v-if="+price === 0">--</span>
        <span v-else>{{ invoiceDate || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.enterDate" align="center" width="95">
      <template slot-scope="{ row: { enterDate } }">
        <span>{{ enterDate || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.createRealName" align="center">
      <template slot-scope="{ row: { createRealName_key } }">
        <span v-html="createRealName_key" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.caseName" align="center">
      <template slot-scope="{ row: { caseName_key, id } }">
        <span v-if="+isUse[id] === 1" v-html="caseName_key" />
        <del v-else style="color: #c00" v-html="caseName_key" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.caseNumber" align="center">
      <template slot-scope="{ row: { caseNumber, id } }">
        <span v-if="+isUse[id] === 1" v-html="caseNumber" />
        <del v-else style="color: #c00" v-html="caseNumber" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.type" align="center">
      <template slot-scope="{ row: { type_key } }">
        <span v-html="type_key" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.client" align="center" :width="280">
      <template slot-scope="{ row: { client_key } }">
        <span v-html="client_key" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.price" align="center">
      <template slot-scope="{ row: { price } }">
        <span>{{ price }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.enterPrice" align="center">
      <template slot-scope="{ row: { enterPrice } }">
        <span>{{ enterPrice }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.isUse" align="center">
      <template slot-scope="{ row: { id } }">
        <el-switch v-model="isUse[id]" active-color="#13ce66" inactive-color="#ff4949" @change="onIsUseChange($event, id)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// api
// components
// data
import { fields } from '../modules/fields'
import noneImage from '@/assets/image/noneImage.png'
// filter
import { dateFilter } from '@/libs/filter'
// function
// mixin
import TableMixin from '@/components/Mixins/TableMixin'
// plugins
// settings
export default {
  name: 'ListTable',
  filters: {
    dateFilter
  },
  mixins: [TableMixin],
  props: {
    tableLoading: Boolean,
    tableSort: { type: Object, default: () => {} },
    tableData: { type: Array, default: () => [] },
    isUse: { type: Array, default: () => [] }
  },
  data() {
    return {
      fields,
      noneImage
    }
  },
  methods: {
    // 确定原件已收到
    onSureDelivery(id) {
      this.$confirm('请确认原件已收到了吗？', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('onSureDelivery', id)
        })
        .catch(() => {
          this.$message.info('取消确认原件已收到')
        })
    },
    onManager(id, caseName, caseNumber) {
      this.$emit('onManager', id, caseName, caseNumber)
    }
  }
}
</script>
