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
  components: {
    PanelGroup,
    BoxCard,
    Step
  }
}
</script>

<style scoped lang="scss">
</style>
