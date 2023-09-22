<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="title" :label="fields.title" :label-width="labelWidth">
            <el-input v-model="postForm.title" :placeholder="fields.title" maxlength="50" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="class" :label="fields.class" :label-width="labelWidth">
            <el-input v-model="postForm.class" :placeholder="fields.class" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="description" :label="fields.description" :label-width="labelWidth">
            <el-input v-model="postForm.description" rows="3" type="textarea" maxlength="114" show-word-limit :placeholder="fields.description" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="keywords" :label="fields.keywords" :label-width="labelWidth">
            <el-input v-model="postForm.keywords" :placeholder="fields.keywords" maxlength="200" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="content" :label="fields.content" :label-width="labelWidth">
            <TinyMCE />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// api
// components
import TinyMCE from '@/components/TinyMCE'
// data
import { fields } from '../modules/fields'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'ArticleDetail',
  components: { TinyMCE },
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      fields
    }
  }
}
</script>

<style lang="scss" scoped></style>
