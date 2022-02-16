<template>
  <div>
    <div class="MaskGray" :style="{opacity:opacity,'z-index':maxZIndex}" />
  </div>
</template>

<script>
import { _some_maxZIndex } from 'methods-node/use/some'

export default {
  name: 'ComponentsMaskGrayIndex', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */
    opacity: {
      type: Number,
      default: 0.3
    }
  },
  data() { /* 定义数据 */
    return {
      maxZIndex: _some_maxZIndex()
    }
  },
  computed: { /* 计算属性 */ },
  watch: { /* 监控值变换 */ },
  mounted() { /* 渲染后运行 */
  },
  created() { /* 创建后运行 */
  },
  methods: { /* 函数及方法 */ }
}
</script>

<style lang="scss" scoped>
.MaskGray {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #000;
}
</style>
