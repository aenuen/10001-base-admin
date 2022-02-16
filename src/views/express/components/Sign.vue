<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col :span="18">
          <el-form-item prop="signer" :label="fields.signer" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.signer"
              :fetch-suggestions="(q,c) => autoQuery(q,c,signAry)"
              :placeholder="fields.signer"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="signTime" :label="fields.signTime" :label-width="labelWidth">
            <el-date-picker
              v-model="postForm.signTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              :placeholder="fields.signTime"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="labelWidth">
            <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="sign">签收</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import fields from '../modules/fields'
import Sign_ruleForm from '../modules/sign_ruleForm'
import DetailMixin from '@/components/Mixins/DetailMixin'
import { autoQuery, pmValidate } from 'plugins-methods'
import { expressSignIn } from '@/api/express'
export default {
  name: 'Sign',
  mixins: [DetailMixin],
  props: {
    signId: { type: Number, default: 0 },
    signer: { type: String, default: '' },
    signTime: { type: String, default: '' }
  },
  data() {
    return {
      fields,
      ruleForm: Sign_ruleForm
    }
  },
  computed: {
    signAry() {
      return [
        { value: this.signer },
        { value: '本人' },
        { value: '收发室' },
        { value: '保安室' }
      ]
    }
  },
  mounted() {
    this.postForm = {
      id: this.signId,
      signer: this.signer,
      signTime: this.signTime
    }
  },
  methods: {
    sign() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            expressSignIn(this.postForm).then(({ code, msg }) => {
              if (code === 0) {
                this.$message.success(msg)
                this.$emit('signSuccessEmit')
              } else {
                this.$message.error(msg)
              }
            })
          } else {
            const msg = pmValidate.validateErrMsg(fields)
            this.$message.error(msg)
            this.submitLoading = false
          }
        })
      }
    },
    autoQuery(q, c, a) {
      autoQuery(q, c, a)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
