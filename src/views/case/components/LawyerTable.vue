<!--suppress HtmlDeprecatedAttribute -->
<template>
  <el-table
    v-if="data.length > 0"
    :key="1"
    :data="data"
    border
    fit
    show-summary
    highlight-current-row
    style="width: 100%"
  >
    <el-table-column label="编号" type="index" align="center" width="80" />
    <el-table-column :label="`${fields['createTime']}`" align="center" width="120">
      <template slot-scope="{ row: { createTimestamp } }">
        <span>{{ createTimestamp | timeFormatDate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="案号" align="center">
      <template slot-scope="{ row: { caseYear, caseName, caseNumber } }">
        <span>{{ `(${caseYear})${caseName}字${caseNumber}号` }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="client" label="客户" align="center" width="300">
      <template slot-scope="{ row: { client } }"><span>{{ client }}</span></template>
    </el-table-column>
    <el-table-column prop="price" label="金额" align="center" />
    <el-table-column prop="enterPrice" label="进账总额" align="center" />
    <el-table-column label="进账日期" align="center">
      <template slot-scope="{ row: { enterDate } }">{{ enterDate || '未进账' }}</template>
    </el-table-column>
    <el-table-column label="发票号" align="center">
      <template slot-scope="{ row: { inNumber } }">{{ inNumber || '未开发票' }}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fields } from './config'
import { pmTime } from 'plugins-methods'

export default {
  name: 'ViewsCaseComponentsLawyerTable' /* 律师统计-案件列表 */,
  filters: {
    timeFormatDate(value) {
      return pmTime.timeFormat(value, pmTime.H_DATE)
    }
  },
  props: {
    data: { type: Array, default: () => [] }
  },
  data() {
    return {
      fields
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
