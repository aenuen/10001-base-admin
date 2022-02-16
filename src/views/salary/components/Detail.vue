<template>
  <div style="width: 1000px;padding:50px">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="8"><!--所属公司-->
          <el-form-item prop="company" :label="`${fields['company']}`" :label-width="labelWidth">
            <el-select v-model="postForm.company" clearable :placeholder="`${fields['company']}`">
              <el-option v-for="item in companyObject" :key="item['key']" :label="item['label']" :value="item['value']" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><!--姓名-->
          <el-form-item prop="name" :label="`${fields['name']}`" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="`${fields['name']}`" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--养老保险个人-->
          <el-form-item prop="myPension" :label="`${fields['myPension']}${fields['personal']}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.myPension"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['myPension']}${fields['personal']}`"
              clearable
              @focus="attr=myPensionObject"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--养老保险单位-->
          <el-form-item prop="unPension" :label="`${fields['unPension']}${fields['unit']}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unPension"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['unPension']}${fields['unit']}`"
              clearable
              @focus="attr=unPensionObject"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><!--部门-->
          <el-form-item prop="department" :label="`${fields['department']}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.department"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['department']}`"
              clearable
              @focus="attr=departmentObject"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--失业保险个人-->
          <el-form-item
            prop="myUnemployment"
            :label="`${fields.myUnemployment+fields.personal}`"
            :label-width="labelWidth"
          >
            <el-autocomplete
              v-model="postForm.myUnemployment"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['myUnemployment']}${fields['personal']}`"
              clearable
              @focus="attr=myUnemploymentObject"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--失业保险单位-->
          <el-form-item prop="unUnemployment" :label="`${fields.unUnemployment+fields.unit}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unUnemployment"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['unUnemployment']}${fields['unit']}`"
              clearable
              @focus="attr=unUnemploymentObject"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><!--项目组-->
          <el-form-item prop="team" :label="`${fields['team']}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.team"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['team']}`"
              clearable
              @focus="attr=teamObject"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--医疗保险个人-->
          <el-form-item
            prop="myMedicalCare"
            :label="`${fields.myMedicalCare+fields.personal}`"
            :label-width="labelWidth"
          >
            <el-autocomplete
              v-model="postForm.myMedicalCare"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['myMedicalCare']}${fields['personal']}`"
              clearable
              @focus="attr=myMedicalCareObject"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--医疗保险单位-->
          <el-form-item prop="unMedicalCare" :label="`${fields.unMedicalCare+fields.unit}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unMedicalCare"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['unMedicalCare']}${fields['unit']}`"
              clearable
              @focus="attr=unMedicalCareObject"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><!--基本工资-->
          <el-form-item prop="basePay" :label="`${fields['basePay']}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.basePay"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['basePay']}`"
              clearable
              @focus="attr=basePayObject"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--考核-->
          <el-form-item prop="assessment" :label="`${fields['assessment']}`" :label-width="labelWidth">
            <el-input v-model="postForm.assessment" :placeholder="`${fields['assessment']}`" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--生育保险单位-->
          <el-form-item prop="unBirth" :label="`${fields['unBirth']}${fields['unit']}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unBirth"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['unBirth']}${fields['unit']}`"
              clearable
              @focus="attr=unBirthObject"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><!--绩效工资-->
          <el-form-item prop="meritPay" :label="`${fields['meritPay']}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.meritPay"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['meritPay']}`"
              clearable
              @focus="attr=meritPayObject"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--补贴-->
          <el-form-item>
            <el-form-item prop="subsidy" :label="`${fields['subsidy']}`" :label-width="labelWidth">
              <el-input v-model="postForm.subsidy" :placeholder="`${fields['subsidy']}`" :disabled="true" />
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8"><!--工伤保险单位-->
          <el-form-item prop="unInjury" :label="`${fields['unInjury']}${fields['unit']}`" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.unInjury"
              class="el-input"
              :fetch-suggestions="querySearchAsync"
              :placeholder="`${fields['unInjury']}${fields['unit']}`"
              clearable
              @focus="attr=unInjuryObject"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button
              v-loading="submitLoading"
              type="primary"
              :disabled="submitLoading"
              @click="submitData"
            >
              {{ submitText }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { pmValidate, pmControlInput } from 'plugins-methods'
import { fields, companyObject, departmentObject, teamObject, basePayObject, meritPayObject, myPensionObject, myUnemploymentObject, myMedicalCareObject, myMedicalCareLinkage, unPensionObject, unUnemploymentObject, unInjuryObject, unMedicalCareObject, unBirthObject } from './config'
import { salaryInsert, salaryData, salaryUpdate, salaryMonthData, salaryMonthUpdate } from '@/api/salary'

export default {
  name: 'ViewsSalaryComponentsDetail', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */
    editData: {
      type: Number,
      default: 0
    },
    isMonth: {
      type: Boolean,
      default: false
    }
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      companyObject,
      departmentObject,
      teamObject,
      basePayObject,
      meritPayObject,
      myPensionObject,
      myUnemploymentObject,
      myMedicalCareObject,
      myMedicalCareLinkage,
      unPensionObject,
      unUnemploymentObject,
      unMedicalCareObject,
      unInjuryObject,
      unBirthObject,
      postForm: {},
      rulesForm: {
        company: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.company) }],
        name: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.name) }]
      },
      labelWidth: '120px',
      attr: [],
      submitLoading: false,
      submitText: '人员录入',
      isEdit: false,
      paramsId: '',
      editMonth: false,
      actionNumber: ''
    }
  },
  computed: { /* 计算属性 */ },
  watch: { /* 监控值变换 */
    isMonth: {
      handler(value) {
        this.editMonth = value
      },
      immediate: true
    },
    editData: {
      handler(newValue) {
        this.actionNumber = newValue
        this.getData()
      },
      immediate: true
    },
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
  mounted() { /* 渲染后运行 */
    const getId = this.$route.params.id
    getId > 0 && (this.paramsId = getId)
    this.actionNumber = this.paramsId || this.editData
    this.actionNumber > 0 && (this.isEdit = true)
  },
  created() { /* 创建后运行 */
  },
  methods: { /* 函数及方法 */
    getData() {
      if (this.editMonth && this.actionNumber > 0) {
        salaryMonthData(this.actionNumber).then(res => {
          const { data } = res
          this.postForm = data
          this.submitText = '月表人员编辑'
          this.isEdit = true
        })
      } else if (!this.editMonth && this.actionNumber > 0) {
        salaryData(this.actionNumber).then(res => {
          const { data } = res
          this.postForm = data
          this.submitText = '人员编辑'
          this.isEdit = true
        })
      }
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
    },
    querySearchAsync(queryString, cb) {
      const restaurants = this.attr
      cb(queryString ? restaurants.filter(state => state.value.toUpperCase().match(queryString.toUpperCase())) : restaurants)
    },
    submitData() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.isEdit) {
              if (this.editMonth) {
                salaryMonthUpdate(this.postForm).then(data => {
                  const { msg } = data
                  this.$notify({ title: `编辑信息`, message: msg, type: 'success', duration: 2000 })
                  this.submitLoading = false
                  this.$emit('onSuccessMonthUpdate')
                }).catch(() => {
                  this.submitLoading = false
                })
              } else {
                salaryUpdate(this.postForm).then(data => {
                  const { msg } = data
                  this.$notify({ title: `编辑信息`, message: msg, type: 'success', duration: 2000 })
                  this.submitLoading = false
                  if (this.editId > 0) {
                    this.$store.dispatch('tagsView/delView', this.$route)
                    this.$router.go(-1)
                  } else {
                    this.$emit('onUpdateSuccess')
                  }
                }).catch(() => {
                  this.submitLoading = false
                })
              }
            } else {
              salaryInsert(this.postForm).then(data => {
                const { msg } = data
                this.$notify({ title: `入录信息`, message: msg, type: 'success', duration: 2000 })
                this.$store.dispatch('tagsView/delView', this.$route)
                const params = { company: this.postForm.company }
                this.$router.push({ path: '/salary/list', query: params })
                this.submitLoading = false
              }).catch(() => {
                this.submitLoading = false
              })
            }
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
