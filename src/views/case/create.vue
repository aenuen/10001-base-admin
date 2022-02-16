<template>
  <div class="app-container">
    <step :step="step" />
    <step-one v-show="step===1" class="formWrap" @onSubmitNext="onSubmitNext" />
    <step-two v-show="step===2" :data="data" class="formWrap" @onSubmitPrev="onSubmitPrev" />
  </div>
</template>

<script>
import Step from './components/Step'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'

export default {
  name: 'ViewsCaseCreate', // 创建
  components: { Step, StepOne, StepTwo },
  data() { /* 定义数据 */
    return {
      step: 1,
      data: {}
    }
  },
  methods: { /* 函数及方法 */
    onSubmitNext(data) {
      data && (this.data = data)
      this.step = 2
    },
    onSubmitPrev() {
      this.step = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.formWrap {
  padding: 50px;
  min-width: 800px;
  margin: auto;
}
</style>
