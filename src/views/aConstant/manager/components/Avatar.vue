<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-form-item :label-width="labelWidth">
        <el-button :type="cutterControl?'primary':'default'" class="el-icon-upload" @click="cutterToggle">上传头像</el-button>
        <el-button :type="historyControl?'primary':'default'" class="el-icon-camera" @click="historyToggle">历史上传</el-button>
      </el-form-item>
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
    <el-dialog v-if="cutterControl" title="上传头像" width="815px" :visible.sync="cutterControl">
      <ImgCutter @onCutSuccess="onCutSuccess" />
    </el-dialog>
    <el-dialog v-if="historyControl" title="历史上传" width="815px" :visible.sync="historyControl">
      <AvatarHistory :list="historyList" @onUseAvatar="onUseAvatar" @onDelAvatar="onDelAvatar" />
    </el-dialog>
  </div>
</template>

<script>
import { fields } from '../modules/fields'
import DetailMixin from '@/components/Mixins/DetailMixin'
import ImgCutter from '@/components/imgCutter'
import AvatarHistory from './AvatarHistory'
import { mapGetters } from 'vuex'
import { userDispatch } from '@/api/user'
export default {
  name: 'PersonalAvatar',
  components: { ImgCutter, AvatarHistory },
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      avatarList: [],
      cutterControl: false,
      historyList: [],
      historyLoad: false,
      historyControl: false
    }
  },
  computed: {
    ...mapGetters(['aid', 'avatar'])
  },
  mounted() {
    this.getAvatarList()
  },
  methods: {
    cutterToggle() {
      this.cutterControl = !this.cutterControl
    },
    onCutSuccess(res) {
      userDispatch.use('avatarUpload', {
        id: this.aid, avatar: res.dataURL
      }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.historyList.push(data)
          this.$store.commit('user/SET_AVATAR', data.avatar)
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      })
      this.cutterToggle()
    },
    historyToggle() {
      this.historyControl = !this.historyControl
      if (this.historyControl && this.historyLoad === false) {
        this.history()
      }
    },
    history() {
      userDispatch.use('avatarHistory', {
        id: this.aid
      }).then(({ code, data }) => {
        if (code === 200) {
          this.historyList = data
          this.historyLoad = true
        }
      })
    },
    getAvatarList() {
      userDispatch.use('avatarList').then(({ code, data }) => {
        if (code === 200) {
          this.avatarList = data
        }
      })
    },
    onUseAvatar(avatar) {
      this.postForm.avatar = avatar
      this.historyControl = false
      this.submitAction()
    },
    onDelAvatar() {
      this.history()
    },
    submitAction() {
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
              this.postForm.id = this.aid
              userDispatch.use('avatar', this.postForm).then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.$store.commit('user/SET_AVATAR', this.postForm.avatar)
                } else {
                  this.$message.error(msg)
                }
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
.avatar_wrap {
  width: 100%;
  overflow: auto;
}
</style>
