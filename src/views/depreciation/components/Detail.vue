<template>
  <div class="app-container">
    <div class="filter-container">
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
            <el-form-item prop="tempYearMonth" :label="fields.tempYearMonth" :label-width="labelWidth">
              <el-input v-model="postForm.tempYearMonth" :placeholder="fields.tempYearMonth" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="yearMonth" :label="fields.yearMonth" :label-width="labelWidth">
              <el-date-picker
                v-model="postForm.yearMonth"
                type="month"
                class="filter-item"
                placeholder="请选择年月"
                value-format="yyyy-MM"
                :clearable="false"
                :picker-options="pickerOptions"
              />
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
            <el-form-item prop="rate" :label="fields.rate" :label-width="labelWidth">
              <el-select v-model="postForm.rate" :placeholder="fields.rate" clearable>
                <el-option v-for="(value,index) in rateArray" :key="index" :value="value" :label="value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="remarks" :label="fields.remarks" :label-width="labelWidth">
              <el-select v-model="postForm.remarks" :placeholder="fields.remarks" clearable>
                <el-option v-for="(value,index) in remarksArray" :key="index" :value="value" :label="value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div :style="{'padding-left':labelWidth}">
        <el-button
          v-loading="submitLoading"
          type="primary"
          :disabled="submitLoading"
          @click="submitCreate"
        >
          {{ submitText }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { pmValidate, pmControlInput } from 'plugins-methods'
import { fields, companyArray, rateArray, remarksArray } from './config'
import { depreciationCreate, depreciationData, depreciationEdit } from '@/api/depreciation'

export default {
  name: 'Detail', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      companyArray: companyArray,
      rateArray: rateArray,
      remarksArray: remarksArray,
      labelWidth: '120px',
      postForm: { company: '陆鲁' },
      rulesForm: {
        company: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.company, '选择') }],
        name: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.name) }],
        yearMonth: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.yearMonth, '选择') }],
        original: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.original) }],
        rate: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.rate, '选择') }],
        remarks: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.remarks, '选择') }]
      },
      pickerOptions: {
        disabledDate: (time) => time.getTime() < new Date('2010-01-01').getTime() || time.getTime() > new Date().getTime()
      },
      submitLoading: false,
      submitText: '提交录入',
      editId: 0
    }
  },
  computed: { /* 计算属性 */ },
  watch: { /* 监控值变换 */
    'postForm.original': function(value) {
      this.postForm.original = pmControlInput.controlInputPrice(value)
    },
    'postForm.tempYearMonth': function(value) {
      const temp = value.replace(/[.|/]/g, '-')
      const ary = temp.split('-')
      this.postForm.yearMonth = `${ary[0]}-${ary[1].padStart(2, '0')}`
    }
  },
  mounted() { /* 渲染后运行 */
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
              depreciationEdit(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.submitLoading = false
                this.$refs.postForm.resetFields()
                this.$store.dispatch('tagsView/delView', this.$route)
                this.$router.go(-1)
              }).catch(() => {
                this.submitLoading = false
              })
            } else {
              depreciationCreate(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.submitLoading = false
                this.$refs.postForm.resetFields()
                this.$store.dispatch('tagsView/delView', this.$route)
                this.$router.push({ path: '/depreciation/list' })
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
      depreciationData({ id: this.editId }).then(res => {
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
