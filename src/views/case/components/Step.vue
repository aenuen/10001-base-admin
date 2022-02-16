<template>
  <el-steps :active="active">
    <el-step title="基本资料" icon="el-icon-edit" />
    <el-step title="上传附件" icon="el-icon-upload" />
    <el-step title="提交审批" icon="el-icon-check" />
  </el-steps>
</template>

<script>
export default {
  name: 'ViewsCaseComponentsStep',
  props: {
    step: { type: Number, default: 0 }
  },
  data() {
    return {
      active: 0
    }
  },
  watch: {
    step: {
      handler(value) {
        this.active = value
      }, deep: true
    }
  }
}
</script>

<style scoped>

</style>
