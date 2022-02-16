<!--suppress HtmlDeprecatedAttribute -->
<template>
  <table class="info">
    <tr>
      <td align="right">管理费</td>
      <td>{{ data.manage }}</td>
      <td align="right">社保医保</td>
      <td>{{ (data.welfare).toFixed(2) }}</td>
      <td align="right">工资</td>
      <td>{{ data.subtotal01 }}</td>
      <td align="right">个税</td>
      <td>{{ data.myIncomeTax }}</td>
      <td align="right">增值税款</td>
      <td>{{ data.VAT }}</td>
    </tr>
    <tr>
      <td align="right">会计</td>
      <td>{{ data.accounting }}</td>
      <td align="right">财务</td>
      <td>{{ data.finance }}</td>
      <td align="right">税点</td>
      <td>{{ data.taxPoint }}</td>
      <td align="right">会员费个人</td>
      <td>{{ data.memberPersonal }}</td>
      <td align="right">会员费律所</td>
      <td>{{ data.memberCompany }}</td>
    </tr>
    <tr>
      <td align="right">互助基金</td>
      <td>{{ data.mutualFund }}</td>
      <td align="right">商业保险</td>
      <td>{{ data.commercialInsurance }}</td>
      <td align="right">医疗补充保险</td>
      <td>{{ data.supplementaryInsurance }}</td>
      <td align="right">残疾人就业基金</td>
      <td>{{ data.employmentFund }}</td>
      <td align="right">工会</td>
      <td>{{ data.labourUnion }}</td>
    </tr>
    <tr>
      <td align="right">附加费</td>
      <td colspan="1">{{ data.additional }}</td>
      <td align="right">软件费</td>
      <td colspan="1">{{ data.soft }}</td>
      <td align="right">办公房间租赁费</td>
      <td colspan="1">{{ data.rental }}</td>
      <td align="right">律所已支付</td>
      <td colspan="1">{{ data.payed }}</td>
      <td align="right">总计</td>
      <td colspan="1">{{ data.total }}</td>
    </tr>
    <tr>
      <td align="right" style="background:#f5f7fa">进账</td>
      <td colspan="1" style="background:#f5f7fa">{{ data.enterPrice }}</td>
      <td align="right" style="background:#f5f7fa">律所应付(不包含未结清)</td>
      <td colspan="1" style="background:#f5f7fa">{{ (data.enterPrice - data.total - data.payed).toFixed(2) }}</td>
      <td align="right" style="background:#f5f7fa">未结清</td>
      <td colspan="1" style="background:#f5f7fa">{{ data.uncleared }}</td>
      <td colspan="6" style="background:#f5f7fa" />
    </tr>
  </table>
</template>

<script>
export default { // 结算信息
  name: 'ViewsCaseComponentsLawyerInfo',
  props: {
    data: { type: Object, default: () => {} }
  }
}
</script>

<style lang="scss" scoped>
table.info {
  width: 100%;
  color: #666;
  border: 1px solid #dfe6ec;
  border-collapse: collapse;
  line-height: 25px;

  th, td {
    border: 1px solid #dfe6ec;
    font-size: 14px;
    padding: 10px;
    background: #fff;
  }
}
</style>
