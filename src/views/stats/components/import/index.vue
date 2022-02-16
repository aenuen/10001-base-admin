<template>
  <div>
    <upload
      :file-text="fileText"
      :file-list="fileList"
      :file-limit="fileLimit"
      :file-accept="fileAccept"
      :file-action="fileTwoAction"
      :file-disabled="fileDisable"
      :file-data="fileData"
      @onSuccess="onUploadSuccess"
    />
  </div>
</template>

<script>
import Upload from '@/components/UploadCommon/Upload'

export default {
  name: 'StatsImport',
  components: { Upload },
  data() {
    return {
      fileList: [],
      fileLimit: 1,
      fileText: 'Excel文件',
      fileAccept: 'application/vnd.ms-excel',
      fileDisable: false,
      fileTwoAction: '/stats/import',
      fileData: {}
    }
  },
  methods: {
    onUploadSuccess() {
      this.$emit('uploadSuccessEmit')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
