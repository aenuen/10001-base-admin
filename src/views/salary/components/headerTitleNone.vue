<template>
  <div class="tableHeader">
    <div>编制单位：{{ company }}</div>
    <div>所属年月：{{ yearMonth }}</div>
    <div />
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
import { dateMonthNext } from 'abbott-methods/import'
// settings
export default {
  name: 'SalaryComponentsHeaderTitleNone', // 头部标题(非发放表)
  components: {},
  props: {
    company: { type: String, default: '' },
    yearMonth: { type: String, default: '' }
  },
  data() {
    return {}
  },
  computed: {
    nextYearMonth() {
      return dateMonthNext(this.yearMonth + '-01') + '-15'
    }
  }
}
</script>
<style lang="scss" scoped>
.tableHeader {
  padding: 20px 0;
  line-height: 20px;
  font-size: 14px;
  color: #aaa;
  display: flex;
}
.tableHeader div {
  flex: 1;
  text-align: center;
}
</style>
