<template>
  <div style="text-align: right">
    <el-button class="el-icon-edit" @click="onEditTax">编辑个人所得税</el-button>
    <el-button class="el-icon-printer" @click="printTable(tabCode, tabName, printCss)">打印{{ tabName }}</el-button>
  </div>
</template>
<script>
// api
// components
// data
import { printCss } from '../modules/printCss'
// filter
// function
// mixin
// plugins
import { printTable } from '@/libs/print'
// settings
export default {
  name: 'SalaryComponentsHeaderButtons', // 头部按钮(个人所得税、打印)
  components: {},
  props: {
    tabName: { type: String, default: '' },
    tabCode: { type: String, default: '' }
  },
  data() {
    return {
      printTable,
      printCss
    }
  },
  methods: {
    onEditTax() {
      this.$emit('onUpdateTax')
    }
  }
}
</script>
<style lang="scss" scoped></style>
