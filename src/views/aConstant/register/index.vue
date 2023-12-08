<template>
  <div class="register-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" class="register-form" autocomplete="off" label-position="left">
      <div class="title-container">
        <h3 class="title">管理员注册</h3>
      </div>
      <el-form-item prop="username" :label="fields.username" :label-width="labelWidth">
        <el-input v-model="postForm.username" :placeholder="fields.username" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item prop="password" :label="fields.password" :label-width="labelWidth">
        <el-input v-model="postForm.password" type="password" :placeholder="fields.password" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item prop="affirmPassword" :label="fields.affirmPassword" :label-width="labelWidth">
        <el-input v-model="postForm.affirmPassword" type="password" :placeholder="fields.affirmPassword" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item prop="petName" :label="fields.petName" :label-width="labelWidth">
        <el-input v-model="postForm.petName" :placeholder="fields.petName" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
        <el-input v-model="postForm.realName" :placeholder="fields.realName" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item prop="email" :label="fields.email" :label-width="labelWidth">
        <el-input v-model="postForm.email" :placeholder="fields.email" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item prop="mobile" :label="fields.mobile" :label-width="labelWidth">
        <el-input v-model="postForm.mobile" :placeholder="fields.mobile" clearable autocomplete="off" @keyup.enter.native="submitFrom" />
      </el-form-item>
      <el-form-item :label-width="labelWidth" style="text-align: center">
        <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="submitFrom">{{ submitText }}</el-button>
        <el-button @click="login">我已有账号，去登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// api
import { userApi } from '@/api/user'
// components

// data
import { fields } from './modules/fields'
import { rules as rulesForm } from './modules/rules'
// filter
// function
import { CryptoJsEncode } from '@/libs/cryptojs'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      fields,
      rulesForm,
      postForm: {},
      labelWidth: '80px',
      submitText: '注册'
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    submitFrom() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            const data = {
              ...this.postForm,
              ...{
                password: CryptoJsEncode(this.postForm.password),
                affirmPassword: CryptoJsEncode(this.postForm.affirmPassword)
              }
            }
            userApi
              .register(data)
              .then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.submitLoadingClose()
                  this.$refs.postForm.resetFields()
                  this.login()
                } else {
                  this.$message.error(msg)
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
<style lang="scss" scoped>
.register-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}
.register-form {
  position: relative;
  width: 620px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
