<template>
  <div style="width: 100%;margin:10px 0;overflow: hidden;font-size: 14px;line-height: 30px;color: #999;font-family:Helvetica,sans-serif;">
    <em style="display: block;font-style:normal;float: left;width: 50%;">编制单位：{{ company }}</em>
    <em style="display: block;font-style:normal;float: left;width: 50%;">所属月份：{{ yearMonth }}</em>
  </div>
</template>
<script>
export default {
  name: 'ViewsSalaryComponentsIntro',
  props: { // 定义传值
    company: { type: String, default: '' },
    yearMonth: { type: String, default: '' }
  }
}
</script>

<style scoped lang="scss">
</style>
