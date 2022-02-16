<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="expressCompany" :label="fields.expressCompany" :label-width="labelWidth">
            <el-select v-model="postForm.expressCompany" :placeholder="fields.expressCompany" clearable style="width: 100%">
              <el-option v-for="(item,index) in expressCompanyAry" :key="index" :label="item.value" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="expressId" :label="fields.expressId" :label-width="labelWidth">
            <el-input v-model="postForm.expressId" :placeholder="fields.expressId" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sendTime" :label="fields.sendTime" :label-width="labelWidth">
            <el-date-picker
              v-model="postForm.sendTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              :placeholder="fields.sendTime"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sendCompany" :label="fields.sendCompany" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.sendCompany"
              :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.sendCompany)"
              :placeholder="fields.sendCompany"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sender" :label="fields.sender" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.sender"
              :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.sender)"
              :placeholder="fields.sender"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="content" :label="fields.content" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.content"
              :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.content)"
              :placeholder="fields.content"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="details" :label="fields.details" :label-width="labelWidth">
            <el-input v-model="postForm.details" :placeholder="fields.details" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="memo" :label="fields.memo" :label-width="labelWidth">
            <el-input v-model="postForm.memo" :placeholder="fields.memo" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="cityCn" :label="fields.cityCn" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.cityCn"
              :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.cityCn)"
              :placeholder="fields.cityCn"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="address" :label="fields.address" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.address"
              :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.address)"
              :placeholder="fields.address"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="recipientCompany" :label="fields.recipientCompany" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.recipientCompany"
              :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.recipientCompany)"
              :placeholder="fields.recipientCompany"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="recipients" :label="fields.recipients" :label-width="labelWidth">
            <el-autocomplete
              v-model="postForm.recipients"
              :fetch-suggestions="(q,c) => autoQuery(q,c,onceAry.recipients)"
              :placeholder="fields.recipients"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="labelWidth">
            <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="create">
              {{ isEdit ? '快递编辑' : '快递录入' }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import Fields from '../modules/fields'
import Data_expressAry from '../modules/data_expressAry'
import Data_ruleForm from '../modules/data_ruleForm'
import Data_onceAry from '../modules/data_onceAry'
import { autoQuery, pmValidate } from 'plugins-methods'
import { expressOnce, expressDetail, expressCreate, expressUpdate } from '@/api/express'

export default {
  name: 'Detail',
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isEdit: { type: Boolean, default: false }
  },
  data() {
    return {
      fields: Fields,
      expressCompanyAry: Data_expressAry,
      ruleForm: Data_ruleForm,
      onceAry: Data_onceAry
    }
  },
  mounted() {
    this.getMemo()
  },
  methods: {
    create() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.isEdit) {
              expressUpdate(this.postForm).then(({ code, msg }) => {
                if (code === 0) {
                  this.$message.success(msg)
                  this.routerGo('/express/list')
                } else {
                  this.$message.success(msg)
                  this.submitLoading = false
                }
              })
            } else {
              expressCreate(this.postForm).then(({ code, msg }) => {
                if (code === 0) {
                  this.$message.success(msg)
                  this.routerGo('/express/list')
                } else {
                  this.$message.success(msg)
                  this.submitLoading = false
                }
              })
            }
          } else {
            const msg = pmValidate.validateErrMsg(fields)
            this.$message.error(msg)
            this.submitLoading = false
          }
        })
      }
    },
    getDetail() {
      expressDetail({ id: this.updateId }).then(({ code, data }) => {
        if (code === 0) {
          this.postForm = { ...data }
        } else {
          this.$message.error('未能找到所需的数据')
          this.routerClose('/express/list')
        }
      })
    },
    autoQuery(queryString, callback, array) {
      autoQuery(queryString, callback, array)
    },
    getMemo() {
      expressOnce().then(({ code, data }) => {
        if (code === 0) {
          this.onceAry = { ...data }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
