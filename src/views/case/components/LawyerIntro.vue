<!--suppress HtmlDeprecatedAttribute -->
<template>
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
      <td>{{ (+memberPersonal).toFixed(2) }}</td>
      <td align="right">会员费律所：</td>
      <td>0.00</td>
      <td align="right">互助基金</td>
      <td>0.00</td>
      <td align="right">商业保险</td>
      <td>0.00</td>
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
      <td>{{ isFree ? '0.00' : '每月：10000 / 3 = 3333.33' }}</td>
      <td align="right">办公房间租赁费</td>
      <td>{{ '每月：' + (+rental).toFixed(2) }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'ViewsCaseComponentsIntro',
  props: {
    rental: { type: Number, default: 0 },
    name: { type: String, default: '' },
    memberPersonal: { type: Number, default: 0 }
  },
  computed: {
    isFree() {
      return this.name === '许永云' || this.name === '关怀' || this.name === '梁泓燕' || this.name === '洪德文'
    }
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
