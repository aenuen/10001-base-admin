<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <div style="width: 100%;overflow: hidden;margin-bottom: 20px;">
      <el-button style="float:right;" class="el-icon-printer" @click="printContent">打印{{ tableText }}
      </el-button>
    </div>
    <div id="printWagesTable">
      <div style="width: 100%;margin:10px 0;overflow: hidden;font-size: 14px;line-height: 30px;color: #999;font-family:Helvetica,sans-serif;">
        <em style="display: block;font-style:normal;float: left;width: 50%;">编制单位:{{ theCompany }}</em>
        <em style="display: block;font-style:normal;float: left;width: 50%;">所属期:{{ theYearMonth }}</em>
      </div>
      <el-table :key="key" :data="list" show-summary border fit highlight-current-row style="width: 100%" @row-dblclick="editRow">
        <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
        <el-table-column prop="name" :label="`${fields['name']}`" align="center" />
        <el-table-column :label="`${fields['department']}`" align="center">
          <template slot-scope="{row:{department}}"><span>{{ department }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['team']}`" align="center">
          <template slot-scope="{row:{team}}"><span>{{ team }}</span></template>
        </el-table-column>
        <el-table-column label="应发工资" align="center">
          <el-table-column prop="basePay" :label="`${fields['basePay']}`" align="center" />
          <el-table-column prop="meritPay" :label="`${fields['meritPay']}`" align="center" />
          <el-table-column prop="subtotal01" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column v-if="showDelete" :label="fields.work" align="center">
          <template slot-scope="{row:{id}}">
            <el-button type="danger" size="mini" class="el-icon-delete" @click="onDeleteMonthRow(id)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import print from 'print-js'
import { fields } from './config'

export default {
  name: 'ViewsSalaryComponentsWagesTable', /* 工资计提表 */
  props: { /* 定义传值 */
    monthData: { type: Array, default: () => [] },
    nowCompany: { type: String, default: '' },
    nowYearMonth: { type: String, default: '' },
    showDelete: Boolean
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      key: 1,
      list: [],
      theCompany: '尚德',
      theYearMonth: '',
      tableText: '工资计提表'
    }
  },
  watch: { /* 监控值变换 */
    'monthData': function(value) {
      this.list = value
    },
    'nowCompany': function(value) {
      this.theCompany = value
    },
    'nowYearMonth': function(value) {
      this.theYearMonth = value
    }
  },
  methods: { /* 函数及方法 */
    printContent() {
      print({
        printable: 'printWagesTable',
        type: 'html',
        header: `${this.tableText}`,
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th{border-collapse:collapse;padding:15px;border:1px #000 solid;text-align:center}'
      })
    },
    onDeleteMonthRow(id) {
      this.$emit('onDeleteMonthRow', id)
    },
    editRow(row) {
      this.$emit('onEditMonth', row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
