<template>
  <div>
    <div style="text-align: right;padding:20px 0">
      <el-button class="el-icon-printer" @click="printContent">打印{{ tableName }}</el-button>
    </div>
    <div :id="printId">
      <el-table
        :key="tableKey"
        :data="tableData"
        border
        fit
        highlight-current-row
        show-summary
        style="width: 100%"
      >
        <el-table-column :label="`${fields['id']}`" prop="sid" align="center" width="80" />
        <el-table-column :label="`${fields['company']}`" prop="company" align="center" width="80" />
        <el-table-column :label="`${fields['area']}`" align="center">
          <template slot-scope="{row:{area}}">{{ area || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['name']}`" align="center">
          <template slot-scope="{row:{name}}">{{ name || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['type']}`" align="center">
          <template slot-scope="{row:{type}}">{{ type || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['unit']}`" align="center" width="200">
          <template slot-scope="{row:{unit}}">{{ unit || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['bill']}`" align="center" width="200">
          <template slot-scope="{row:{bill}}">{{ bill || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['balanceNumber']}`" align="center">
          <template slot-scope="{row:{number}}">{{ number || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['balanceAmount']}`" prop="subtotal" align="center" />
      </el-table>
    </div>
  </div>
</template>
<script>
import { fields } from './config'
import print from 'print-js'

export default {
  name: 'ViewsReserveComponentsMonthChangeTable',
  components: { /* 引用组件 */
  },
  filters: { // 过滤器
  },
  directives: { // 自定义指令
  },
  props: { // 定义传值
    balanceData: {
      type: Array,
      default() {
        return []
      }
    },
    yearMonth: {
      type: String,
      default: ''
    }
  },
  data() { // 定义数据
    return {
      fields: fields,
      tableKey: 1,
      tableData: [],
      printId: 'printReserveMonthBalanceTable'
    }
  },
  computed: { // 计算属性
    tableName() {
      return `${this.yearMonth}库存余额表`
    }
  },
  watch: { // 监控值变换
    balanceData: {
      handler(value, oldVal) {
        if (value !== oldVal) {
          this.parseData(value)
        }
      },
      deep: true,
      immediate: true
    },
    yearMonth: {
      handler(value, oldVal) {
        this.yearMonth = value
      },
      immediate: true
    }
  },
  mounted() { // 渲染后运行
  },
  created() { // 渲染时运行
    console.log(new Date('2020-01-01').getTime())
  },
  methods: { // 方法函数
    parseData(value) {
      value.forEach(item => {
        item.subtotal = (item.number / item.totalNumber * item.totalAmount).toFixed(2)
      })
      this.tableData = value
    },
    printContent() {
      print({
        printable: this.printId,
        type: 'html',
        header: this.tableName,
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th{border-collapse:collapse;padding:5px;border:1px #000 solid;text-align:center}'
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
