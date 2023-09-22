<template>
  <div class="app-container">
    <div style="padding-bottom: 20px">
      <el-table :key="3" :loading="tableLoading" :data="tableData" border fit highlight-current-row show-summary :summary-method="(p) => summaryMethod(p, ['enterPrice'])" style="width: 100%">
        <el-table-column :label="fields.id" type="index" align="center" width="80" />
        <el-table-column :label="fields.enterDate" prop="enterDate" align="center" />
        <el-table-column :label="fields.enterPrice" prop="enterPrice" align="center" />
        <el-table-column :label="fields.work" align="center" width="180">
          <template slot-scope="{ row: { id, cid, fid } }">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="enterRemove(id, cid, fid)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="caseName" :label="fields.caseName" :label-width="labelWidth">
            <el-input v-model="caseName" :placeholder="fields.caseName" :disabled="true" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="caseNumber" :label="fields.caseNumber" :label-width="labelWidth">
            <el-input v-model="caseNumber" :placeholder="fields.caseNumber" :disabled="true" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="enterPrice" :label="fields.enterPrice" :label-width="labelWidth">
            <el-input v-model="postForm.enterPrice" :placeholder="fields.enterPrice" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="enterDate" :label="fields.enterDate" :label-width="labelWidth">
            <el-date-picker v-model="postForm.enterDate" type="date" :placeholder="fields.enterDate" value-format="yyyy-MM-dd" :clearable="false" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="invoiceEnter">发票入账</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// api
import { caseApi } from '@/api/case'
// components
// data
import { fields } from '../modules/fields'
import { rulesForm } from '../modules/rulesEnter'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
import { controlInputPrice, summaryMethod } from 'abbott-methods/import'
// settings
export default {
  components: {},
  mixins: [DetailMixin, ListMixin],
  props: {
    invoiceId: { type: Number, default: 0 },
    caseId: { type: Number, default: 0 },
    caseName: { type: String, default: '' },
    caseNumber: { type: String, default: '' }
  },
  data() {
    return {
      fields,
      rulesForm,
      summaryMethod
    }
  },
  watch: {
    'postForm.enterPrice': function (val) {
      this.postForm.enterPrice = controlInputPrice(val)
    }
  },
  created() {
    this.getList() // startHandle在ListMixin和DetailMixin中会重复使用
  },
  methods: {
    getList() {
      caseApi.enterList({ cid: this.caseId }).then(({ code, data }) => {
        if (code === 200) {
          this.tableData = [...data]
          this.tableLoading = false
        }
      })
    },
    enterRemove(eid, cid, fid) {
      caseApi.enterRemove({ eid, cid, fid }).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.getList()
          this.$emit('enterSuccess')
        }
      })
    },
    invoiceEnter() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            caseApi
              .invoiceEnter({
                ...this.postForm,
                ...{ caseName: this.caseName, caseNumber: this.caseNumber },
                ...{ id: this.invoiceId }
              })
              .then(({ code, msg, data }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.tableData.push(data)
                  this.$emit('enterSuccess')
                  this.submitLoadingClose()
                }
              })
              .catch(() => {
                this.submitLoadingClose()
              })
          } else {
            this.validateErrHandle(fields)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
