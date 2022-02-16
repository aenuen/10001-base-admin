<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <el-table :key="tableKey" :data="showList" fit show-summary highlight-current-row style="width: 100%">
      <el-table-column :label="`${fields['id']}`" prop="id" align="center" width="80" />
      <el-table-column :label="`${fields['company']}`" prop="company" align="center" width="80" />
      <el-table-column :label="`${fields['area']}`" prop="area" align="center" />
      <el-table-column :label="`${fields['name']}`" prop="name" align="center" />
      <el-table-column :label="`${fields['type']}`" align="center">
        <template slot-scope="{row:{type}}">{{ type|emptyValueFilter }}</template>
      </el-table-column>
      <el-table-column :label="`${fields['price']}`" prop="price" align="center" />
      <el-table-column :label="`${fields['number']}`" prop="number" align="center" />
      <el-table-column :label="`${fields['subtotal']}`" prop="subtotal" align="center" />
    </el-table>
    <div style="padding:10px;margin:30px auto">
      <el-form ref="postForm" :model="postForm" :rules="rulesForm">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="outUnit" :label="`${fields['outUnit']}`" :label-width="labelWidth">
              <el-input v-model="postForm.outUnit" :placeholder="`${fields['outUnit']}`" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="outBill" :label="`${fields['outBill']}`" :label-width="labelWidth">
              <el-input v-model="postForm.outBill" :placeholder="`${fields['outBill']}`" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="text-align: center">
      <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" class="el-icon-truck" @click="submitOut">提交出库</el-button>
    </div>
  </div>
</template>
<script>
import { pmValidate } from 'plugins-methods'
import { fields } from './config'
import { emptyValueFilter } from '@/libs/filter'
import { reserveOut } from '@/api/reserve'

export default {
  name: 'ViewsReserveComponentsOutCar',
  components: { /* 引用组件 */
  },
  filters: { // 过滤器
    emptyValueFilter
  },
  directives: { // 自定义指令
  },
  props: { // 定义传值
    showList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() { // 定义数据
    return {
      fields: fields,
      tableKey: 1,
      postForm: {},
      rulesForm: {
        outUnit: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['outUnit']) }],
        outBill: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['outBill']) }]
      },
      labelWidth: '120px',
      submitLoading: false
    }
  },
  computed: { // 计算属性
  },
  watch: { // 监控值变换
    showList: {
      handler(value) {
        this.showList = value
        this.postForm.list = value
      },
      immediate: true
    }
  },
  mounted() { // 渲染后运行
  },
  created() { // 渲染时运行
  },
  methods: { // 方法函数
    submitOut() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            this.$confirm(
              '请确认出库信息，在提交之后将无法修改。确定是否继续吗？',
              '出库提示',
              { type: 'warning' }
            ).then(() => {
              reserveOut(this.postForm).then(res => {
                const { msg } = res
                this.$message.success(msg)
                this.$refs.postForm.resetFields()
                this.submitLoading = false
                this.$emit('onOutCarSuccess')
              }).catch(() => {
                this.submitLoading = false
              })
            }).catch(() => {
            })
          } else {
            const msg = pmValidate.validateErrMsg(fields)
            this.$message.error(msg)
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
