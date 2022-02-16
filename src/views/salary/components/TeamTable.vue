<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <div style="position:relative;height:50px;">
      <h3 style="margin-top:50px;text-align: center">{{ tableText }}</h3>
      <div style="position:absolute;top:0;right:0;">
        <el-button class="el-icon-printer" @click="printContent">打印{{ tableText }}</el-button>
      </div>
    </div>
    <div id="printTeamTable">
      <div style="width: 100%;margin:10px 0;overflow: hidden;font-size: 14px;line-height: 30px;color: #999;font-family:Helvetica,sans-serif;">
        <em style="display: block;font-style:normal;float: left;width: 50%;">编制单位:{{ nowCompany }}</em>
        <em style="display: block;font-style:normal;float: left;width: 50%;">所属期:{{ nowYearMonth }}</em>
      </div>
      <el-table :key="teamKey" :data="teamData" border fit show-summary highlight-current-row style="width: 100%">
        <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
        <el-table-column prop="team" :label="`${fields['team']}`" align="center" />
        <el-table-column prop="number" label="人数" align="center" />
        <el-table-column prop="unPension" :label="`${fields['unPension']}${fields['unit']}`" align="center" />
        <el-table-column prop="unUnemployment" :label="`${fields['unUnemployment']}${fields['unit']}`" align="center" />
        <el-table-column prop="unInjury" :label="`${fields['unInjury']}${fields['unit']}`" align="center" />
        <el-table-column prop="unMedicalCare" :label="`${fields['unMedicalCare']}${fields['unit']}`" align="center" />
        <el-table-column prop="unBirth" :label="`${fields['unBirth']}${fields['unit']}`" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import print from 'print-js'
import { fields } from './config'

export default {
  name: 'ViewsSalaryComponentsTeamTable', /* 社保医保项目组统计表 */
  props: { /* 定义传值 */
    teamData: { type: Array, default: () => [] },
    nowCompany: { type: String, default: '' },
    nowYearMonth: { type: String, default: '' }
  },
  data() { /* 定义数据 */
    return {
      tableText: '社保医保项目组统计表',
      fields: fields,
      teamKey: 1,
      team: [],
      theCompany: '尚德',
      theYearMonth: ''
    }
  },
  methods: { /* 函数及方法 */
    printContent() {
      print({
        printable: 'printTeamTable',
        type: 'html',
        header: this.tableText,
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
