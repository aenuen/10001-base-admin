<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <title-bar :table-text="tableText" @printContent="printContent" />
    <div id="printTeamWages">
      <intro :company="nowCompany" :year-month="nowYearMonth" />
      <el-table :key="teamKey" :data="teamData" border fit show-summary highlight-current-row style="width: 100%">
        <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
        <el-table-column prop="team" :label="`${fields['team']}`" align="center" />
        <el-table-column prop="number" label="人数" align="center" />
        <el-table-column prop="basePay" :label="`${fields['basePay']}`" align="center" />
        <el-table-column prop="meritPay" :label="`${fields['meritPay']}`" align="center" />
        <el-table-column prop="subtotal01" label="小计" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import print from 'print-js'
import { fields } from './config'
import TitleBar from './TitleBar'
import Intro from './Intro'

export default {
  name: 'ViewsSalaryComponentsTeamWages', /* 工资计提项目组统计表 */
  components: { /* 应用组件 */
    TitleBar, Intro
  },
  props: { /* 定义传值 */
    teamData: { type: Array, default: () => [] },
    nowCompany: { type: String, default: '' },
    nowYearMonth: { type: String, default: '' }
  },
  data() { /* 定义数据 */
    return {
      tableText: '工资计提项目组统计表',
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
        printable: 'printTeamWages',
        type: 'html',
        header: this.tableText,
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table td,table th {border-collapse:collapse;padding:15px;border:1px #000 solid;text-align:center}'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
