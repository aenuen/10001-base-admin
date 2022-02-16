<template>
  <div class="app-container">
    <div style="width:100%;text-align:center">
      <el-button class="el-icon-printer" @click="printContent">打印收案审批单</el-button>
    </div>
    <div id="printContentView" style="width:800px;margin:auto">
      <div style="text-align: right;line-height:50px">{{ postForm.createTimestamp }}</div>
      <table>
        <tr>
          <td style="text-align:right">案由：</td>
          <td>{{ postForm.why }}</td>
          <td style="text-align:right">类型：</td>
          <td>{{ postForm.type }}</td>
          <td style="text-align:right">案号：</td>
          <td>{{ `${postForm.caseName}字${postForm.caseNumber}号` }}</td>
        </tr>
        <tr>
          <td style="text-align:right">委托人：</td>
          <td>{{ postForm.client }}</td>
          <td colspan="2" style="text-align:right">对方当事人：</td>
          <td colspan="2">{{ postForm.oppositeLitigant }}</td>
        </tr>
        <tr>
          <td rowspan="3" style="text-align:right">当事人：</td>
          <td colspan="5">姓名或单位名称：{{ postForm.name }}</td>
        </tr>
        <tr>
          <td colspan="5">证件号码：{{ `${postForm.idType} ${postForm.idNumber}` }}</td>
        </tr>
        <tr>
          <td colspan="5">当事方：{{ postForm.parties }}</td>
        </tr>
        <tr>
          <td style="text-align:right">争议标的额：</td>
          <td colspan="2">{{ postForm.disputePrice }}</td>
          <td colspan="2" style="text-align:right">律师代理费：</td>
          <td>{{ postForm.price }}</td>
        </tr>
        <tr>
          <td style="text-align:right">代理权限：</td>
          <td colspan="5">见受权委托书</td>
        </tr>
        <tr>
          <td style="text-align:right">代理期限：</td>
          <td colspan="5">至 {{ postForm.caseName }} 诉讼活动结束止</td>
        </tr>
        <tr>
          <td style="text-align:right">受理部门：</td>
          <td colspan="5">{{ postForm.department }}</td>
        </tr>
        <tr>
          <td style="text-align:right">审批：</td>
          <td colspan="3">李宁</td>
          <td style="text-align:right">承办律师：</td>
          <td>{{ postForm.createRealName }}</td>
        </tr>
        <tr>
          <td style="text-align:right">备注：</td>
          <td colspan="5">
            <div style="height:150px">{{ postForm.memo }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { pmTime } from 'plugins-methods'
import { caseData } from '@/api/case'
import print from 'print-js'

export default {
  name: 'ViewsCaseView',
  filters: { /* 过滤器 */
  },
  data() {
    return {
      postForm: {},
      id: 0
    }
  },
  mounted() { /* 渲染后运行 */
    const getId = this.$route.params.id
    if (getId && +getId !== 0 && getId > 0) {
      this.id = getId
      this.getDate()
    } else {
      this.error()
    }
  },
  methods: { /* 函数及方法 */
    getDate() {
      caseData({ id: this.id }).then(res => {
        const { data } = res
        if (data.createTimestamp) {
          data.createTimestamp = pmTime.timeFormat(data.createTimestamp, '{y}年{m}月{d}日', true)
        }
        this.postForm = data
      }).catch(() => {
        this.error()
      })
    },
    error() {
      this.$message.error('未能找所需的数据')
      this.$router.go(-1)
    },
    printContent() {
      print({
        printable: 'printContentView',
        type: 'html',
        header: '收案审批单',
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table{width:100%;color:#333;border-width:1px;border-color:#666;border-collapse:collapse;}table td{border-width:1px;padding:10px;border-style:solid;border-color:#666;background-color:#fff;line-height:25px;}'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  color: #333;
  border-width: 1px;
  border-color: #666;
  border-collapse: collapse;

  th, td {
    border-width: 1px;
    padding: 10px;
    border-style: solid;
    border-color: #666;
    background-color: #fff;
    line-height: 25px;
  }
}
</style>
