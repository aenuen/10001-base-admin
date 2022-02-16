<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="caseName" :label="`${fields['caseName']}`" :label-width="labelWidth">
            <el-input v-model="postForm.caseName" :placeholder="`${fields['caseName']}`" :disabled="true" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="caseNumber" :label="`${fields['caseNumber']}`" :label-width="labelWidth">
            <el-input v-model="postForm.caseNumber" :placeholder="`${fields['caseNumber']}`" :disabled="true" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inType" :label="`${fields['inType']}`" :label-width="labelWidth">
            <el-radio-group v-model="postForm.inType">
              <el-radio label="普通发票" border>普通发票</el-radio>
              <el-radio label="专用发票" border>专用发票</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inNumber" :label="`${fields['inNumber']}`" :label-width="labelWidth">
            <el-input v-model="postForm.inNumber" :placeholder="`${fields['inNumber']}`" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inNot" :label="`${fields['inNot']}`" :label-width="labelWidth">
            <el-input v-model="postForm.inNot" :placeholder="`${fields['inNot']}`" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inRate" :label="`${fields['inRate']}`" :label-width="labelWidth">
            <el-input v-model="postForm.inRate" :placeholder="`${fields['inRate']}`" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inHave" :label="`${fields['inHave']}`" :label-width="labelWidth">
            <el-input v-model="postForm.inHave" :placeholder="`${fields['inHave']}`" :disabled="true" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="invoiceDate" :label="`${fields['invoiceDate']}`" :label-width="labelWidth">
            <el-date-picker
              v-model="postForm.invoiceDate"
              type="date"
              :placeholder="`${fields['invoiceDate']}`"
              value-format="yyyy-MM-dd"
              :clearable="false"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitInsert">填写发票</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="display: none">{{ caseId }}{{ caseName }}{{ caseNumber }}</div>
  </div>
</template>

<script>
import { pmControlInput, pmHold, pmValidate, pmTime } from 'plugins-methods'
import { chain } from 'mathjs'
import { fields } from './config'
import { caseInvoice } from '@/api/case'

export default { // 发票统计
  name: 'ViewsCaseComponentsInvoice',
  props: {
    inParams: { type: Object, default: () => {} }
  },
  data() {
    return {
      fields: fields,
      postForm: { inType: '普通发票' },
      caseId: 0,
      caseName: '',
      caseNumber: '',
      rulesForm: {
        inNumber: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['inNumber']) }],
        inHave: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['inHave']) }],
        inRate: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['inRate']) }],
        inNot: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['inNot']) }],
        invoiceDate: [{ validator: (rule, value, callback) => pmValidate.validateDate(rule, value, callback, fields['invoiceDate']) }]
      },
      labelWidth: '80px',
      submitLoading: false,
      startTimestamp: 0,
      pickerOptions: {
        disabledDate: (time) => time.getTime() <= new Date(this.startTimestamp).getTime() || time.getTime() >= new Date().getTime()
      }
    }
  },
  watch: {
    inParams: {
      handler(value) {
        this.caseId = value.id
        this.caseName = value.caseName
        this.caseNumber = value.caseNumber
        this.startTimestamp = pmTime.timeFormat(value['createTimestamp'] - 60 * 60 * 24 * 1000, pmTime.H_DATE)
      },
      deep: true,
      immediate: true
    },
    caseId: {
      handler(value) {
        this.postForm.id = value
      },
      immediate: true
    },
    caseName: {
      handler(value) {
        this.postForm.caseName = value
      },
      immediate: true
    },
    caseNumber: {
      handler(value) {
        this.postForm.caseNumber = value
      },
      immediate: true
    },
    'postForm.inNumber': function(value) {
      this.postForm.inNumber = pmHold.holdNumber(value)
    },
    'postForm.inNot': function(value) {
      this.postForm.inNot = pmControlInput.controlInputPrice(value)
      this.calcInHave()
    },
    'postForm.inRate': function(value) {
      this.postForm.inRate = pmControlInput.controlInputPrice(value)
      this.calcInHave()
    }
  },
  methods: {
    calcInHave() {
      const inNot = this.postForm.inNot ? +this.postForm.inNot : 0
      const inRate = this.postForm.inRate ? +this.postForm.inRate : 0
      const { value: inHave } = chain(inNot).add(inRate)
      this.postForm.inHave = inHave.toFixed(2)
    },
    submitInsert() {
      if (!this.submitLoading) {
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            this.$confirm('请确认发票消息，提交后将无法恢复，是否继续', '提示', { type: 'warning' }).then(() => {
              caseInvoice(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.resetToDefault()
                this.$emit('onInvoiceSuccess')
              })
            }).catch(() => {
              this.submitLoading = false
            })
          } else {
            const message = pmValidate.validateErrMsg(fields)
            this.$message.error(message)
            this.submitLoading = false
          }
        })
      }
    },
    // 重置到最初
    resetToDefault() {
      this.$refs.postForm.resetFields()
      this.submitLoading = false
    }
  }
}
</script>

<style scoped>

</style>
