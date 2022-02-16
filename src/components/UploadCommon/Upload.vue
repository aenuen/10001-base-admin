<template>
  <div class="upload-container">
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="false"
      :limit="fileLimit"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-exceed="onExceed"
      :on-preview="onHandlePreview"
      :disabled="fileDisabled"
      :data="data"
      :accept="fileAccept"
      drag
      show-file-list
      class="image-upload"
    >
      <i class="el-icon-upload" />
      <div v-if="fileList.length===0" class="el-upload__text">请将 <em>{{ fileText }} 拖入</em> 或 <em>点击上传</em></div>
      <div v-else class="el-upload__text">{{ fileText }}已上传</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/libs/utils/token'

export default {
  name: 'ComponentsUploadCommonUpload', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    fileDisabled: {
      type: Boolean,
      default: false
    },
    fileAccept: {
      type: String,
      default: ''
    },
    fileText: {
      type: String,
      default: ''
    },
    fileAction: {
      type: String,
      default: ''
    },
    fileLimit: {
      type: Number,
      default: 1
    },
    fileData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() { /* 定义数据 */
    return {
      baseUrl: `${process.env.VUE_APP_BASE_API}`,
      action: '',
      data: {}
    }
  },
  computed: { /* 计算属性 */
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  watch: { /* 监控值变换 */
    fileData(value) {
      this.data = value
    }
  },
  mounted() { /* 渲染后运行 */
    this.action = `${this.baseUrl}${this.fileAction}`
  },
  created() { /* 创建后运行 */
  },
  methods: { /* 函数及方法 */
    beforeUpload(file) { // 上传前事件
      this.$emit('onBeforeUpload', file)
    },
    onSuccess(response, file, fileList) { // 成功事件
      const { msg, code, data } = response
      if (code === 0) {
        this.$message.success(msg)
        this.$emit('onSuccess', data)
      } else {
        this.$message.error((msg && `上传失败，失败原因：${msg}`) || '上传失败')
        this.$emit('onError', 'file')
      }
    },
    onError(err) { // 错误事件
      const errMsg = err.message && JSON.parse(err.message)
      this.$message.error((errMsg && errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || '上传失败')
      this.$emit('onError', err)
    },
    onRemove() { // 移除事件
      this.$message.success(`${this.fileText}移除成功，可重新上传。若无重新上传则已上传的${this.fileText}仍在`)
      this.$emit('onRemove')
    },
    onExceed() { // 列表超出事件
      this.$message.warning(`一次只有上传${this.fileLimit}个${this.fileText}，移除队列可重新上传`)
    },
    onHandlePreview(data) {
      this.$emit('onHandlePreview', data)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
