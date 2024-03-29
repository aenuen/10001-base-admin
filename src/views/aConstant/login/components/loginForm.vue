<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ fields.loginTitle }}</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" :placeholder="fields.username" name="username" type="text" tabindex="1" autocomplete="off" @keyup.enter.native="login" />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" :content="fields.capsTooltip" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" :placeholder="fields.password" name="password" tabindex="2" autocomplete="off" @keyup.native="checkCapsLock" @blur="capsTooltip = false" @keyup.enter.native="login" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <div class="buttons">
        <el-button type="primary" :loading="loading" @click.native.prevent="login"> {{ fields.login }} </el-button>
        <el-button @click.native.prevent="register">{{ fields.noAccount }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { CryptoJsEncode } from '@/libs/cryptojs'
import { fields } from '../modules/fields'
import { loginRules } from '../modules/rules'

export default {
  name: 'LoginForm',
  props: {
    loginForm: { type: Object, required: true }
  },
  data() {
    return {
      fields,
      loginRules,
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  mounted() {
    // 自动聚焦
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapsLock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => this.$refs.password.focus()) // 自动聚焦
    },
    register() {
      this.$router.push('/register')
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const newLoginForm = {
            username: CryptoJsEncode(this.loginForm.username),
            password: CryptoJsEncode(this.loginForm.password)
          }
          this.$store
            .dispatch('user/login', newLoginForm)
            .then(() => {
              this.$emit('loginSubmit')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bgColor: #283443;
$lightColor: #fff;
$cursorColor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursorColor)) {
  .login-form .el-input input {
    color: $cursorColor;
  }
}

.login-form {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $lightColor;
      height: 47px;
      caret-color: $cursorColor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bgColor inset !important;
        -webkit-text-fill-color: $cursorColor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 15%;
  display: inline-block;
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}

.buttons {
  text-align: center;
}
</style>
