<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="username" :label="fields.username" :label-width="labelWidth">
            <el-input v-model="postForm.username" :placeholder="fields.username" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="password" :label="fields.password" :label-width="labelWidth">
            <el-input v-model="postForm.password" :placeholder="fields.password" clearable show-password />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="petName" :label="fields.petName" :label-width="labelWidth">
            <el-input v-model="postForm.petName" :placeholder="fields.petName" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
            <el-input v-model="postForm.realName" :placeholder="fields.realName" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="email" :label="fields.email" :label-width="labelWidth">
            <el-input v-model="postForm.email" :placeholder="fields.email" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="mobile" :label="fields.mobile" :label-width="labelWidth">
            <el-input v-model="postForm.mobile" :placeholder="fields.mobile" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="role" :label="fields.role" :label-width="labelWidth">
            <el-select v-model="postForm.role" clearable :placeholder="fields.role">
              <el-option v-for="(item,index) in roles" :key="index" :label="item['label']" :value="item['value']" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="submitAction">{{ submitText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DetailMixin from '@/libs/Mixins/DetailMixin'
import MethodsMixin from '@/libs/Mixins/MethodsMixin'
import { fields } from '../modules/fields'
import { roles } from '../modules/roles'
import { DetailRule as rulesForm } from '../modules/rules'
import { CryptoJsEncode } from '@/libs/cryptojs'
import { userDispatch } from '@/api/user'

export default {
  name: 'PersonalDetail',
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      fields,
      roles,
      rulesForm
    }
  },
  computed: {
    submitText() {
      return this.isEdit ? '编辑角色' : '创建角色'
    }
  },
  mounted() {
    const username = this.$route.params.username
    if (username) {
      this.username = username
      this.getData()
    }
  },
  methods: {
    getData() {
      userDispatch.use('info', { username: this.username }).then(({ code, data }) => {
        if (code === 200) {
          this.postForm = data
          this.submitText = '编辑管理员'
          this.isEdit = true
        }
      }).catch(() => {
        this.$message.error('无效的用户名')
        this.$router.go(-1)
      })
    },
    submitAction() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.isEdit) {
              console.log(1)
            } else {
              const password = CryptoJsEncode(this.postForm.password)
              userDispatch.use('create', {
                username: this.postForm.username,
                password,
                petName: this.postForm.petName,
                realName: this.postForm.realName,
                email: this.postForm.email,
                mobile: this.postForm.mobile,
                role: this.postForm.role
              }).then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.submitLoading = false
                  this.$refs.postForm.resetFields()
                  this.routerClose('/manager/list')
                } else {
                  this.submitLoading = false
                }
              }).catch(() => {
                this.submitLoading = false
              })
            }
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
</style>
