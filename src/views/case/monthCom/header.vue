<template>
  <div class="header">
    <div style="flex: 1">所属律师：{{ name }}</div>
    <div style="flex: 1">所属年月：{{ yearMonth }}</div>
    <div style="flex: 0 0 200px; text-align: right">{{ number }}</div>
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
// settings
export default {
  props: {
    name: { type: String, default: '' },
    year: { type: Number, default: 0 },
    yearMonth: { type: String, default: '' },
    monthNumber: { type: Number, default: 0 }
  },
  computed: {
    number() {
      return `所属期数：${this.year}年第${this.monthNumber}期`
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  padding: 10px 0;
  font-size: 14px;
  line-height: 30px;
  color: #999;
}
</style>
