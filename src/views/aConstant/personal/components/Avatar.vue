<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="avatar" :label="`系统${fields.avatar}`" :label-width="labelWidth">
            <div class="avatar_wrap">
              <el-radio-group v-model="postForm.avatar" size="small">
                <el-radio v-for="(avatar,index) in avatarList" :key="index" :label="avatar">
                  <el-avatar shape="circle" fit="cover" :src="avatar" :size="80" />
                </el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button :loading="submitLoading" :disabled="submitLoading" type="primary" @click="submitAction">使用选中的系统头像</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fields } from '../modules/fields'
import DetailMixin from '@/libs/Mixins/DetailMixin'
import { pmValidate } from 'plugins-methods'
import { mapGetters } from 'vuex'
import { userDispatch } from '@/api/user'
export default {
  name: 'PersonalAvatar',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      avatarList: []
    }
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  mounted() {
    this.$store.commit('user/SET_AVATAR', 'http://video.www:20323/upload/avatar/constant/4.jpg')
    this.getAvatarList()
  },
  methods: {
    getAvatarList() {
      userDispatch.use('avatarList').then(({ code, data }) => {
        if (code === 200) {
          if (!data.includes(this.avatar)) {
            data.unshift(this.avatar)
          }
          this.avatarList = data
        }
      })
    },
    submitAction() {
      this.avatar = 'http://video.www:20323/upload/avatar/constant/4.jpg'
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (!this.postForm.avatar) {
              this.$message.error('请选择一个头像')
              this.submitLoading = false
            } else if (this.postForm.avatar === this.avatar) {
              this.$message.error('已经在使用此头像了，无须更换')
              this.submitLoading = false
            } else {
              userDispatch.use('avatar', this.postForm).then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                } else {
                  this.$message.error(msg)
                }
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
.avatar_wrap {
  width: 100%;
  overflow: auto;
}
</style>
