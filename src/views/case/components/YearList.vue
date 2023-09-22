<!--
 * @Author: abbott
 * @Date: 2022-11-01 11:10:55
 * @LastEditors: abbott
 * @LastEditTime: 2023-03-07 11:03:32
 * @Description:
-->
<template>
  <el-table :key="1" :loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
    <el-table-column :label="fields.id" type="index" align="center" width="80" />
    <el-table-column :label="fields.createDate" align="center">
      <template slot-scope="{ row: { createTimestamp } }">
        <span>{{ createTimestamp | dateFilter }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.caseName" align="center">
      <template slot-scope="{ row: { caseName } }">
        <span>{{ caseName }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.caseNumber" align="center">
      <template slot-scope="{ row: { caseNumber } }">
        <span>{{ caseNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.why" align="center">
      <template slot-scope="{ row: { why } }">
        <span>{{ why }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.client" align="center">
      <template slot-scope="{ row: { client } }">
        <span v-html="client" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.oppositeLitigant" align="center">
      <template slot-scope="{ row: { oppositeLitigant } }">
        <span v-html="oppositeLitigant" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.department" align="center">
      <template slot-scope="{ row: { department } }">
        <span v-html="department" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.createRealName" align="center">
      <template slot-scope="{ row: { createRealName } }">
        <span v-html="createRealName" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.inNumber" align="center">
      <template slot-scope="{ row: { inNumber } }">
        <span>{{ inNumber }}</span>
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
import noneImage from '@/assets/image/noneImage.png'
// filter
import { dateFilter } from '@/libs/filter'
// function
// mixin
// plugins
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
