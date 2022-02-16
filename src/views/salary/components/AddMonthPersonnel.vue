<template>
  <div class="filter-container">
    <div>
      <el-transfer v-model="selected" :data="listData" :titles="['公司人员','月表人员']" />
    </div>
    <div style="text-align: center">
      <el-button type="primary" :disabled="oldValue.length===selected.length" @click="addMonthPersonnel">增加新增的人员</el-button>
    </div>
  </div>
</template>

<script>
import { salaryAllList, salaryAddMonthPersonnel } from '@/api/salary'

export default {
  name: 'ViewsSalaryComponentsAddMonthPens', /* 组件名称 */
  props: { /* 定义传值 */
    monthData: {
      type: Array,
      default() {
        return []
      }
    },
    company: {
      type: String,
      default: ''
    },
    yearMonth: {
      type: String,
      default: ''
    }
  },
  data() { /* 定义数据 */
    return {
      listData: [],
      selected: [],
      oldValue: []
    }
  },
  mounted() { /* 渲染后运行 */
    this.parseData()
  },
  methods: { /* 函数及方法 */
    parseData() {
      salaryAllList({ company: this.company }).then(res => {
        const { data } = res
        const selected = []
        this.monthData.forEach(item => selected.push(item.sid))
        const listData = []
        data.forEach(item => listData.push({ key: item.id, label: item.name, disabled: selected.includes(item.id) }))
        this.listData = listData
        this.selected = selected
        this.oldValue = selected
      })
    },
    addMonthPersonnel() {
      const addNumber = []
      this.selected.forEach(item => this.oldValue.includes(item) || addNumber.push(item))
      if (addNumber.length > 0) {
        salaryAddMonthPersonnel(
          { company: this.company, yearMonth: this.yearMonth, addNumber }
        ).then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.$emit('addMonthPersonnelSuccess')
        })
      } else {
        this.$message.error('请选择要增加的人员')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
