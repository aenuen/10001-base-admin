<template>
  <div class="wrap">
    <div>{{ tabName }}</div>
    <div class="btn">
      <el-button class="el-icon-printer" @click="printTable(tabCode, tabName, printCss)">打印{{ tabName }}</el-button>
    </div>
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
  name: 'SalaryComponentsHeaderTeam', // 头部项目组按钮(打印)
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
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 40px 0 20px;
  line-height: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  position: relative;
  .btn {
    position: absolute;
    top: 32px;
    right: 0;
  }
}
</style>
