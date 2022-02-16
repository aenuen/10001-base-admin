<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <h3>产品记录</h3>
    <el-table
      :key="tableKey"
      v-loading="tableLoading"
      :data="tableData"
      border
      fit
      show-summary
      highlight-current-row
      style="width: 100%"
    >
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
      <el-table-column :label="`${fields['price']}`" prop="price" align="center" />
      <el-table-column :label="`${fields['number']}`" prop="number" align="center" />
      <el-table-column :label="`${fields['amount']}`" prop="amount" align="center" />
      <el-table-column :label="`${fields['unit']}`" align="center" width="200">
        <template slot-scope="{row:{unit}}">{{ unit || '--' }}</template>
      </el-table-column>
      <el-table-column :label="`${fields['bill']}`" align="center">
        <template slot-scope="{row:{bill}}">{{ bill || '--' }}</template>
      </el-table-column>
      <el-table-column :label="`${fields['createYearMonth']}`" prop="createYearMonth" align="center" />
    </el-table>
  </div>
</template>
<script>
import { pmTime } from 'plugins-methods'
import { fields } from './config'
import { reserveHistory } from '@/api/reserve'

export default {
  name: 'ViewsReserveComponentsProductHistory',
  components: { // 引用组件
  },
  filters: { // 过滤器
    timeDataFilter(value) {
      return pmTime.timeFormat(value, pmTime.H_DATE)
    }
  },
  directives: { // 自定义指令
  },
  props: { // 定义传值
    searchId: {
      type: Number,
      default: 0
    }
  },
  data() { // 定义数据
    return {
      fields: fields,
      tableKey: 1,
      tableData: [],
      tableLoading: true
    }
  },
  computed: { // 监控自定义的变量
  },
  watch: { // 监控值变换
    searchId: {
      handler(value, oldVal) {
        this.searchId = value
        this.getData()
      },
      immediate: true
    }
  },
  mounted() { // 渲染后运行
  },
  created() { // 渲染时运行
  },
  methods: { // 方法函数
    getData() {
      reserveHistory({ id: this.searchId }).then(res => {
        const { data } = res
        this.tableData = data
        this.tableLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
