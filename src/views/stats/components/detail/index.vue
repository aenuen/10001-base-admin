<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col :span="18">
          <el-form-item prop="yearMonth" :label="fields.yearMonth" :label-width="labelWidth">
            <el-date-picker v-model="postForm.yearMonth" type="month" value-format="yyyy-MM" :placeholder="`请选择${fields.yearMonth}`" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="client" :label="fields.client" :label-width="labelWidth">
            <el-autocomplete v-model="postForm.client" :fetch-suggestions="clientSearch" :placeholder="fields.client" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="product" :label="fields.product" :label-width="labelWidth">
            <el-input v-model="postForm.product" :placeholder="fields.product" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="company" :label="fields.company" :label-width="labelWidth">
            <el-autocomplete v-model="postForm.company" :fetch-suggestions="companySearch" :placeholder="fields.company" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="project" :label="fields.project" :label-width="labelWidth">
            <el-input v-model="postForm.project" :placeholder="fields.project" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="amount" :label="fields.amount" :label-width="labelWidth">
            <el-input v-model="postForm.amount" :placeholder="fields.amount" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="enterAmount" :label="fields.enterAmount" :label-width="labelWidth">
            <el-input v-model="postForm.enterAmount" :placeholder="fields.enterAmount" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="enterTime" :label="fields.enterTime" :label-width="labelWidth">
            <el-date-picker v-model="postForm.enterTime" type="date" value-format="yyyy-MM-dd" :placeholder="`选择${fields.enterTime}`" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="mode" :label="fields.mode" :label-width="labelWidth">
            <el-select v-model="postForm.mode" :placeholder="fields.mode" clearable>
              <el-option v-for="(item,index) in modeAry" :key="index" :label="item.value" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="postForm.mode==='外包'">
        <el-row>
          <el-col :span="18">
            <el-form-item prop="outCompany" :label="fields.outCompany" :label-width="labelWidth">
              <el-autocomplete v-model="postForm.outCompany" :fetch-suggestions="outCompanySearch" :placeholder="fields.outCompany" clearable style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item prop="transferAmount" :label="fields.transferAmount" :label-width="labelWidth">
              <el-input v-model="postForm.transferAmount" :placeholder="fields.transferAmount" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
    <div :style="{'padding-left':labelWidth}">
      <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="createExpress">{{ isEdit ? '产品编辑' : '产品创建' }}</el-button>
    </div>
  </div>
</template>

<script>
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import Data_fields from '../../modules/data_fields'
import Data_modeAry from '../../modules/data_modeAry'
import Data_ruleForm from '../../modules/data_ruleForm'
import { pmControlInput, pmValidate } from 'plugins-methods'
import { statsCompany, statsCreate, statsDetail, statsUpdate } from '@/api/stats'

export default {
  name: 'StatsDetail',
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isEdit: { type: Boolean, default: false }
  },
  data() {
    return {
      fields: Data_fields,
      modeAry: Data_modeAry,
      postForm: {
        amount: 0,
        enterAmount: 0,
        transferAmount: 0
      },
      ruleForm: Data_ruleForm,
      clientAry: [],
      companyAry: [],
      outCompanyAry: []
    }
  },
  watch: {
    'postForm.amount': function(value) {
      this.postForm.amount = pmControlInput.controlInputPrice(value, 2)
    },
    'postForm.enterAmount': function(value) {
      this.postForm.enterAmount = pmControlInput.controlInputPrice(value, 2)
    },
    'postForm.transferAmount': function(value) {
      this.postForm.transferAmount = pmControlInput.controlInputPrice(value, 2)
    }
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    createExpress() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.isEdit) {
              statsUpdate(this.postForm).then(({ code, msg }) => {
                if (code === 0) {
                  this.$message.success(msg)
                  this.routerGo('/stats/list')
                } else {
                  this.$message.success(msg)
                  this.submitLoading = false
                }
              })
            } else {
              statsCreate(this.postForm).then(({ code, msg }) => {
                if (code === 0) {
                  this.$message.success(msg)
                  this.routerGo('/stats/list')
                } else {
                  this.$message.success(msg)
                  this.submitLoading = false
                }
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
    getDetail() {
      statsDetail({ id: this.updateId }).then(({ code, data }) => {
        if (code === 0) {
          this.postForm = { ...data }
        } else {
          this.$message.error('获取信息失败，无法编辑')
          this.$router.go(-1)
        }
      })
    },
    clientSearch(queryString, cb) {
      const restaurants = this.clientAry
      cb(queryString ? restaurants.filter(state => state.value.toUpperCase().match(queryString.toUpperCase())) : restaurants)
    },
    companySearch(queryString, cb) {
      const restaurants = this.companyAry
      cb(queryString ? restaurants.filter(state => state.value.toUpperCase().match(queryString.toUpperCase())) : restaurants)
    },
    outCompanySearch(queryString, cb) {
      const restaurants = this.outCompanyAry
      cb(queryString ? restaurants.filter(state => state.value.toUpperCase().match(queryString.toUpperCase())) : restaurants)
    },
    getCompany() {
      statsCompany().then(({ code, data }) => {
        if (code === 0) {
          const { clientAry, companyAry, outCompanyAry } = data
          this.clientAry = clientAry
          this.companyAry = companyAry
          this.outCompanyAry = outCompanyAry
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
