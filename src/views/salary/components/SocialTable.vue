<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <div style="width: 100%;overflow: hidden;margin-bottom: 20px;">
      <el-button style="float:right;" class="el-icon-printer" @click="printContent">打印社保医保单位分配表</el-button>
    </div>
    <div id="printSocialTable">
      <div style="width: 100%;margin:10px 0;overflow: hidden;font-size: 14px;line-height: 30px;color: #999;font-family:Helvetica,sans-serif;">
        <em style="display: block;font-style:normal;float: left;width: 50%;">编制单位:{{ theCompany }}</em>
        <em style="display: block;font-style:normal;float: left;width: 50%;">所属期:{{ theYearMonth }}</em>
      </div>
      <el-table
        :key="listKey"
        :data="list"
        show-summary
        border
        fit
        highlight-current-row
        style="width: 100%"
        @row-dblclick="editRow"
      >
        <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
        <el-table-column prop="name" :label="`${fields['name']}`" align="center" />
        <el-table-column :label="`${fields['department']}`" align="center">
          <template slot-scope="{row:{department}}"><span>{{ department }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['team']}`" align="center">
          <template slot-scope="{row:{team}}"><span>{{ team }}</span></template>
        </el-table-column>
        <el-table-column label="分配情况" align="center">
          <el-table-column :label="`${fields['unPension']}`" align="center">
            <el-table-column prop="unPension" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unUnemployment']}`" align="center">
            <el-table-column prop="unUnemployment" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unInjury']}`" align="center">
            <el-table-column prop="unInjury" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unMedicalCare']}`" align="center">
            <el-table-column prop="unMedicalCare" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unBirth']}`" align="center">
            <el-table-column prop="unBirth" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
        </el-table-column>
        <el-table-column prop="subtotal05" :label="`${fields['subtotal']}`" align="center" />
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
  name: 'ViewsSalaryComponentsSocialTable', /* 社保医保单位分配表 */
  props: { /* 定义传值 */
    monthData: { type: Array, default: () => [] },
    nowCompany: { type: String, default: '' },
    nowYearMonth: { type: String, default: '' },
    showDelete: Boolean
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      listKey: 1,
      list: [],
      theCompany: '尚德',
      theYearMonth: ''
    }
  },
  watch: { /* 监控值变换 */
    monthData(value) {
      this.list = value
    },
    nowCompany(value) {
      this.theCompany = value
    },
    nowYearMonth(value) {
      this.theYearMonth = value
    }
  },
  methods: { /* 函数及方法 */
    onDeleteMonthRow(id) {
      this.$emit('onDeleteMonthRow', id)
    },
    editRow(row) {
      this.$emit('onEditMonth', row.id)
    },
    printContent() {
      print({
        printable: 'printSocialTable',
        type: 'html',
        header: '社保医保单位分配表',
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th{border-collapse:collapse;padding:15px;border:1px #000 solid;text-align:center}'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
