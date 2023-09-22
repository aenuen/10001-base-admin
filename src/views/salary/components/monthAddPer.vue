<template>
  <div class="filter-container">
    <div>
      <el-transfer v-model="selected" :data="listData" :titles="['公司人员', '月表人员']" />
    </div>
    <div style="text-align: center; padding: 20px 0 0">
      <el-button type="primary" :disabled="oldValue.length === selected.length" @click="addPersonnel">增加新增的人员</el-button>
    </div>
  </div>
</template>

<script>
// api
import { salaryApi } from '@/api/salary'
// components
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  name: 'SalaryComponentsMonthAddPer',
  props: {
    monthData: { type: Array, default: () => [] },
    company: { type: String, default: '' },
    yearMonth: { type: String, default: '' }
  },
  data() {
    return {
      listData: [],
      selected: [],
      oldValue: []
    }
  },
  mounted() {
    this.parseData()
  },
  methods: {
    // 月表公司员工
    parseData() {
      salaryApi.monthComPer({ company: this.company }).then(({ code, data, msg }) => {
        if (code === 200) {
          const selected = []
          this.monthData.forEach((item) => selected.push(item.sid))
          this.selected = selected
          this.oldValue = selected
          const listData = []
          data.forEach((item) => listData.push({ key: item.id, label: item.name, disabled: selected.includes(item.id) }))
          this.listData = listData
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 增加月表员工
    addPersonnel() {
      const addNumber = []
      this.selected.forEach((item) => this.oldValue.includes(item) || addNumber.push(item))
      if (addNumber.length > 0) {
        salaryApi.monthAddPer({ yearMonth: this.yearMonth, addNumber }).then(({ code, msg }) => {
          if (code === 200) {
            this.$message.success(msg)
            this.$emit('onMonthAddPer')
          } else {
            this.$message.error(msg)
          }
        })
      } else {
        this.$message.error('请选择要增加的人员')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
