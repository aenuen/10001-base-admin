<template>
  <el-table :key="1" :loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%" :default-sort="tableSort" @sort-change="onSortChange" @selection-change="onSelectorChange">
    <template slot="empty">
      <el-empty :image-size="100" description="未能找到符合条件的数据" />
    </template>
    <el-table-column type="selection" width="50" align="center" />
    <el-table-column prop="id" :label="fields.id" sortable="custom" width="80" align="center" />
    <el-table-column :label="fields.work" align="center" width="120">
      <template slot-scope="{ row: { id } }">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="$router.push({ path: `update/${id}` })" />
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="onRemoveAlone(id)" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.name" prop="name" align="center">
      <template slot-scope="{ row: { name_kw } }">
        <span v-html="name_kw" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.company" prop="company" align="center">
      <template slot-scope="{ row: { company_kw } }">
        <span v-html="company_kw" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.department" prop="department" align="center">
      <template slot-scope="{ row: { department_kw } }">
        <span v-html="department_kw" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.team" prop="team" align="center">
      <template slot-scope="{ row: { team_kw } }">
        <span v-html="team_kw" />
      </template>
    </el-table-column>
    <el-table-column prop="basePay" :label="fields.basePay" align="center" />
    <el-table-column prop="meritPay" :label="fields.meritPay" align="center" />
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
// filter
// function
// mixin
import TableMixin from '@/components/Mixins/TableMixin'
// plugins
// settings
export default {
  name: 'SalaryComponentsListTable',
  components: {},
  mixins: [TableMixin],
  props: {
    tableLoading: { type: Boolean, default: () => true },
    tableSort: { type: Object, default: () => ({}) },
    tableData: { type: Array, default: () => [] },
    isUse: { type: Array, default: () => [] }
  },
  data() {
    return {
      fields
    }
  }
}
</script>
<style lang="scss" scoped></style>
