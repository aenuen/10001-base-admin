<template>
  <div style="position:relative;height:50px;">
    <h3 style="margin-top:50px;text-align: center">{{ tableText }}</h3>
    <div style="position:absolute;top:0;right:0;">
      <el-button class="el-icon-printer" @click="printContent">打印{{ tableText }}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViewSalaryComponentsTitle',
  props: { // 定义传值
    tableText: { type: String, default: '' }
  },
  methods: { // 方法函数
    printContent() {
      this.$emit('printContent')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
