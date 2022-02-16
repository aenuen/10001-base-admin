<!--suppress RegExpSingleCharAlternation -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-alert v-if="!isEdit" title="此页面主要功能为新产品的录入，若有产品需增加库存数量请至库存列表页面中去处理。" type="warning" show-icon />
    </div>
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="company" :label="fields['company']" :label-width="labelWidth">
            <el-select v-model="postForm.company" :placeholder="fields['company']">
              <el-option v-for="(value,index) in companyArray" :key="index" :value="value" :label="value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="area" :label="fields['area']" :label-width="labelWidth">
            <el-select v-model="postForm.area" :placeholder="fields['area']">
              <el-option v-for="(value,index) in areaArray" :key="index" :value="value" :label="value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="name" :label="`${fields['name']}`" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields['name']" clearable>
              <template slot="append">
                <el-button @click="parseName">解析</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="type" :label="`${fields['type']}`" :label-width="labelWidth">
            <el-input v-model="postForm.type" :placeholder="fields['type']" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isEdit">
        <el-col :span="12">
          <el-form-item prop="number" :label="`${fields['number']}`" :label-width="labelWidth">
            <el-input v-model="postForm.number" :placeholder="fields['number']" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="amount" :label="`${fields['amount']}`" :label-width="labelWidth">
            <el-input v-model="postForm.amount" :placeholder="fields['amount']" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isEdit">
        <el-col :span="24">
          <el-form-item :label="`${fields['price']}`" :label-width="labelWidth">
            <el-input v-model="price" :placeholder="fields['price']" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isEdit">
        <el-col :span="12">
          <el-form-item prop="unit" :label="`${fields['unit']}`" :label-width="labelWidth">
            <el-input v-model="postForm.unit" :placeholder="fields['unit']" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bill" :label="`${fields['bill']}`" :label-width="labelWidth">
            <el-input v-model="postForm.bill" :placeholder="fields['bill']" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <div :style="{'margin-left':labelWidth}">
        <el-button
          v-loading="submitLoading"
          :disabled="submitLoading"
          type="primary"
          class="el-icon-plus"
          @click="submitCreate"
        >
          {{ submitText }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { pmControlInput, pmValidate } from 'plugins-methods'
import { fields, companyArray, areaArray, postForm } from './config'
import { reserveExist, reserveCreate, reserveData, reserveEdit } from '@/api/reserve'

export default {
  name: 'ViewsReserveComponentsDetail',
  components: { // 引用组件
  },
  filters: { // 过滤器
  },
  directives: { // 自定义指令
  },
  props: { // 定义传值
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() { // 定义数据
    return {
      fields: fields,
      companyArray: companyArray,
      areaArray: areaArray,
      postForm: postForm,
      rulesForm: {
        company: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['company'], '选择') }],
        area: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['area'], '选择') }],
        name: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['name']) }],
        number: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['number']) }],
        amount: [{ validator: (rule, value, callback) => pmValidate.validatePrice(rule, value, callback, fields['amount']) }]
      },
      labelWidth: '120px',
      submitLoading: false,
      submitText: '提交入库',
      editId: 0
    }
  },
  computed: { // 监控自定义的变量
    price() {
      return this.postForm.amount && this.postForm.number ? (+this.postForm.amount / +this.postForm.number).toFixed(2) : 0
    }
  },
  watch: { // 监控值变换
    'postForm.amount': function(value) {
      this.postForm.amount = pmControlInput.controlInputPrice(value)
    }
  },
  mounted() { // 渲染后运行
  },
  created() { // 渲染时运行
    const editId = +this.$route.params.id
    if (this.isEdit && editId > 0) {
      this.editId = editId
      this.submitText = '编辑库存'
      this.getDate()
    }
  },
  methods: { // 方法函数
    getDate() {
      reserveData({ id: this.editId }).then(res => {
        const { data } = res
        this.postForm = data
      })
    },
    parseName() {
      const array = this.postForm.name.toString().match(/(\(|（)(.+?)(\)|）)$/g)
      if (array && array[0]) {
        this.postForm.name = this.postForm.name.replace(array[0], '')
        this.postForm.type = array[0].slice(1, -1)
      }
    },
    gotoList() {
      this.$refs.postForm.resetFields()
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push({ path: '/reserve/list' })
    },
    submitCreate() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.isEdit) {
              reserveEdit(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.gotoList()
              })
            } else {
              reserveExist(this.postForm).then(res => {
                const { data } = res
                const { code, id, msg } = data
                this.postForm.code = code
                this.postForm.id = id
                if (code === 1 && id === 0) {
                  this.$confirm(
                    `请确认信息正确，提交入库后将无法修改${this.fields['number']}及${this.fields['amount']}，是否确定继续?`,
                    `${msg}`,
                    { type: 'warning' }
                  ).then(() => {
                    reserveCreate(this.postForm).then(res => {
                      const { msg } = res
                      this.$message.success(msg)
                      this.gotoList()
                      this.submitLoading = false
                    }).catch(() => {
                      this.submitLoading = false
                    })
                  }).catch(() => {
                    this.submitLoading = false
                  })
                } else if (code === 2 && id > 0) {
                  this.$message.warning(`${msg}，暂无法提交，或请修改产品类型重新上传`)
                  this.submitLoading = false
                } else if (code === 3 && id > 0) {
                  this.$confirm(
                    `此次操作将视为增加产品数量,是否确定继续?`,
                    `${msg}`,
                    { type: 'warning' }
                  ).then(() => {
                    reserveCreate(this.postForm).then(res => {
                      const { msg } = res
                      this.$message.success(msg)
                      this.gotoList()
                      this.submitLoading = false
                    }).catch(() => {
                      this.submitLoading = false
                    })
                  }).catch(() => {
                    this.submitLoading = false
                  })
                }
              })
            }
          } else {
            const message = pmValidate.validateErrMsg(fields)
            this.$message.error(message)
            this.submitLoading = false
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
