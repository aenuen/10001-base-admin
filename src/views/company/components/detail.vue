<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="license" :label="fields.license" :label-width="labelWidth">
            <AloneUpload :show-update="true" :accept="license.accept" :action="license.action" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="rule" :label="fields.rule" :label-width="labelWidth">
            <AloneUpload :show-update="true" :accept="rule.accept" :action="rule.action" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// api
// components
import AloneUpload from '@/components/Upload/Alone'
// data
import { fields } from '../modules/fields'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin.vue'
// plugins
// settings
import { rule, license } from '../modules/upload'
export default {
  components: { AloneUpload },
  mixins: [DetailMixin],
  data() {
    return {
      rule,
      license,
      fields
    }
  },
  computed() {
    console.log(this.license)
  }
}
</script>
<style lang="scss" scoped></style>
