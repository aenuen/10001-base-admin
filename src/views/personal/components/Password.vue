<template>
  <div style="width:1000px;">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" style="margin:30px 50px">
      <el-row>
        <el-col>
          <el-form-item prop="password" :label="`旧${fields['password']}`" :label-width="labelWidth">
            <el-input
              v-model.trim="postForm.password"
              :placeholder="`旧${fields['password']}`"
              clearable
              show-password
              maxlength="30"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="passwordOne" :label="`新${fields['password']}`" :label-width="labelWidth">
            <el-input
              ref="passwordOne"
              v-model.trim="postForm.passwordOne"
              :placeholder="`新${fields['password']}`"
              clearable
              show-password
              maxlength="30"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="passwordTwo" :label="`确认${fields['password']}`" :label-width="labelWidth">
            <el-input
              ref="passwordTwo"
              v-model.trim="postForm.passwordTwo"
              :placeholder="`确认${fields['password']}`"
              clearable
              show-password
              maxlength="30"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitPassword">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pmValidate } from 'plugins-methods'
import { fields } from './config'
import { userPassword } from '@/api/user'
import { CryptoJsEncode } from '@/libs/utils/cryptojs'

export default {
  name: 'ViewsPersonalComponentsPassword', /* 组件名称 */
  props: { /* 定义传值 */
    userInfo: { type: Object, default: () => {} }
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      labelWidth: '120px',
      submitLoading: false,
      postForm: {},
      rulesForm: {
        password: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `旧${fields['password']}`, 6, 20) }],
        passwordOne: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `新${fields['password']}`, 6, 20) }],
        passwordTwo: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, `确认${fields['password']}`, 6, 20) }]
      }
    }
  },
  watch: { /* 监控值变换 */
    userInfo() {
      this.postForm = Object.assign({}, this.userInfo)
    }
  },
  methods: { /* 函数及方法 */
    submitPassword() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.postForm.password === this.postForm.passwordOne) {
              this.$message.error('新旧密码一致，请勿重覆修改！')
              this.$refs.passwordOne.focus()
              this.submitLoading = false
            } else if (this.postForm.passwordOne !== this.postForm.passwordTwo) {
              this.$message.error('新密码与确认密码不一致，请重新填写！')
              this.$refs.passwordTwo.focus()
              this.submitLoading = false
            } else {
              const id = this.postForm.id
              const password = CryptoJsEncode(this.postForm.password)
              const passwordOne = CryptoJsEncode(this.postForm.passwordOne)
              const passwordTwo = CryptoJsEncode(this.postForm.passwordTwo)
              userPassword({ id, password, passwordOne, passwordTwo }).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.submitLoading = false
                this.$refs.postForm.resetFields()
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
