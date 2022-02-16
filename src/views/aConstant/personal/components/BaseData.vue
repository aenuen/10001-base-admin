<template>
  <div style="width:1000px;">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" style="margin:30px 50px">
      <el-row>
        <el-col>
          <el-form-item prop="nickName" :label="`${fields['nickName']}`" :label-width="labelWidth">
            <el-input v-model.trim="postForm.nickName" maxlength="30" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="`${fields['realName']}`" :label-width="labelWidth">
            <el-input v-model.trim="postForm.realName" maxlength="10" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="avatarUse" :label="`${fields['avatarUse']}`" :label-width="labelWidth">
        <el-radio-group v-model="postForm.avatarUse">
          <el-radio label="1" border>头像网址</el-radio>
          <el-radio label="2" border>头像图片</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="postForm.avatarUse==='1'">
        <el-row>
          <el-col :span="16">
            <el-form-item prop="avatarHttp" label="网址头像" :label-width="labelWidth">
              <el-input v-model.trim="postForm.avatarHttp" clearable placeholder="请输入网址头像" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="!disabled" :label-width="labelWidth">
          <el-avatar :size="80" :src="postForm.avatarHttp" @error="true">
            <img alt src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item prop="avatar" label="图片头像" :label-width="labelWidth">
          <el-radio-group v-model="postForm.avatarImage" size="small">
            <el-radio v-for="avatarSrc in postForm.avatarImages" :key="avatarSrc" :label="avatarSrc">
              <el-avatar shape="circle" fit="cover" :src="avatarSrc" :size="80" />
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-form-item :label-width="labelWidth">
        <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="submit">
          编辑基本资料
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pmValidate } from 'plugins-methods'
import { fields } from '../modules/settings'
import { userDispatch } from '@/api/user'

export default {
  name: 'ViewsPersonalComponentsBaseData', /* 组件名称 */
  props: { /* 定义传值 */
    userInfo: {
      type: Object,
      default() {
        return { nickName: '', avatarUse: 0, avatarHttp: '', avatarImage: '', avatarImages: [] }
      }
    }
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      labelWidth: '120px',
      postForm: {},
      disabled: false,
      submitLoading: false,
      rulesForm: {
        nickName: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['nickName'], 3, 20) }],
        realName: [{ validator: (rule, value, callback) => pmValidate.validateAllCn(rule, value, callback, fields.realName) }],
        avatarUse: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['avatarUse']) }]
      }
    }
  },
  watch: { /* 监控值变换 */
    userInfo() {
      this.postForm = Object.assign({}, this.userInfo)
    },
    'postForm.avatarHttp': function(value) {
      this.disabled = !value
    }
  },
  methods: { /* 函数及方法 */
    submit() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            userDispatch.use('base', this.postForm).then(res => {
              const { msg } = res
              this.$message.success(msg)
              this.submitLoading = false
              setTimeout(() => {
                this.$router.go(0)
              }, 400)
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
