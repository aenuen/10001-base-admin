<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="username" :label="fields.username" :label-width="labelWidth">
            <el-input v-model="postForm.username" :placeholder="fields.username" clearable style="width: 500px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="password" :label="fields.password" :label-width="labelWidth">
            <el-input v-model="postForm.password" :placeholder="isEdit?`${fields.password}，不填写则不修改密码`:fields.password" clearable show-password style="width: 500px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="petName" :label="fields.petName" :label-width="labelWidth">
            <el-input v-model="postForm.petName" :placeholder="fields.petName" clearable style="width: 500px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
            <el-input v-model="postForm.realName" :placeholder="fields.realName" clearable style="width: 500px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="email" :label="fields.email" :label-width="labelWidth">
            <el-input v-model="postForm.email" :placeholder="fields.email" clearable style="width: 500px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="mobile" :label="fields.mobile" :label-width="labelWidth">
            <el-input v-model="postForm.mobile" :placeholder="fields.mobile" clearable style="width: 500px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="roles" :label="fields.roles" :label-width="labelWidth">
            <el-select v-model="postForm.roles" :placeholder="fields.roles" clearable multiple style="width: 500px;">
              <el-option v-for="(item,index) in rolesAry" :key="index" :label="item['label']" :value="item['value']" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="introduction" :label="fields.introduction" :label-width="labelWidth">
            <el-input v-model.trim="postForm.introduction" :placeholder="fields.introduction" type="textarea" clearable :rows="4" resize="none" maxlength="140" style="width: 500px;" />
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
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import { fields } from '../modules/fields'
import { rolesAry } from '../modules/roles'
import { DetailRule as rulesForm, DetailPasswordRule as rulesPassword } from '../modules/rules'
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
      rolesAry,
      rulesForm,
      rulesPassword,
      postForm: {
        roles: ['user']
      }
    }
  },
  computed: {
    submitText() {
      return this.isEdit ? '编辑用户' : '创建用户'
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.updateId = id
      this.rulesForm.password = this.rulesPassword.updatePassword
      this.getData()
    } else {
      this.rulesForm.password = this.rulesPassword.createPassword
    }
  },
  created() {
    console.log(this.$route.query.goindex)
  },
  methods: {
    getData() {
      userDispatch.use('detail', { id: this.updateId }).then(({ code, data }) => {
        if (code === 200) {
          this.postForm = data
        }
      }).catch(() => {
        this.$message.error('无效的用户名')
        this.$router.go(-1)
      })
    },
    commentHandle(msg) {
      this.$message.success(msg)
      this.submitLoadingClose()
      this.$refs.postForm.resetFields()
    },
    submitAction() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            let data
            if (this.postForm.password) {
              const password = CryptoJsEncode(this.postForm.password)
              data = { ...this.postForm, ...{ password }}
            } else {
              data = this.postForm
            }
            if (this.isEdit) {
              userDispatch.use('update', data).then(({ code, msg }) => {
                if (code === 200) {
                  this.commentHandle(msg)
                  this.backClose()
                } else {
                  this.submitLoading = false
                }
              }).catch(() => {
                this.submitLoading = false
              })
            } else {
              userDispatch.use('create', data).then(({ code, msg }) => {
                if (code === 200) {
                  this.commentHandle(msg)
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
