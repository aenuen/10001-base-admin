<template>
  <div>
    <Import file-action="article/import" @onImportSuccess="onImportSuccess"></Import>
  </div>
</template>

<script>
import Import from '@/components/Upload/Import'
export default {
  components: { Import },
  data() {
    return {}
  },
  methods: {
    onImportSuccess(data) {
      console.log(data)
    }
  }
}
</script>

<style></style>
