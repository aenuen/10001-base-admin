<script>
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
  },
  methods: {
    getDetail() {}
  }
}
</script>

<style lang="scss" scoped>
</style>
