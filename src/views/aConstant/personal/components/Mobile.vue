<template>
  <div style="width:1000px;">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" style="margin:30px 50px">
      <el-row>
        <el-col>
          <el-form-item :label="`我的${fields['mobile']}`" :label-width="labelWidth">
            {{ `：${dataForm.mobile}` }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newMobile" :label="`新的${fields['mobile']}`" :label-width="labelWidth">
            <el-input
              v-model.trim="postForm.newMobile"
              :placeholder="`请输入新的${fields['mobile']}`"
              maxlength="11"
              style="width:300px"
              clearable
              @keyup.enter.native="submitMobile"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button
          v-loading="submitLoading"
          type="primary"
          :disabled="submitLoading"
          @click="submitMobile"
        >
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
  name: 'ViewsPersonalComponentsEmail', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      dataForm: {},
      postForm: {
        newMobile: ''
      },
      rulesForm: {
        newMobile: [{ validator: pmValidate.validateMobile }]
      },
      labelWidth: '120px',
      submitLoading: false
    }
  },
  computed: { /* 计算属性 */ },
  watch: { /* 监控值变换 */
    userInfo() {
      this.dataForm = Object.assign({}, this.userInfo)
      this.postForm.id = this.dataForm.id
    }
  },
  mounted() { /* 渲染后运行 */
  },
  created() { /* 创建后运行 */
  },
  methods: { /* 函数及方法 */
    submitMobile() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.postForm.mobile === this.postForm.newMobile) {
              this.$message.warning('手机号码一致，无需修改！')
              this.submitLoading = false
            } else {
              userDispatch.use(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.submitLoading = false
                this.dataForm.mobile = this.postForm.newMobile
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
