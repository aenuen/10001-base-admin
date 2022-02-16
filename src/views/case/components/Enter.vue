<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="caseName" :label="`${fields['caseName']}`" :label-width="labelWidth">
            <el-input v-model="postForm.caseName" :placeholder="`${fields['caseName']}`" :disabled="true" />
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
          <el-form-item prop="enterDate" :label="`${fields['enterDate']}`" :label-width="labelWidth">
            <el-date-picker
              v-model="postForm.enterDate"
              type="date"
              class="filter-item"
              :placeholder="`${fields['enterDate']}`"
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
            <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitEnter">确认入账</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="display: none">{{ caseId }}{{ caseName }}{{ caseNumber }}</div>
    </el-form>
  </div>
</template>

<script>
import { fields } from '@/views/case/components/config'
import { pmTime } from 'plugins-methods'
import { pmValidate } from 'plugins-methods'
import { caseEnter } from '@/api/case'

export default {
  name: 'ViewsCaseComponentsEnter',
  props: {
    enParams: { type: Object, default: () => {} }
  },
  data() {
    return {
      fields: fields,
      postForm: {},
      caseId: 0,
      caseName: '',
      caseNumber: '',
      rulesForm: {
        caseName: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['caseName']) }],
        caseNumber: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['caseNumber']) }],
        enterDate: [{ validator: (rule, value, callback) => pmValidate.validateDate(rule, value, callback, fields['enterDate']) }]
      },
      startTimestamp: 0,
      pickerOptions: {
        disabledDate: (time) => time.getTime() >= new Date().getTime()
      },
      labelWidth: '80px',
      submitLoading: false
    }
  },
  watch: {
    enParams: {
      handler(value) {
        this.caseId = value.id
        this.caseName = value.caseName
        this.caseNumber = value.caseNumber
        this.startTimestamp = pmTime.timeFormat(value - 60 * 60 * 24 * 1000, pmTime.H_DATE)
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
    }
  },
  methods: {
    submitEnter() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            this.$confirm('在入账后将无法再次还原，是否继续？', '提示', { type: 'warning' }).then(() => {
              caseEnter(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.resetToDefault()
                this.$emit('onEnterSuccess')
              }).catch(() => {
                this.submitLoading = false
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
    resetToDefault() { // 重置到最初
      this.$refs.postForm.resetFields()
      this.submitLoading = false
    }
  }
}
</script>

<style scoped>

</style>
