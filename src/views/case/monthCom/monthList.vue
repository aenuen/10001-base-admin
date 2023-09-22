<!--
 * @Author: abbott
 * @Date: 2022-11-04 17:23:47
 * @LastEditors: abbott
 * @LastEditTime: 2022-11-10 16:13:39
 * @Description:
-->
<template>
  <el-table :key="1" :loading="tableLoading" :data="tableData" border fit highlight-current-row show-summary :summary-method="(p) => summaryMethod(p, ['price', 'enterPrice'])" style="width: 100%">
    <template slot="empty">
      <el-empty :image-size="100" description="没有此类案件" />
    </template>
    <el-table-column :label="fields.id" type="index" align="center" width="80" />
    <el-table-column :label="fields.createDate" align="center">
      <template slot-scope="{ row: { createTimestamp } }">
        <span>{{ createTimestamp | dateFilter }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.caseUseName" align="center" width="200">
      <template slot-scope="{ row: { caseYear, caseName, caseNumber } }">
        <span>{{ `(${caseYear})${caseName}字${caseNumber}号` }}</span>
      </template>
    </el-table-column>
    <el-table-column label="合同客户" align="center" :width="350">
      <template slot-scope="{ row: { client } }">
        <span v-html="client" />
      </template>
    </el-table-column>
    <el-table-column prop="price" :label="fields.price" align="center">
      <template slot-scope="{ row: { price } }">
        <span>{{ price }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="enterPrice" :label="fields.enterPrice" align="center">
      <template slot-scope="{ row: { enterPrice } }">
        <span>{{ enterPrice || 0 }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.inNumber" align="center">
      <template slot-scope="{ row: { inNumber } }">
        <span>{{ inNumber || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.enterDate" align="center">
      <template slot-scope="{ row: { enterDate } }">
        <span>{{ enterDate || '--' }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// api
// components
// data
import { fields } from '../modules/fields'
// filter
import { dateFilter } from '@/libs/filter'
// function
// mixin
// plugins
import { summaryMethod } from 'abbott-methods/import'
// settings
export default {
  name: 'ListTable',
  filters: {
    dateFilter
  },
  props: {
    tableLoading: Boolean,
    tableData: { type: Array, default: () => [] }
  },
  data() {
    return {
      fields,
      summaryMethod
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
