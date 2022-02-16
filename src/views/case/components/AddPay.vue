<template>
  <el-form ref="postForm" :model="postForm" :rules="ruleForm">
    <el-row>
      <el-col :span="8">
        <el-form-item prop="membered" :label="fields.membered" :label-width="labelWidth">
          <el-input v-model="membered" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item prop="addMember" :label="fields.addMember" :label-width="labelWidth">
          <el-input v-model="postForm.addMember" :placeholder="fields.addMember" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item prop="payed" :label="fields.payed" :label-width="labelWidth">
          <el-input v-model="payed" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item prop="addPay" :label="fields.addPay" :label-width="labelWidth">
          <el-input v-model="postForm.addPay" :placeholder="fields.addPay" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item prop="nowSalary" :label="fields.nowSalary" :label-width="labelWidth">
          <el-input v-model="salary" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item prop="addSalary" :label="fields.addSalary" :label-width="labelWidth">
          <el-input v-model="postForm.addSalary" :placeholder="fields.addSalary" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item prop="nowUncleared" :label="fields.nowUncleared" :label-width="labelWidth">
          <el-input v-model="uncleared" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item prop="addUncleared" :label="fields.addUncleared" :label-width="labelWidth">
          <el-input v-model="postForm.addUncleared" :placeholder="fields.addUncleared" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item :label-width="labelWidth">
          <el-button :loading="submitLoading" :disabled="submitLoading" type="primary" @click="submit">提交增加</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { pmControlInput, pmValidate } from 'plugins-methods'
import { fields } from './config'
import { caseAddPay } from '@/api/case'

export default {
  name: 'ViewsCaseComponentsAddPay', /* 组件名称 */
  props: { /* 定义传值 */
    payed: {
      type: Number,
      default: 0
    },
    membered: {
      type: Number,
      default: 0
    },
    salary: {
      type: Number,
      default: 0
    },
    uncleared: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    year: {
      type: Number,
      default: 0
    },
    yearMonth: {
      type: String,
      default: ''
    }
  },
  data() { /* 定义数据 */
    return {
      fields,
      labelWidth: '120px',
      postForm: {
        addPay: 0,
        addMember: 0,
        addSalary: 0,
        addUncleared: 0
      },
      ruleForm: {},
      submitLoading: false
    }
  },
  watch: {
    'postForm.addPay': function(value) {
      this.postForm.addPay = pmControlInput.controlInputPrice(value, 2)
    },
    'postForm.addMember': function(value) {
      this.postForm.addMember = pmControlInput.controlInputPrice(value, 2)
    },
    'postForm.addSalary': function(value) {
      this.postForm.addSalary = pmControlInput.controlInputPrice(value, 2)
    },
    'postForm.addUncleared': function(value) {
      this.postForm.addUncleared = pmControlInput.controlInputPrice(value, 2)
    }
  },
  methods: { /* 函数及方法 */
    submit() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            const info = { name: this.name, year: this.year, yearMonth: this.yearMonth }
            const data = { ...this.postForm, ...info }
            caseAddPay(data).then(() => {
              this.$message.success('增加成功')
              this.$emit('onAddSuccess')
            }).catch(() => {
              this.$message.error('增加失败')
              this.submitLoading = false
            })
          } else {
            const message = pmValidate.validateErrMsg(fields)
            this.$message.error(message)
            this.submitLoading = false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
