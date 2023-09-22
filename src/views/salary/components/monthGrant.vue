<template>
  <el-table :key="1" :data="tableData" show-summary border fit highlight-current-row style="width: 100%" @selection-change="onSelectorChange" @row-dblclick="onDblclickAlone">
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
    <el-table-column prop="department" :label="fields.department" align="center" />
    <el-table-column prop="team" :label="fields.team" align="center" />
    <el-table-column label="工资统计" align="center">
      <el-table-column prop="basePay" label="基本" align="center" />
      <el-table-column prop="meritPay" label="绩效" align="center" />
      <el-table-column prop="payTotal" :label="fields.subtotal" align="center" />
    </el-table-column>
    <el-table-column label="扣款及补贴" align="center">
      <el-table-column :label="fields.days" align="center">
        <template slot-scope="{ row: { days } }">{{ days || 0 }}</template>
      </el-table-column>
      <el-table-column :label="fields.subsidy" align="center">
        <template slot-scope="{ row: { subsidy } }">{{ subsidy || 0 }}</template>
      </el-table-column>
      <el-table-column :label="fields.deduct" align="center">
        <template slot-scope="{ row: { deduct } }">{{ deduct || 0 }}</template>
      </el-table-column>
      <el-table-column prop="SAndDTotal" :label="fields.subtotal" align="center" />
    </el-table-column>
    <el-table-column label="代扣代缴" align="center">
      <el-table-column :label="fields.myPension" align="center">
        <el-table-column prop="myPension" :label="fields.personal" align="center" />
      </el-table-column>
      <el-table-column :label="fields.myUnemployment" align="center">
        <el-table-column prop="myUnemployment" :label="fields.personal" align="center" />
      </el-table-column>
      <el-table-column :label="fields.myMedicalCare" align="center">
        <el-table-column prop="myMedicalCare" :label="fields.personal" align="center" />
      </el-table-column>
      <el-table-column :label="fields.myAccumulationFund" align="center">
        <el-table-column prop="myAccumulationFund" :label="fields.personal" align="center" />
      </el-table-column>
      <el-table-column :label="fields.myIncomeTax" align="center">
        <el-table-column prop="myIncomeTax" :label="fields.personal" align="center" />
      </el-table-column>
      <el-table-column prop="personalTotal" :label="fields.subtotal" align="center" />
    </el-table-column>
    <el-table-column prop="grantPay" label="实发工资" align="center" />
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
  name: 'SalaryComponentsMonthGrant',
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
