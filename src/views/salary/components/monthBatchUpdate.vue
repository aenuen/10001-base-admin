<script>
import Detail from '../mixins/detail'
import { salaryBatchUpdate } from '@/api/salary'
export default {
  name: 'MonthBatchUpdate',
  mixins: [Detail],
  methods: {
    submitBatch() {
      const idAry = []
      this.updateData.forEach((item) => idAry.push(item.id))
      this.postForm.idAry = idAry
      salaryBatchUpdate(this.postForm).then(({ code }) => {
        if (code === 0) {
          this.submitLoading = false
          this.$emit('onBatchUpdateSuccess')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
