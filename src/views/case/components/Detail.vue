<template>
  <el-form ref="postForm" :model="postForm" :rules="rulesDetail">
    <el-row>
      <el-col :span="12">
        <el-form-item prop="why" :label="fields.why" :label-width="labelWidth">
          <el-input v-model="postForm.why" maxlength="30" show-word-limit :placeholder="fields.why" prefix-icon="el-icon-edit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="type" :label="fields.type" :label-width="labelWidth">
          <el-select v-model="postForm.type" :placeholder="fields.type" clearable :disabled="isUpdate" @change="typeChange">
            <el-option v-for="item in typeAry" :key="item.key" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item prop="client" :label="fields.client" :label-width="labelWidth">
          <el-input v-model="postForm.client" :placeholder="fields.client" prefix-icon="el-icon-user-solid" clearable maxlength="30" show-word-limit />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="oppositeLitigant" :label="fields.oppositeLitigant" :label-width="labelWidth">
          <el-input v-model="postForm.oppositeLitigant" :placeholder="fields.oppositeLitigant" prefix-icon="el-icon-user" clearable maxlength="30" show-word-limit />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item prop="name" :label="fields.name" :label-width="labelWidth">
          <el-input v-model="postForm.name" :placeholder="fields.name" prefix-icon="el-icon-school" clearable maxlength="30" show-word-limit />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item prop="idType" :label="fields.idType" :label-width="labelWidth">
          <el-select v-model="postForm.idType" :placeholder="fields.idType" clearable>
            <el-option v-for="item in idTypeAry" :key="item.key" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="idNumber" :label="fields.idNumber" :label-width="labelWidth">
          <el-input v-model="postForm.idNumber" maxlength="30" show-word-limit prefix-icon="el-icon-postcard" clearable :placeholder="fields.idNumber" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item prop="parties" :label="fields.parties" :label-width="labelWidth">
          <el-input v-model="postForm.parties" maxlength="30" show-word-limit prefix-icon="el-icon-s-custom" clearable :placeholder="fields.parties" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="stage" :label="fields.stage" :label-width="labelWidth">
          <el-select ref="stage" v-model="postForm.stage" :placeholder="fields.stage" clearable :disabled="isUpdate">
            <el-option v-for="item in stageAry" :key="item.key" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item prop="disputePrice" :label="fields.disputePrice" :label-width="labelWidth">
          <el-tooltip :value="true" effect="dark" :content="disputePriceBig" placement="bottom-start" :manual="true">
            <el-input v-model="postForm.disputePrice" :placeholder="`${fields.disputePrice}，单位元`" prefix-icon="el-icon-money" clearable maxlength="30" show-word-limit />
          </el-tooltip>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="price" :label="fields.price" :label-width="labelWidth">
          <el-tooltip :value="true" effect="dark" :content="priceBig" placement="bottom-start" :manual="true">
            <el-input v-model="postForm.price" :placeholder="`${fields.price}，单位元`" prefix-icon="el-icon-money" clearable maxlength="10" show-word-limit />
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
    <div style="height: 30px" />
    <el-row>
      <el-col :span="12">
        <el-form-item :label="fields.power" :label-width="labelWidth">
          <el-input value="详见授权委托书" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="fields.term" :label-width="labelWidth">
          <el-input v-model="termText" :disabled="true" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item prop="department" :label="fields.department" :label-width="labelWidth">
          <el-input v-model="postForm.department" :placeholder="fields.department" prefix-icon="el-icon-s-check" clearable maxlength="30" show-word-limit />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-show="false">
      <el-col :span="12">
        <el-form-item prop="contract" :label="fields.contract" :label-width="labelWidth">
          <el-input v-model="postForm.contract" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="letter" :label="fields.letter" :label-width="labelWidth">
          <el-input v-model="postForm.letter" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item prop="memo" :label="fields.memo" :label-width="labelWidth">
          <el-input v-model="postForm.memo" :placeholder="fields.memo" :rows="3" type="textarea" maxlength="300" show-word-limit />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="isDevMode">
      <el-col :span="12">
        <el-form-item prop="contract" :label="fields.contract" :label-width="labelWidth">
          <el-input v-model="postForm.contract" :placeholder="fields.contract" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="letter" :label="fields.letter" :label-width="labelWidth">
          <el-input v-model="postForm.letter" :placeholder="fields.letter" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="合同及所函" :label-width="labelWidth">
          <OnlyOne ref="contract" :desc="(isUpdate ? '修改' : '上传') + '合同'" :show-update="isUpdate" action="/case/contractUpload" :data="{ cid: updateId, contractId: contractId }" style="margin-right: 20px" @onUploadSuccess="onContractUploadSuccess" @onUploadRemove="onContractUploadRemove" />
          <OnlyOne ref="letter" :desc="(isUpdate ? '修改' : '上传') + '所涵'" :show-update="isUpdate" action="/case/letterUpload" :data="{ cid: updateId, letterId }" style="margin-right: 20px" @onUploadSuccess="onLetterUploadSuccess" @onUploadRemove="onLetterUploadRemove" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label-width="labelWidth">
      <el-button :loading="submitLoading" :disabled="submitLoading" type="primary" @click="submitValidate">{{ btnText }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// api
import { caseApi } from '@/api/case'
// components
import OnlyOne from '@/components/Upload/onlyOne'
// data
import { isDevMode } from '@/settings'
import { fields } from '../modules/fields'
import { rulesDetail } from '../modules/rulesDetail'
import { typeAry, typeChange } from '../modules/typeAry'
import { idTypeAry } from '../modules/idTypeAry'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { controlInputPrice, numberPriceBigWrite, controlInputNumberSpace } from 'abbott-methods/import'
// settings
export default {
  components: { OnlyOne },
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isUpdate: Boolean
  },
  data() {
    return {
      isDevMode,
      labelWidth: '160px',
      fields,
      rulesDetail,
      typeAry,
      idTypeAry,
      stageAry: [],
      priceBig: '请输入',
      disputePriceBig: '请输入',
      contractId: 0,
      letterId: 0
    }
  },
  computed: {
    termText() {
      return `至 ${this.postForm.type || ''} 诉讼活动结束止`
    },
    btnText() {
      return this.isUpdate ? '编辑案件' : '新增案件'
    }
  },
  watch: {
    'postForm.idNumber': function (val) {
      this.postForm.idNumber = controlInputNumberSpace(val, 4)
    },
    'postForm.disputePrice': function (val) {
      this.postForm.disputePrice = controlInputPrice(val)
      this.disputePriceBig = numberPriceBigWrite(this.postForm.disputePrice)
    },
    'postForm.price': function (val) {
      this.postForm.price = controlInputPrice(val)
      this.priceBig = numberPriceBigWrite(this.postForm.price)
    }
  },
  created() {
    !this.isUpdate && this.getBase()
  },
  methods: {
    // 获取案件详情
    startHandle() {
      if (this.isUpdate) {
        caseApi.detail({ id: this.updateId }).then(({ code, data }) => {
          if (code === 200) {
            const { detail, contract, letter } = data
            this.postForm = { ...detail }
            this.setData(contract, letter)
          }
        })
      }
    },
    // 获取基本数据
    getBase() {
      caseApi.base().then(({ code, data }) => {
        if (code === 200) {
          const { contract, letter } = data
          this.postForm = {
            ...(contract.id ? { contract: contract.id } : {}),
            ...(letter.id ? { letter: letter.id } : {})
          }
          this.setData(contract, letter)
        }
      })
    },
    setData(contract, letter) {
      console.log('🚀 ~ file: Detail.vue ~ line 235 ~ setData ~ letter', letter)
      // 合同赋值
      if (contract?.file && contract?.name && contract?.id) {
        this.$refs.contract.fileUrl = contract.file
        this.$refs.contract.fileAlt = contract.name
        this.$refs.contract.fileId = contract.id
        this.postForm.contract = contract.id
        this.contractId = contract.id
      }
      // 所涵赋值
      if (letter?.file && letter?.name && letter?.id) {
        this.$refs.letter.fileUrl = letter.file
        this.$refs.letter.fileAlt = letter.name
        this.$refs.letter.fileId = letter.id
        this.postForm.letter = letter.id
        this.letterId = letter.id
      }
    },
    // 类型改变
    typeChange(value) {
      this.stageAry = typeChange(value)
      if (this.postForm.stage) {
        this.postForm.stage = ''
        this.$message.warning('请注意，案件类型已改变，请重新选择相应的代理阶段')
      }
    },
    // 新增案件
    submitValidate() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.isUpdate) {
              caseApi
                .update({
                  ...this.postForm
                })
                .then(({ code, msg }) => {
                  if (code === 200) {
                    this.$message.success(msg)
                    this.routerClose('/case/list')
                  } else {
                    this.$message.error(msg)
                  }
                })
                .catch(() => {
                  this.submitLoadingClose()
                })
            } else {
              caseApi
                .create(this.postForm)
                .then(({ code, msg }) => {
                  if (code === 200) {
                    this.$message.success(msg)
                    this.routerClose('/case/list')
                  } else {
                    this.$message.error(msg)
                  }
                })
                .catch(() => {
                  this.submitLoadingClose()
                })
            }
          } else {
            this.validateErrHandle(fields)
          }
        })
      }
    },
    // 合同上传成功
    onContractUploadSuccess(id) {
      this.postForm.contract = id
      console.log('🚀 ~ file: Detail.vue ~ line 292 ~ onContractUploadSuccess ~ this.postForm.contract', this.postForm.contract)
      this.contractId = id
    },
    // 删除合同
    onContractUploadRemove(id) {
      caseApi.contractRemove({ id }).then(({ code, msg }) => {
        if (code === 200) {
          this.postForm.contract = ''
          this.$refs.contract.clearFileUrl()
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 所函上传成功
    onLetterUploadSuccess(id) {
      this.postForm.letter = id
      console.log('🚀 ~ file: Detail.vue ~ line 310 ~ onLetterUploadSuccess ~ this.postForm.letter', this.postForm.letter)
      this.letterId = id
    },
    // 删除所函
    onLetterUploadRemove(id) {
      caseApi.letterRemove({ id }).then(({ code, msg }) => {
        if (code === 200) {
          this.postForm.letter = ''
          this.$refs.letter.clearFileUrl()
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
