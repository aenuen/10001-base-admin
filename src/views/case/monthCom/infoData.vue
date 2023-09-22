<!--
 * @Author: abbott
 * @Date: 2022-11-14 16:31:15
 * @LastEditors: abbott
 * @LastEditTime: 2022-11-16 16:13:06
 * @Description:
-->
<template>
  <div>
    <table class="info">
      <tr>
        <td align="right">管理费</td>
        <td>{{ data.manage }}</td>
        <td align="right">社保医保</td>
        <td>{{ data.insuranceTotal }}</td>
        <td align="right">工资</td>
        <td>{{ data.salaryTotal }}</td>
        <td align="right">个税</td>
        <td>{{ data.myIncomeTax }}</td>
        <td align="right">增值税款</td>
        <td>{{ data.vatTotal }}</td>
      </tr>
      <tr>
        <td align="right">会计</td>
        <td>{{ data.accountantTotal }}</td>
        <td align="right">财务</td>
        <td>{{ data.financeTotal }}</td>
        <td align="right">税点</td>
        <td>{{ data.taxPointTotal }}</td>
        <td align="right">会员费个人</td>
        <td>{{ data.memberTotal }}</td>
        <td align="right">会员费律所</td>
        <td>{{ data.memberCompany }}</td>
      </tr>
      <tr>
        <td align="right">互助基金</td>
        <td>{{ data.mutualFund }}</td>
        <td align="right">商业保险</td>
        <td>{{ data.businessInsurance }}</td>
        <td align="right">医疗补充保险</td>
        <td>{{ data.medicalInsurance }}</td>
        <td align="right">残疾人就业基金</td>
        <td>{{ data.employmentFund }}</td>
        <td align="right">工会</td>
        <td>{{ data.labourUnion }}</td>
      </tr>
      <tr>
        <td align="right">附加费</td>
        <td colspan="1">{{ data.surcharges }}</td>
        <td align="right">软件费</td>
        <td colspan="1">{{ data.soft }}</td>
        <td align="right">办公房间租赁费</td>
        <td colspan="1">{{ data.rentals }}</td>
        <td align="right">律所已支付</td>
        <td colspan="1">{{ data.payTotal }}</td>
        <td align="right">总计</td>
        <td colspan="1">{{ data.total }}</td>
      </tr>
      <tr>
        <td align="right" style="background: #f5f7fa">进账</td>
        <td colspan="1" style="background: #f5f7fa">{{ data.enterTotal }}</td>
        <td align="right" style="background: #f5f7fa">律所应付(不包含未结清)</td>
        <td colspan="1" style="background: #f5f7fa">{{ data.needPay }}</td>
        <td align="right" style="background: #f5f7fa">未结清</td>
        <td colspan="1" style="background: #f5f7fa">{{ data.unclearedTotal }}</td>
        <template v-if="data.otherItem">
          <td align="right" style="background: #f5f7fa">去年案件到账</td>
          <td colspan="1" style="background: #f5f7fa">{{ data.residue }}</td>
          <td colspan="4" style="background: #f5f7fa" />
        </template>
      </tr>
    </table>
    <div style="height: 20px" />
    <table class="info">
      <tr>
        <td align="right">管理费</td>
        <td>案件总额 * 0.05</td>
        <td align="right">增值税款</td>
        <td>案件总额 / 1.01 * 0.01</td>
        <td align="right">会计</td>
        <td>{{ isFree ? '0.00' : '每月：2000 / 3 = 666.67' }}</td>
        <td align="right">财务</td>
        <td>{{ isFree ? '0.00' : '每月：6000 / 3 = 2000.00' }}</td>
        <td align="right">税点</td>
        <td>案件总额 / 1.01 * 0.01</td>
      </tr>
      <tr>
        <td align="right">会员费个人</td>
        <td>每年：{{ +data.memberTotal }}</td>
        <td align="right">会员费律所：</td>
        <td>0.00</td>
        <td align="right">互助基金</td>
        <td>100/年</td>
        <td align="right">商业保险</td>
        <td>180/年</td>
        <td align="right">医疗补充保险</td>
        <td>0.00</td>
      </tr>
      <tr>
        <td align="right">残疾人就业基金</td>
        <td>案件总额*0.01</td>
        <td align="right">工会</td>
        <td>{{ isFree ? '每月：工资 * 0.025' : '0.00' }}</td>
        <td align="right">附加费</td>
        <td>增值税款 * 0.125</td>
        <td align="right">软件费</td>
        <td>{{ isFree ? '0.00' : '每年：10000 / 3人 = 3333.33' }}</td>
        <td align="right">办公房间租赁费</td>
        <td>每月：{{ rental ? '3000.00' : '0.00' }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  components: {},
  props: {
    data: { type: Object, default: () => ({}) }
  },
  data() {
    return {}
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

  th,
  td {
    border: 1px solid #dfe6ec;
    font-size: 14px;
    padding: 10px;
    background: #fff;
  }
}
</style>
