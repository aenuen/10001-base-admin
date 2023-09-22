<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="caseName" :label="fields.caseName" :label-width="labelWidth">
            <el-input v-model="caseName" :placeholder="fields.caseName" :disabled="true" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="caseNumber" :label="fields.caseNumber" :label-width="labelWidth">
            <el-input v-model="caseNumber" :placeholder="fields.caseNumber" :disabled="true" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inType" :label="fields.inType" :label-width="labelWidth">
            <el-radio-group v-model="postForm.inType">
              <el-radio label="普通发票" border>普通发票</el-radio>
              <el-radio label="专用发票" border>专用发票</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inNumber" :label="fields.inNumber" :label-width="labelWidth">
            <el-input v-model="postForm.inNumber" :placeholder="fields.inNumber" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="inHave" :label="fields.inHave" :label-width="labelWidth">
            <el-input v-model="postForm.inHave" :placeholder="fields.inHave" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="inTax" :label="fields.inTax" :label-width="labelWidth">
            <el-input v-model="postForm.inTax" :placeholder="fields.inTax" clearable>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inRate" :label="fields.inRate" :label-width="labelWidth">
            <el-input v-model="postForm.inRate" :placeholder="fields.inRate" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="inNot" :label="fields.inNot" :label-width="labelWidth">
            <el-input v-model="postForm.inNot" :placeholder="fields.inNot" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="invoiceDate" :label="fields.invoiceDate" :label-width="labelWidth">
            <el-date-picker v-model="postForm.invoiceDate" type="date" :placeholder="fields.invoiceDate" value-format="yyyy-MM-dd" :clearable="false" />
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
  </div>
</template>
<script>
// api
import { caseApi } from '@/api/case'
// components
// data
import { fields } from '../modules/fields'
import { rulesForm } from '../modules/rulesAddInvoice'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { controlInputPrice, holdNumber } from 'abbott-methods/import'
// settings
export default {
  components: {},
  mixins: [DetailMixin],
  props: {
    caseId: { type: Number, default: 0 },
    caseName: { type: String, default: '' },
    caseNumber: { type: String, default: '' }
  },
  data() {
    return {
      fields,
      postForm: { inType: '普通发票' },
      rulesForm
    }
  },
  watch: {
    'postForm.inHave': function (val) {
      this.postForm.inHave = controlInputPrice(val)
      this.goComputed()
    },
    'postForm.inTax': function (val) {
      this.postForm.inTax = holdNumber(val)
      this.goComputed()
    }
  },
  methods: {
    // 计算税额、不含税价
    goComputed() {
      if (this.postForm.inHave && this.postForm.inTax) {
        this.postForm.id = this.caseId
        this.postForm.inRate = +(this.postForm.inHave * (this.postForm.inTax / 100)).toFixed(2)
        this.postForm.inNot = +(this.postForm.inHave - this.postForm.inRate).toFixed(2)
      }
    },
    // 提交
    submitInsert() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            caseApi
              .invoiceCreate(this.postForm)
              .then(({ code, data, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.$emit('invoiceSuccess', { ...this.postForm, ...data })
                  this.submitLoadingClose()
                }
              })
              .catch(() => {
                this.submitLoadingClose()
              })
          } else {
            this.validateErrHandle(fields)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
