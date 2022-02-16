<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row v-if="!isBatch">
        <el-col :span="8"><!-- 所属公司 -->
          <el-form-item prop="company" :label="fields.company" :label-width="labelWidth">
            <el-select v-model="postForm.company" clearable :placeholder="fields.company" style="width: 100%">
              <el-option v-for="item in companyObject" :key="item['key']" :label="item['label']" :value="item['value']" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="!isBatch" :span="8"><!--姓名-->
          <el-form-item prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 养老保险个人 -->
          <el-form-item prop="myPension" :label="`${fields.myPension}${fields.personal}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.myPension"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,myPensionObject)"
              :placeholder="`${fields.myPension}${fields.personal}`"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 养老保险单位 -->
          <el-form-item prop="myPension" :label="`${fields.myPension}${fields.unit}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unPension"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,unPensionObject)"
              :placeholder="`${fields.myPension}${fields.unit}`"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="!isBatch" :span="8"><!-- 部门 -->
          <el-form-item prop="department" :label="fields.department" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.department"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,departmentObject)"
              :placeholder="fields.department"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 失业保险个人 -->
          <el-form-item prop="myUnemployment" :label="`${fields.myUnemployment}${fields.personal}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.myUnemployment"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,myUnemploymentObject)"
              :placeholder="`${fields.myUnemployment}${fields.personal}`"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 失业保险单位 -->
          <el-form-item prop="unUnemployment" :label="`${fields.unUnemployment}${fields.unit}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unUnemployment"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,unUnemploymentObject)"
              :placeholder="`${fields.unUnemployment}${fields.personal}`"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="!isBatch" :span="8"><!-- 项目组 -->
          <el-form-item prop="team" :label="fields.team" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.team"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,teamObject)"
              :placeholder="fields.team"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 医疗保险个人 -->
          <el-form-item prop="myMedicalCare" :label="`${fields.myMedicalCare}${fields.personal}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.myMedicalCare"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,myMedicalCareObject)"
              :placeholder="`${fields.myMedicalCare}${fields.personal}`"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 医疗保险单位 -->
          <el-form-item prop="unMedicalCare" :label="`${fields.unMedicalCare}${fields.unit}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unMedicalCare"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,unMedicalCareObject)"
              :placeholder="`${fields.unMedicalCare}${fields.unit}`"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="!isBatch" :span="8"><!--基本工资-->
          <el-form-item prop="basePay" :label="fields.basePay" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.basePay"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,basePayObject)"
              :placeholder="fields.basePay"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 生育保险单位 -->
          <el-form-item prop="unBirth" :label="`${fields.unBirth}${fields.unit}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unBirth"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,unBirthObject)"
              :placeholder="`${fields.unBirth}${fields.unit}`"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 工伤保险单位 -->
          <el-form-item prop="unInjury" :label="`${fields.unInjury}${fields.unit}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unInjury"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,unInjuryObject)"
              :placeholder="`${fields.unInjury}${fields.unit}`"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="!isBatch" :span="8"><!--绩效工资-->
          <el-form-item prop="meritPay" :label="fields.meritPay" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.meritPay"
              class="el-input"
              :fetch-suggestions="(q,c) => autoQuery(q,c,meritPayObject)"
              :placeholder="fields.meritPay"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 考核 -->
          <el-form-item prop="assessment" :label="fields.assessment" :label-width="labelWidth">
            <el-input v-model="postForm.assessment" :placeholder="fields.assessment" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="isBatch?12:8"><!-- 补贴 -->
          <el-form-item>
            <el-form-item prop="subsidy" :label="fields.subsidy" :label-width="labelWidth">
              <el-input v-model="postForm.subsidy" :placeholder="fields.subsidy" :disabled="true" />
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div :style="{'margin-left':labelWidth}">
      <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="handleSubmit">{{ submitText }}</el-button>
    </div>
  </div>
</template>

<script>
import DetailMixin from '@/components/Mixins/DetailMixin'
import { autoQuery, pmControlInput, pmValidate } from 'plugins-methods'
import { fields, myMedicalCareLinkage } from '../components/config'
import { companyObject, departmentObject, teamObject, basePayObject, meritPayObject } from '../components/config'
import { unPensionObject, myUnemploymentObject } from '../components/config'
import { myPensionObject, unUnemploymentObject } from '../components/config'
import { myMedicalCareObject, unMedicalCareObject } from '../components/config'
import { unBirthObject, unInjuryObject } from '../components/config'
export default {
  name: 'MonthBatchUpdate',
  mixins: [DetailMixin],
  props: {
    isEdit: Boolean,
    isBatch: Boolean,
    isMonth: Boolean,
    updateData: { type: Array, default: () => [] }
  },
  data() {
    return {
      rulesForm: {
        company: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.company) }],
        name: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.name) }]
      },
      fields,
      companyObject,
      departmentObject,
      teamObject,
      basePayObject,
      meritPayObject,
      myPensionObject,
      unPensionObject,
      myUnemploymentObject,
      unUnemploymentObject,
      myMedicalCareObject,
      unMedicalCareObject,
      unBirthObject,
      unInjuryObject
    }
  },
  computed: {
    submitText() {
      return this.isBatch ? '批量编辑' : this.isEdit ? '编辑' : '录入'
    }
  },
  watch: {
    'postForm.basePay': function(value) { // 基本工资
      this.postForm.basePay = pmControlInput.controlInputPrice(value)
    },
    'postForm.meritPay': function(value) { // 绩效工资
      this.postForm.meritPay = pmControlInput.controlInputPrice(value)
    },
    'postForm.myPension': function(value) { // 养老保险个人
      this.postForm.myPension = pmControlInput.controlInputPrice(value)
      this.postForm.unPension = this.postForm.myPension * 2
    },
    'postForm.myUnemployment': function(value) { // 失业保险个人
      this.postForm.myUnemployment = pmControlInput.controlInputPrice(value)
      this.postForm.unUnemployment = this.postForm.myUnemployment
    },
    'postForm.myMedicalCare': function(value) { // 医疗保险个人
      this.postForm.myMedicalCare = pmControlInput.controlInputPrice(value)
      this.myMedicalCareAction(this.postForm.myMedicalCare)
    },
    'postForm.unPension': function(value) { // 养老保险单位
      this.postForm.unPension = pmControlInput.controlInputPrice(value)
    },
    'postForm.unUnemployment': function(value) { // 失业保险单位
      this.postForm.unUnemployment = pmControlInput.controlInputPrice(value)
    },
    'postForm.unMedicalCare': function(value) { // 医疗保险单位
      this.postForm.unMedicalCare = pmControlInput.controlInputPrice(value)
    },
    'postForm.unInjury': function(value) { // 工伤保险单位
      this.postForm.unInjury = pmControlInput.controlInputPrice(value)
    },
    'postForm.unBirth': function(value) { // 生育保险单位
      this.postForm.unBirth = pmControlInput.controlInputPrice(value)
    }
  },
  methods: {
    handleSubmit() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.isBatch) {
              this.submitBatch()
            } else if (this.isEdit) {
              this.submitEdit()
            } else {
              this.submitCreate()
            }
          } else {
            const msg = pmValidate.validateErrMsg(fields)
            this.$message.error(msg)
            this.submitLoading = true
          }
        })
      }
    },
    submitBatch() {},
    submitEdit() {},
    submitCreate() {},
    autoQuery(q, c, a) {
      autoQuery(q, c, a)
    },
    myMedicalCareAction(value) {
      if (+value === 0) {
        this.postForm.unMedicalCare = `${myMedicalCareLinkage[0][0]}`
        this.postForm.unBirth = `${myMedicalCareLinkage[0][1]}`
      } else if (value % 69.77 === 0) {
        const multiple = this.postForm.myMedicalCare / 69.77
        this.postForm.unMedicalCare = `${myMedicalCareLinkage[1][0] * multiple}`
        this.postForm.unBirth = `${myMedicalCareLinkage[1][1] * multiple}`
      } else if (value % 70 === 0) {
        const multiple = this.postForm.myMedicalCare / 70
        this.postForm.unMedicalCare = `${myMedicalCareLinkage[2][0] * multiple}`
        this.postForm.unBirth = `${myMedicalCareLinkage[2][1] * multiple}`
      } else if (value % 73.52 === 0) {
        const multiple = this.postForm.myMedicalCare / 73.52
        this.postForm.unMedicalCare = `${myMedicalCareLinkage[3][0] * multiple}`
        this.postForm.unBirth = `${myMedicalCareLinkage[3][1] * multiple}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
