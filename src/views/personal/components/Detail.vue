<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="username" :label="`${fields['username']}`" :label-width="labelWidth">
            <el-input
              v-model="postForm.username"
              :placeholder="`${fields['username']}`"
              clearable
              style="width: 300px;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="password" :label="`${fields['password']}`" :label-width="labelWidth">
            <el-input
              v-model="postForm.password"
              :placeholder="`${fields['password']}`"
              clearable
              show-password
              style="width: 300px;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="nickName" :label="`${fields['nickName']}`" :label-width="labelWidth">
            <el-input
              v-model="postForm.nickName"
              :placeholder="`${fields['nickName']}`"
              clearable
              style="width: 300px;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="`${fields['realName']}`" :label-width="labelWidth">
            <el-input
              v-model="postForm.realName"
              :placeholder="`${fields['realName']}`"
              clearable
              style="width: 300px;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="email" :label="`${fields['email']}`" :label-width="labelWidth">
            <el-input
              v-model="postForm.email"
              :placeholder="`${fields['email']}`"
              clearable
              style="width: 300px;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="mobile" :label="`${fields['mobile']}`" :label-width="labelWidth">
            <el-input
              v-model="postForm.mobile"
              :placeholder="`${fields['mobile']}`"
              clearable
              style="width: 300px;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="role" :label="`${fields['role']}`" :label-width="labelWidth">
            <el-select v-model="postForm.role" clearable :placeholder="`${fields['role']}`">
              <el-option
                v-for="item in roleObject"
                :key="item['key']"
                :label="item['label']"
                :value="item['value']"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button
          v-loading="submitLoading"
          type="primary"
          :disabled="submitLoading"
          @click="submitData"
        >
          {{ submitText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pmValidate } from 'plugins-methods'
import { fields, roleObject } from './config'
import { CryptoJsEncode } from '@/libs/cryptojs'
import { userInsert, getInfo } from '@/api/user'

export default {
  name: 'ViewsPersonalComponentsDetail', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */ },
  data() { /* 定义数据 */
    return {
      fields: fields,
      roleObject: roleObject,
      labelWidth: '120px',
      submitLoading: false,
      submitText: '新建管理员',
      postForm: {},
      username: '',
      isEdit: false,
      rulesForm: {
        username: [{ validator: pmValidate.validateUsername }],
        password: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['password'], 6, 20) }],
        nickName: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['nickName'], 2, 20) }],
        realName: [{ validator: (rule, value, callback) => pmValidate.validateAllCn(rule, value, callback, fields['realName'], 2, 20) }],
        email: [{ validator: (rule, value, callback) => pmValidate.validateEmail(rule, value, callback) }],
        mobile: [{ validator: (rule, value, callback) => pmValidate.validateMobile(rule, value, callback) }],
        role: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['role']) }]
      }
    }
  },
  computed: { /* 计算属性 */ },
  watch: { /* 监控值变换 */ },
  mounted() { /* 渲染后运行 */
    const username = this.$route.params.username
    if (username) {
      this.username = username
      this.getData()
    }
  },
  created() { /* 创建后运行 */
  },
  methods: { /* 函数及方法 */
    getData() {
      getInfo({ username: this.username }).then(res => {
        const { data } = res
        this.postForm = data
        this.submitText = '编辑管理员'
        this.isEdit = true
      }).catch(() => {
        this.$message.error('无效的用户名')
        this.$router.go(-1)
      })
    },
    submitData() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            const password = CryptoJsEncode(this.postForm.password)
            userInsert({
              username: this.postForm.username,
              password,
              nickName: this.postForm.nickName,
              realName: this.postForm.realName,
              email: this.postForm.email,
              mobile: this.postForm.mobile,
              role: this.postForm.role
            }).then(res => {
              const { msg } = res
              this.$message.success(msg)
              this.submitLoading = false
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
