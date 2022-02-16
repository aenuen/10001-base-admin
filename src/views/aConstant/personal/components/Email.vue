<template>
  <div style="width:1000px;">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" style="margin:30px 50px">
      <el-row>
        <el-col>
          <el-form-item :label="`我的${fields['email']}`" :label-width="labelWidth">{{ `：${dataForm.email}` }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newEmail" :label="`新的${fields['email']}`" :label-width="labelWidth">
            <el-input v-model.trim="postForm.newEmail" :placeholder="`请输入新的${fields['email']}`" maxlength="30" style="width:300px" clearable @keyup.enter.native="submitEmail" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitEmail">编辑基本资料</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pmValidate } from 'plugins-methods'
import { fields } from '../modules/settings'
import { userDispatch } from '@/api/user'

export default {
  name: 'ViewsPersonalComponentsEmail', /* 组件名称 */
  props: { /* 定义传值 */
    userInfo: { type: Object, default: () => {} }
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      dataForm: {},
      postForm: {
        newEmail: ''
      },
      rulesForm: {
        newEmail: [{ validator: pmValidate.validateEmail }]
      },
      labelWidth: '120px',
      submitLoading: false
    }
  },
  watch: { /* 监控值变换 */
    userInfo() {
      this.dataForm = Object.assign({}, this.userInfo)
      this.postForm.id = this.dataForm.id
    }
  },
  methods: { /* 函数及方法 */
    submitEmail() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.postForm.email === this.postForm.newEmail) {
              this.$message.warning('电子邮箱一致，无需修改！')
              this.submitLoading = false
            } else {
              userDispatch.use(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.submitLoading = false
                this.dataForm.email = this.postForm.newEmail
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
