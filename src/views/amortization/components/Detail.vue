<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="company" :label="fields.company" :label-width="labelWidth">
            <el-select v-model="postForm.company" :placeholder="fields.company" clearable>
              <el-option v-for="(value,index) in companyArray" :key="index" :value="value" :label="value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="original" :label="fields.original" :label-width="labelWidth">
            <el-input v-model="postForm.original" :placeholder="fields.original" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="tempYearMonth" :label="fields.tempYearMonth" :label-width="labelWidth">
            <el-input v-model="postForm.tempYearMonth" :placeholder="fields.tempYearMonth" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="startDate" :label="fields.startDate" :label-width="labelWidth">
            <el-date-picker
              v-model="postForm.startDate"
              type="date"
              class="filter-item"
              :placeholder="fields.startDate"
              value-format="yyyy-MM-dd"
              :clearable="false"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="months" :label="fields.months" :label-width="labelWidth">
            <el-input v-model="postForm.months" :placeholder="fields.months" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="department" :label="fields.department" :label-width="labelWidth">
            <el-select v-model="postForm.department" :placeholder="fields.department" clearable>
              <el-option v-for="(value,index) in departmentArray" :key="index" :value="value" :label="value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div :style="{'padding-left':labelWidth}">
      <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitCreate">{{ submitText }}</el-button>
    </div>
  </div>
</template>

<script>
import { pmValidate, pmControlInput, pmHold } from 'plugins-methods'
import { fields, companyArray, departmentArray } from './config'
import { amortizationCreate, amortizationData, amortizationEdit } from '@/api/amortization'

export default {
  name: 'ViewsAmortizationComponentsDetail', /* 组件名称 */
  props: { /* 定义传值 */
    isEdit: { type: Boolean, default: false }
  },
  data() { /* 定义数据 */
    return {
      fields,
      companyArray,
      departmentArray,
      postForm: {},
      rulesForm: {
        company: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.company, '选择') }],
        name: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.name) }],
        original: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.original) }],
        startDate: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.startDate, '选择') }],
        months: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.months) }],
        department: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.department, '选择') }]
      },
      labelWidth: '120px',
      pickerOptions: {
        disabledDate: (time) => time.getTime() < new Date('2010-01-01').getTime() || time.getTime() > new Date().getTime()
      },
      submitLoading: false,
      submitText: '提交录入',
      editId: 0
    }
  },
  watch: { /* 监控值变换 */
    'postForm.original': function(value) {
      this.postForm.original = pmControlInput.controlInputPrice(value)
    },
    'postForm.months': function(value) {
      this.postForm.months = pmHold.holdNumber(value)
    },
    'postForm.tempYearMonth': function(value) {
      const temp = value.replace(/[.|/]/g, '-')
      const ary = temp.split('-')
      this.postForm.startDate = `${ary[0]}-${ary[1].padStart(2, '0')}-${ary[2].padStart(2, '0')}`
    }
  },
  created() { /* 创建后运行 */
    const editId = +this.$route.params.id
    if (this.isEdit && editId > 0) {
      this.editId = editId
      this.submitText = '编辑资产'
      this.getDate()
    }
  },
  methods: { /* 函数及方法 */
    submitCreate() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.isEdit) {
              amortizationEdit(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.submitLoading = false
                this.$refs.postForm.resetFields()
                this.$router.go(-1)
              }).catch(() => {
                this.submitLoading = false
              })
            } else {
              amortizationCreate(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.submitLoading = false
                this.$refs.postForm.resetFields()
                this.$store.dispatch('tagsView/delView', this.$route)
                this.$router.push({ path: '/amortization/list' })
              }).catch(() => {
                this.submitLoading = false
              })
            }
          } else {
            const msg = pmValidate.validateErrMsg(fields)
            this.$message.error(msg)
            this.submitLoading = false
          }
        })
      }
    },
    getDate() {
      amortizationData({ id: this.editId }).then(res => {
        const { data, msg } = res
        this.$message.success(msg)
        this.postForm = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
