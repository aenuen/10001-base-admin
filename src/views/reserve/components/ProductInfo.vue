<template>
  <div>
    <h3>产品信息</h3>
    <el-table
      :key="tableKey"
      v-loading="tableLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="`${fields['id']}`" prop="id" align="center" width="80" />
      <el-table-column :label="`${fields['company']}`" prop="company" align="center" width="80" />
      <el-table-column :label="`${fields['area']}`" prop="area" align="center" />
      <el-table-column :label="`${fields['name']}`" prop="name" align="center" />
      <el-table-column :label="`${fields['type']}`" align="center">
        <template slot-scope="{row:{type}}"><span>{{ type || '--' }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['price']}`" prop="price" align="center" />
      <el-table-column :label="`${fields['number']}`" prop="number" align="center" />
      <el-table-column :label="`${fields['amount']}`" prop="amount" align="center" />
      <el-table-column :label="`${fields['unit']}`" align="center">
        <template slot-scope="{row:{unit}}"><span>{{ unit || '--' }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['bill']}`" align="center">
        <template slot-scope="{row:{bill}}"><span>{{ bill || '--' }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['totalNumber']}`" prop="totalNumber" align="center" />
      <el-table-column :label="`${fields['totalAmount']}`" prop="totalAmount" align="center" />
    </el-table>
  </div>
</template>
<script>
import { fields } from './config'
import { reserveData } from '@/api/reserve'

export default {
  name: 'ViewsReserveComponentsProductInfo',
  components: { // 引用组件
  },
  filters: { // 过滤器
  },
  directives: { // 自定义指令
  },
  props: { // 定义传值
    infoId: {
      type: Number,
      default: 0
    }
  },
  data() { // 定义数据
    return {
      fields: fields,
      tableData: [],
      tableKey: 1,
      tableLoading: true
    }
  },
  computed: { // 监控自定义的变量
  },
  watch: { // 监控值变换
    infoId: {
      handler(value, oldVal) {
        this.infoId = value
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
      reserveData({ id: this.infoId }).then(res => {
        const { data } = res
        this.tableData = [data]
        this.tableLoading = false
        this.$emit('onProductInfoSuccess', data)
      }).catch(() => {
        this.$emit('onProductInfoError')
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
