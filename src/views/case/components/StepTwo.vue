<template>
  <div>
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="contract" :label="`请上传${fields['contract']}`" :label-width="labelWidth">
            <upload
              :file-text="`${fields['contract']}`"
              :file-list="postForm.contract"
              :file-limit="fileLimit"
              :file-accept="fileAccept"
              :file-action="fileOneAction"
              :file-disabled="fileDisable"
              :file-data="fileData"
              @onSuccess="onUploadSuccess"
              @onHandlePreview="onHandlePreview"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="letter" :label="`请上传${fields['letter']}`" :label-width="labelWidth">
            <upload
              :file-text="`${fields['letter']}`"
              :file-list="postForm.letter"
              :file-limit="fileLimit"
              :file-accept="fileAccept"
              :file-action="fileTwoAction"
              :file-disabled="fileDisable"
              :file-data="fileData"
              @onSuccess="onUploadSuccess"
              @onHandlePreview="onHandlePreview"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button v-loading="submitLoading" :disabled="submitLoading" type="primary" @click="submitValidate">提交审核</el-button>
            <el-button type="success" @click="submitPrev">上一步</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { fields } from '@/views/case/components/config'
import Upload from '@/components/UploadCommon/Upload'
import { pmValidate } from 'plugins-methods'
import { caseContinue } from '@/api/case'

export default {
  name: 'ViewsCaseStepTwo', /* 组件名称 */
  components: { Upload },
  props: { /* 定义传值 */
    labelWidth: { type: String, default: '200px' },
    data: { type: Object, default: () => {} }
  },
  data() { /* 定义数据 */
    return {
      postForm: {},
      rulesForm: {
        contract: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['contract'], '上传') }],
        letter: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['letter'], '上传') }]
      },
      fields: fields,
      submitLoading: false,
      fileLimit: 1,
      fileAccept: 'application/msword,application/vnd.ms-works',
      fileDisable: false,
      fileOneAction: '/case/contract',
      fileTwoAction: '/case/letter',
      fileData: {}
    }
  },
  watch: { /* 监控值变换 */
    data(value) {
      value.contract = value['contractFile'] && value['contractOld'] ? [{ url: value['contractFile'], name: value['contractOld'] }] : []
      value.letter = value['letterFile'] && value['letterOld'] ? [{ url: value['letterFile'], name: value['letterOld'] }] : []
      this.fileData = { id: value.id }
      this.postForm = value
    }
  },
  methods: { /* 函数及方法 */
    submitValidate() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            this.$confirm('提交审批后将无法继续修改，是否继续', '提示', { type: 'warning' }).then(() => {
              this.submitContinue()
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
    submitContinue() {
      caseContinue(this.postForm).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.$router.push({ path: '/case/list' })
      })
    },
    submitPrev() {
      this.$emit('onSubmitPrev')
    },
    onUploadSuccess() {
      location.reload()
    },
    onHandlePreview(res) {
      const { response } = res
      if (response) {
        const { data } = response
        if (data) {
          const one = data[0] ? data[0] : {}
          one.url && window.open(one.url)
        }
      } else {
        res.url && window.open(res.url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
