<template>
  <el-table :key="1" :data="tableData" show-summary border fit highlight-current-row @selection-change="onSelectorChange" @row-dblclick="onDblclickAlone">
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
    <el-table-column prop="name" :label="fields.name" align="center" style="min-width: 200px" />
    <el-table-column prop="department" :label="fields.department" align="center" />
    <el-table-column prop="team" :label="fields.team" align="center" />
    <el-table-column label="应发工资" align="center">
      <el-table-column prop="basePay" :label="fields.basePay" align="center" />
      <el-table-column prop="meritPay" :label="fields.meritPay" align="center" />
      <el-table-column prop="payTotal" :label="fields.subtotal" align="center" />
    </el-table-column>
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
  name: 'SalaryComponentsMonthWages',
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
