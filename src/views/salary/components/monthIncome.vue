<template>
  <el-table :key="2" :data="tableData" show-summary border fit highlight-current-row @selection-change="onSelectorChange" @row-dblclick="onDblclickAlone">
    <template slot="empty">
      <el-empty :image-size="100" description="未能找到符合条件的数据" />
    </template>
    <el-table-column v-if="selectorShow" type="selection" width="65" align="center" />
    <el-table-column v-if="!removeShow" type="index" :label="fields.index" width="65" align="center" />
    <el-table-column v-if="removeShow" :label="fields.work" align="center" width="65">
      <template slot-scope="{ row: { id } }">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="onRemoveAlone(id)" />
      </template>
    </el-table-column>
    <el-table-column prop="name" :label="fields.name" align="center" />
    <el-table-column prop="income" label="收入" align="center" />
    <el-table-column prop="myPension" :label="`${fields.myPension}${fields.personal}`" align="center" />
    <el-table-column prop="myUnemployment" :label="`${fields.myUnemployment}${fields.personal}`" align="center" />
    <el-table-column prop="myMedicalCare" :label="`${fields.myMedicalCare}${fields.personal}`" align="center" />
    <el-table-column prop="myAccumulationFund" :label="`${fields.myAccumulationFund}${fields.personal}`" align="center" />
  </el-table>
</template>
<script>
// api
// components
// data
import { fields } from '../modules/fields'
// filter
// function
// mixin
import TableMixin from '@/components/Mixins/TableMixin'
// plugins
// settings
export default {
  name: 'SalaryComponentsMonthIncome',
  components: {},
  mixins: [TableMixin],
  props: {
    tableData: { type: Array, default: () => [] },
    selectorShow: Boolean,
    removeShow: Boolean
  },
  data() {
    return {
      fields
    }
  }
}
</script>
<style lang="scss" scoped></style>
