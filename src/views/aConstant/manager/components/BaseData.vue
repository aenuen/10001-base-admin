<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="petName" :label="fields.petName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.petName" :placeholder="fields.petName" maxlength="30" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.realName" :placeholder="fields.realName" maxlength="10" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="introduction" :label="fields.introduction" :label-width="labelWidth">
            <el-input v-model.trim="postForm.introduction" type="textarea" :rows="4" resize="none" :placeholder="fields.introduction" maxlength="140" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button :loading="submitLoading" type="primary" @click="submitAction">编辑基本资料</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fields } from '../modules/fields'
import { BaseDataRule as rulesForm } from '../modules/rules'
import DetailMixin from '@/components/Mixins/DetailMixin'
import { mapGetters } from 'vuex'
import { userDispatch } from '@/api/user'
export default {
  name: 'PersonalBaseData',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      rulesForm
    }
  },
  computed: {
    ...mapGetters(['aid', 'realName', 'petName', 'introduction'])
  },
  created() {
    this.postForm = {
      ...{
        id: this.aid,
        realName: this.realName,
        petName: this.petName,
        introduction: this.introduction
      }
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
              this.$store.commit('user/SET_PetNAME', this.postForm.petName)
            }).catch(() => {
              this.submitLoading = false
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
</style>
