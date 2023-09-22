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
    <el-table-column prop="name" :label="fields.name" align="center" />
    <el-table-column :label="fields.department" align="center">
      <template slot-scope="{ row: { department } }">
        <span>{{ department }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="fields.team" align="center">
      <template slot-scope="{ row: { team } }">
        <span>{{ team }}</span>
      </template>
    </el-table-column>
    <el-table-column label="分配情况" align="center">
      <el-table-column :label="fields.unPension" align="center">
        <el-table-column prop="unPension" :label="fields.unit" align="center" />
      </el-table-column>
      <el-table-column :label="fields.unUnemployment" align="center">
        <el-table-column prop="unUnemployment" :label="fields.unit" align="center" />
      </el-table-column>
      <el-table-column :label="fields.unMedicalCare" align="center">
        <el-table-column prop="unMedicalCare" :label="fields.unit" align="center" />
      </el-table-column>
      <el-table-column :label="fields.unAccumulationFund" align="center">
        <el-table-column prop="unAccumulationFund" :label="fields.unit" align="center" />
      </el-table-column>
      <el-table-column :label="fields.unInjury" align="center">
        <el-table-column prop="unInjury" :label="fields.unit" align="center" />
      </el-table-column>
      <el-table-column :label="fields.unBirth" align="center">
        <el-table-column prop="unBirth" :label="fields.unit" align="center" />
      </el-table-column>
    </el-table-column>
    <el-table-column prop="socialPay" :label="fields.subtotal" align="center" />
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
  name: 'SalaryComponentsMonthSocial',
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
