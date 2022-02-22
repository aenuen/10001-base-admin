<script>
import { pmValidate } from 'plugins-methods'

export default {
  data() {
    return {
      postForm: {},
      rulesForm: {},
      labelWidth: '120px',
      submitLoading: false,
      updateId: 0
    }
  },
  created() {
    const editId = +this.$route.params.id
    if (this.isEdit && editId > 0) {
      this.updateId = editId
      this.getDetail()
    }
    this.startHandle()
  },
  methods: {
    getDetail() {},
    startHandle() {},
    submitLoadingOpen() {
      this.submitLoading = true
    },
    submitLoadingClose() {
      this.submitLoading = false
    },
    validateErrHandle(fields) {
      const msg = pmValidate.validateErrMsg(fields)
      this.$message.error(msg)
      this.submitLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
