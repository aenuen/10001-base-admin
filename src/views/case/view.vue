<template>
  <div class="app-container">
    <div style="width: 100%; text-align: center">
      <el-button class="el-icon-printer" @click="printTable('printContentView', '收案审批单', tablePrintStyle)">打印收案审批单</el-button>
    </div>
    <div id="printContentView" style="width: 900px; margin: auto">
      <div style="text-align: right; line-height: 50px">{{ postForm.createTimestamp | timeFormat('{y}年{m}月{d}日', true) }}</div>
      <table>
        <tr>
          <td style="text-align: right; width: 150px">案由：</td>
          <td>{{ postForm.why }}</td>
          <td style="text-align: right">类型：</td>
          <td>{{ postForm.type }}</td>
          <td style="text-align: right">案号：</td>
          <td>{{ `${postForm.caseName}字${postForm.caseNumber}号` }}</td>
        </tr>
        <tr>
          <td style="text-align: right">委托人：</td>
          <td>{{ postForm.client }}</td>
          <td colspan="2" style="text-align: right">对方当事人：</td>
          <td colspan="2">{{ postForm.oppositeLitigant }}</td>
        </tr>
        <tr>
          <td rowspan="3" style="text-align: right">当事人：</td>
          <td colspan="5">姓名或单位名称：{{ postForm.name }}</td>
        </tr>
        <tr>
          <td colspan="5">证件号码：{{ `${postForm.idType}(${postForm.idNumber})` }}</td>
        </tr>
        <tr>
          <td colspan="5">当事方：{{ postForm.parties }}</td>
        </tr>
        <tr>
          <td style="text-align: right">争议标的额：</td>
          <td colspan="2">{{ postForm.disputePrice || '--' }}</td>
          <td colspan="2" style="text-align: right">律师代理费：</td>
          <td>{{ postForm.price }}</td>
        </tr>
        <tr>
          <td style="text-align: right">代理权限：</td>
          <td colspan="5">见授权委托书</td>
        </tr>
        <tr>
          <td style="text-align: right">代理期限：</td>
          <td colspan="5">至 {{ postForm.caseName }} 诉讼活动结束止</td>
        </tr>
        <tr>
          <td style="text-align: right">受理部门：</td>
          <td colspan="5">{{ postForm.department }}</td>
        </tr>
        <tr>
          <td style="text-align: right">审批：</td>
          <td colspan="3">李宁</td>
          <td style="text-align: right">承办律师：</td>
          <td>{{ postForm.createRealName }}</td>
        </tr>
        <tr>
          <td style="text-align: right">备注：</td>
          <td colspan="5">
            <div style="min-height: 150px">{{ postForm.memo }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
// api
import { caseApi } from '@/api/case'
// components
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { timeFormat } from 'abbott-methods/import'
import { printTable, tablePrintStyle } from '@/libs/print'
// settings
export default {
  name: 'CaseView',
  filters: {
    timeFormat
  },
  components: {},
  mixins: [DetailMixin],
  data() {
    return {
      isUpdate: true,
      printTable,
      tablePrintStyle
    }
  },
  methods: {
    // 获取案件详情
    startHandle() {
      if (this.isUpdate) {
        caseApi.detail({ id: this.updateId }).then(({ code, data }) => {
          if (code === 200) {
            const { detail } = data
            this.postForm = { ...detail }
            console.log('🚀 ~ file: view.vue ~ line 35 ~ caseApi.detail ~ this.postForm', this.postForm)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/tablePrintStyle.scss';
</style>
