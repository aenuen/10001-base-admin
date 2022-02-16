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
        style="width: 100%"
      >
        <el-table-column :label="`${fields['id']}`" prop="sid" align="center" width="80" />
        <el-table-column :label="`${fields['createTimestamp']}`" align="center">
          <template slot-scope="{row:{createTimestamp}}">{{ createTimestamp|timeDataFilter }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['action']}`" align="center">
          <template slot-scope="{row:{action}}">
            <el-tag v-if="action==='n'" type="success">产品入库</el-tag>
            <el-tag v-else-if="action==='+'">增加数量</el-tag>
            <el-tag v-else-if="action==='-'" type="danger">产品出库</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="`${fields['company']}`" prop="company" align="center" width="80" />
        <el-table-column :label="`${fields['area']}`" prop="area" align="center" />
        <el-table-column :label="`${fields['name']}`" prop="name" align="center" />
        <el-table-column :label="`${fields['type']}`" align="center">
          <template slot-scope="{row:{type}}">{{ type || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['number']}`" prop="number" align="center" />
        <el-table-column :label="`${fields['allUnit']}`" align="center" width="200">
          <template slot-scope="{row:{unit}}">{{ unit || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['bill']}`" align="center" width="200">
          <template slot-scope="{row:{bill}}">{{ bill || '--' }}</template>
        </el-table-column>
        <el-table-column :label="`${fields['price']}`" prop="price" align="center" />
      </el-table>
    </div>
  </div>
</template>
<script>
import { pmTime } from 'plugins-methods'
import { fields } from './config'
import print from 'print-js'

export default {
  name: 'ViewsReserveComponentsMonthChangeTable',
  components: { /* 引用组件 */
  },
  filters: { // 过滤器
    timeDataFilter(value) {
      return pmTime.timeFormat(value, pmTime.H_DATE)
    }
  },
  directives: { // 自定义指令
  },
  props: { // 定义传值
    changeData: {
      type: Array,
      default() {
        return {}
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
      printId: 'printReserveMonthChangeTable'
    }
  },
  computed: { // 计算属性
    tableName() {
      return `${this.yearMonth}库存动态变`
    }
  },
  watch: { // 监控值变换
    changeData: {
      handler(value, oldVal) {
        if (value !== oldVal) {
          this.tableData = value
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
  },
  methods: { // 方法函数
    printContent() {
      print({
        printable: this.printId,
        type: 'html',
        header: this.tableName,
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th{border-collapse:collapse;padding:15px;border:1px #000 solid;text-align:center}'
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
