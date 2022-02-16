<template>
  <el-table
    v-if="data.length > 0"
    :key="1"
    :data="data"
    border
    fit
    show-summary
    highlight-current-row
    style="width: 100%;margin-top:20px"
  >
    <el-table-column label="编号" type="index" align="center" width="80" />
    <el-table-column label="姓名" prop="name" align="center" />
    <el-table-column label="所属年月" prop="yearMonth" align="center" width="120" />
    <el-table-column label="个人会员费" prop="member" align="center" />
    <el-table-column label="律所已支付" prop="pay" align="center" />
    <el-table-column label="工资" prop="salary" align="center" />
    <el-table-column label="未结清" prop="uncleared" align="center" />
  </el-table>
</template>

<script>
export default {
  name: 'OtherInfo',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
