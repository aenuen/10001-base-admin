<template>
  <div>
    <product-info :info-id="addNumberId" style="margin-bottom:30px" @onProductInfoSuccess="onProductInfoSuccess" @onProductInfoError="onProductInfoError" />
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="number" :label="`${fields['number']}`" :label-width="labelWidth">
            <el-input v-model="postForm.number" :placeholder="fields['number']" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="amount" :label="`${fields['amount']}`" :label-width="labelWidth">
            <el-input v-model="postForm.amount" :placeholder="fields['amount']" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="`${fields['price']}`" :label-width="labelWidth">
            <el-input v-model="price" :placeholder="fields['price']" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="unit" :label="`${fields['unit']}`" :label-width="labelWidth">
            <el-input v-model="postForm.unit" :placeholder="fields['unit']" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bill" :label="`${fields['bill']}`" :label-width="labelWidth">
            <el-input v-model="postForm.bill" :placeholder="fields['bill']" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <div :style="{'margin-left':labelWidth}">
        <el-button v-loading="submitLoading" :disabled="submitLoading" type="primary" class="el-icon-plus" @click="submitAddNumber">{{ submitText }}</el-button>
      </div>
    </el-form>
    <product-history :search-id="addNumberId" style="margin-top:30px" />
  </div>
</template>
<script>
import { pmControlInput, pmValidate } from 'plugins-methods'
import { fields } from './config'
import ProductInfo from './ProductInfo'
import ProductHistory from './ProductHistory'
import { reserveAddNumber } from '@/api/reserve'

export default {
  name: 'ViewsReserveComponentsAdd',
  components: { // 引用组件
    ProductInfo,
    ProductHistory
  },
  props: { // 定义传值
    addNumberId: {
      type: Number,
      default: 0
    }
  },
  data() { // 定义数据
    return {
      fields: fields,
      oldForm: {},
      postForm: {},
      rulesForm: {
        number: [{ validator: (rule, value, callback) => pmValidate.validatePrice(rule, value, callback, fields['number']) }],
        amount: [{ validator: (rule, value, callback) => pmValidate.validatePrice(rule, value, callback, fields['amount']) }],
        unit: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['unit']) }],
        bill: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['bill']) }]
      },
      labelWidth: '120px',
      submitLoading: false,
      submitText: '增加数量'
    }
  },
  computed: { // 监控自定义的变量
    price() {
      return this.postForm.amount && this.postForm.number ? (this.postForm.amount / this.postForm.number).toFixed(2) : 0
    }
  },
  watch: { // 监控值变换
    addNumberId: {
      handler(value) {
        this.addNumberId = value
      },
      immediate: true
    },
    'postForm.number': function(value) {
      this.postForm.number = pmControlInput.controlInputPrice(value)
    },
    'postForm.amount': function(value) {
      this.postForm.amount = pmControlInput.controlInputPrice(value)
    }
  },
  methods: { // 方法函数
    onProductInfoSuccess(data) {
      this.oldForm = data
    },
    onProductInfoError() {
      this.$emit('onAddNumberError')
    },
    submitAddNumber() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (+this.price !== +this.oldForm.price) {
              this.$message.error('新产品的单价与该产品的单价不一致')
              this.submitLoading = false
            } else {
              const newForm = Object.assign(this.oldForm, this.postForm)
              reserveAddNumber(newForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.$refs.postForm.resetFields()
                this.submitLoading = false
                this.$emit('onAddNumberSuccess')
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
    }
  }
}
</script>

<style scoped lang="scss">
</style>
