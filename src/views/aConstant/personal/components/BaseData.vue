<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="nickName" :label="fields.nickName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.nickName" maxlength="30" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.realName" maxlength="10" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div :style="{'padding-left':labelWidth}">
      <el-button :loading="submitLoading" type="primary" @click="submitAction">编辑基本资料</el-button>
    </div>
  </div>
</template>

<script>
import { fields } from '../modules/settings'
import DetailMixin from '@/libs/Mixins/DetailMixin'
import { pmValidate } from 'plugins-methods'
import { userDispatch } from '@/api/user'
export default {
  name: 'PersonalBaseData',
  mixins: [DetailMixin],
  props: {
    userInfo: { type: Object, default: () => { return { nickName: '', realName: '' } } }
  },
  data() {
    return {
      fields,
      rulesForm: {
        nickName: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields.nickName, 3, 20) }],
        realName: [{ validator: (rule, value, callback) => pmValidate.validateAllCn(rule, value, callback, fields.realName, 2, 20) }]
      }
    }
  },
  watch: {
    userInfo(value) {
      this.postForm = value
    }
  },
  methods: {
    submitAction() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            userDispatch.use('base', this.postForm).then(res => {
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
.avatar_wrap {
  width: 100%;
  overflow: auto;
  div {
    margin:10px 10px 0 0;
    float: left;
  }
}
</style>
