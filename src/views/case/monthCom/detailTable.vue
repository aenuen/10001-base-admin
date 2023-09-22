<template>
  <el-table :key="1" :data="data" border fit highlight-current-row style="width: 100%">
    <el-table-column prop="oneName" label="名称" align="right" width="150" />
    <el-table-column prop="oneValue" label="数值" align="center" width="150" />
    <el-table-column label="详情">
      <template slot-scope="{ row: { oneDetail } }">
        <span style="color: #999">{{ oneDetail }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="twoName" label="名称" align="right" width="150" />
    <el-table-column prop="twoValue" label="数值" align="center" width="150" />
    <el-table-column label="详情">
      <template slot-scope="{ row: { twoDetail } }">
        <span style="color: #999">{{ twoDetail }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="threeName" label="名称" align="right" width="150" />
    <el-table-column prop="threeValue" label="数值" align="center" width="150" />
    <el-table-column label="详情">
      <template slot-scope="{ row: { threeDetail } }">
        <span style="color: #999">{{ threeDetail }}</span>
      </template>
    </el-table-column>
  </el-table>
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
  components: {},
  props: {
    data: { type: Array, default: () => [] }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped></style>
