<template>
  <div>
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="why" :label="`${fields['why']}`" :label-width="labelWidth">
            <el-input v-model="postForm.why" maxlength="30" show-word-limit :placeholder="`${fields['why']}`" prefix-icon="el-icon-edit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="type" :label="`${fields['type']}`" :label-width="labelWidth">
            <el-select v-model="postForm.type" :placeholder="`${fields['type']}`" :disabled="id>0" clearable @change="typeChange">
              <el-option v-for="item in typeObject" :key="item['key']" :label="item['value']" :value="item['value']" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="client" :label="`${fields['client']}`" :label-width="labelWidth">
            <el-input v-model="postForm.client" :placeholder="`${fields['client']}`" prefix-icon="el-icon-user-solid" clearable maxlength="30" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="oppositeLitigant" :label="`${fields['oppositeLitigant']}`" :label-width="labelWidth">
            <el-input v-model="postForm.oppositeLitigant" :placeholder="`${fields['oppositeLitigant']}`" prefix-icon="el-icon-user" clearable maxlength="30" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="name" :label="`${fields['name']}`" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="`${fields['name']}`" prefix-icon="el-icon-school" clearable maxlength="30" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="idType" :label="`${fields['idType']}`" :label-width="labelWidth">
            <el-select v-model="postForm.idType" :placeholder="`${fields['idType']}`" clearable>
              <el-option v-for="item in idTypeObject" :key="item['key']" :label="item['value']" :value="item['value']" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="litigant" :label="`${fields['idNumber']}`" :label-width="labelWidth">
            <el-input v-model="postForm.idNumber" maxlength="30" show-word-limit prefix-icon="el-icon-postcard" clearable :placeholder="`${fields['idNumber']}`" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="parties" :label="`${fields['parties']}`" :label-width="labelWidth">
            <el-input v-model="postForm.parties" maxlength="30" show-word-limit prefix-icon="el-icon-s-custom" clearable :placeholder="`${fields['parties']}`" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="stage" :label="`${fields['stage']}`" :label-width="labelWidth">
            <el-select ref="stage" v-model="postForm.stage" :placeholder="`${fields['stage']}`" :disabled="id>0" clearable>
              <el-option v-for="item in stageObject" :key="item['key']" :label="item['value']" :value="item['value']" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="disputePrice" :label="`${fields['disputePrice']}`" :label-width="labelWidth">
            <el-input v-model="postForm.disputePrice" :placeholder="`${fields['disputePrice']}，单位元`" prefix-icon="el-icon-money" clearable maxlength="30" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="price" :label="`${fields['price']}`" :label-width="labelWidth">
            <el-input v-model="postForm.price" :placeholder="`${fields['price']}，单位元`" prefix-icon="el-icon-money" clearable maxlength="30" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="`${fields['power']}`" :label-width="labelWidth">
            <el-input value="详见授权委托书" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${fields['term']}`" :label-width="labelWidth">
            <el-input v-model="termText" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label="`${fields['department']}`" :label-width="labelWidth">
            <el-input v-model="postForm.department" :placeholder="`${fields['department']}`" prefix-icon="el-icon-s-check" clearable maxlength="30" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label="fields.memo" :label-width="labelWidth">
            <el-input v-model="postForm.memo" :placeholder="fields.memo" :rows="6" type="textarea" maxlength="300" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button :loading="submitLoading" :disabled="submitLoading" type="primary" @click="submitValidate">保存，下一步
            </el-button>
            <el-button v-show="postForm.id" type="success" @click="submitNext">下一步</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { pmControlInput, pmValidate } from 'plugins-methods'
import { fields, idTypeObject, stageOne, stageTwo, stageThree, stageZero, typeObject } from './config'
import { caseData, caseInsert, caseUpdate } from '@/api/case'

export default {
  name: 'ViewsCaseStepOne', /* 组件名称 */
  data() { /* 定义数据 */
    return {
      postForm: { idType: '身份证', isRisk: '0' },
      rulesForm: {
        why: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['why']) }],
        client: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['client']) }],
        name: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['name']) }],
        idType: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['idType']) }],
        idNumber: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['idNumber']) }],
        parties: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['parties']) }],
        price: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['price']) }],
        department: [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['department']) }]
      },
      fields,
      typeObject,
      idTypeObject,
      stageObject: [],
      stageZero,
      stageOne,
      stageTwo,
      stageThree: stageThree,
      labelWidth: '200px',
      submitLoading: false,
      id: 0
    }
  },
  computed: { /* 计算属性 */
    termText() {
      const text = this.postForm.type || ''
      return `至 ${text} 诉讼活动结束止`
    }
  },
  watch: { /* 监控值变换 */
    'postForm.idNumber': function(value) {
      this.postForm.idNumber = pmControlInput.controlInputNumberSpace(value, 4)
    },
    'postForm.disputePrice': function(value) {
      this.postForm.disputePrice = pmControlInput.controlInputPrice(value)
    },
    'postForm.price': function(value) {
      this.postForm.price = pmControlInput.controlInputPrice(value)
    }
  },
  mounted() { /* 渲染后运行 */
    const getId = this.$route.params.id
    if (getId && +getId !== 0 && getId > 0) {
      this.id = getId
      this.getDate()
    } else {
      const validateInStage = (rule, value, callback) => {
        const stageString = JSON.stringify(this.stageObject)
        if (stageString.indexOf(value) > -1) {
          callback()
        } else {
          callback(new Error(`${this.fields['stage']}不在选项内`))
        }
      }
      this.rulesForm.type = [{ validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['type']) }]
      this.rulesForm.stage = [
        { validator: validateInStage },
        { validator: (rule, value, callback) => pmValidate.validateRequire(rule, value, callback, fields['stage']) }
      ]
    }
  },
  created() { /* 创建后运行 */
    this.stageObject = this.stageZero
  },
  methods: { /* 函数及方法 */
    getDate() {
      caseData({ id: this.id }).then(res => {
        const { data, msg } = res
        this.postForm = data
        this.$message.success(msg)
        this.$emit('onSubmitNext', data)
      }).catch(() => {
        this.$router.go(-1)
      })
    },
    typeChange(value) {
      if (value === '民事') {
        this.stageObject = this.stageOne
      } else if (value === '刑事' || value === '刑附民') {
        this.stageObject = this.stageTwo
      } else if (value === '行政') {
        this.stageObject = this.stageThree
      } else {
        this.stageObject = this.stageZero
      }
      this.$message.info(`${fields['type']}选择成功，请注意重新选择对应的${fields['stage']}`)
    },
    submitValidate() {
      if (!this.submitLoading) {
        this.submitLoading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.postForm.id) {
              this.submitUpdate()
            } else {
              this.$confirm(
                `保存下一步后将无法继续修改${this.fields['type']}和${this.fields['stage']}，是否继续`,
                '提示',
                { type: 'warning' }
              ).then(() => {
                this.submitCreate()
              }).catch(() => {
                this.submitLoading = false
              })
            }
          } else {
            const message = pmValidate.validateErrMsg(fields)
            this.$message.error(message)
            this.submitLoading = false
          }
        })
      }
    },
    submitUpdate() {
      caseUpdate(this.postForm).then(res => {
        const { msg } = res
        this.$notify({ title: `更新信息`, message: msg, type: 'success', duration: 2000 })
        this.submitNext()
      })
    },
    submitCreate() {
      console.log(this.postForm.type)
      const type = this.postForm.type
      const price = +this.postForm.price
      if (type !== '援助' && price && price < 5000) {
        this.$message.error(`${fields.price}低于5000无法审核`)
        this.submitLoading = false
      } else {
        caseInsert(this.postForm).then(res => {
          const { data, msg } = res
          this.$notify({ title: `入录信息`, message: msg, type: 'success', duration: 2000 })
          this.$router.push({ path: `create/${data}` })
          this.submitLoading = false
        }).catch(() => {
          this.submitLoading = false
        })
      }
    },
    submitNext() {
      this.submitLoading = false
      this.$emit('onSubmitNext')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
