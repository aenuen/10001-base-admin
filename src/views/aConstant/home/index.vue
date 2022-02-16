<template>
  <div class="app-container">
    <panel-group />
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 6}">
        <box-card />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 18}">
        <step style="margin:30px" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PanelGroup from './components/PanelGroup'
import BoxCard from './components/BoxCard'
import Step from './components/WorkStep'

export default {
  name: 'ViewsHomeIndex',
  components: { // 引用组件
    PanelGroup,
    BoxCard,
    Step
  },
  filters: { // 过滤器
  },
  directives: { // 自定义指令
  },
  props: { // 定义传值
  },
  data() { // 定义数据
    return {}
  },
  computed: { // 计算属性
  },
  watch: { // 监控值变换
  },
  mounted() { // 渲染后运行
  },
  created() { // 渲染时运行
  },
  methods: { // 方法函数
  }
}
</script>

<style scoped lang="scss">
</style>
