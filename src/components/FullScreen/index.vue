<template>
  <div>
    <el-tooltip
      :content="isFullscreen?'退出全屏':'打开全屏'"
      effect="dark"
      placement="bottom"
    >
      <svg-icon
        :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"
        @click="click"
      />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'ComponentsFullScreen',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    screenfull.enabled && screenfull.on('change', this.change)
  },
  beforeDestroy() {
    screenfull.enabled && screenfull.off('change', this.change)
  },
  methods: {
    click() {
      screenfull.enabled ? screenfull.toggle() : this.$message({
        message: '您的浏览器无法工作',
        type: 'warning'
      })
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
