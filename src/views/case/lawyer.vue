<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="queryList.yearMonth"
        type="month"
        class="filter-span"
        placeholder="请选择年月"
        value-format="yyyy-MM"
        :clearable="false"
        :picker-options="pickerOptions"
        @change="handleFilter"
      />
    </div>
    <div style="width: 100%">
      <div style="width:100px;float: left;">
        <el-tabs v-model="queryList.tabsCurrent" tab-position="left" @tab-click="tabsClick">
          <el-tab-pane v-for="item in nameList" :key="item.id" :label="item.realName" :name="`${item.id}`" />
        </el-tabs>
      </div>
      <div style="width: calc(100% - 100px);float:left;">
        <div :style="{'text-align': 'right'}">
          <el-button class="el-icon-plus" @click="addPayShow">{{ addButtonText }}</el-button>
          <el-button class="el-icon-printer" @click="printLawyerTable">打印{{ printText }}</el-button>
        </div>
        <div id="printLawyerTable" style="margin-bottom: 30px;">
          <lawyer-header
            :name="queryList.tabsName"
            :year-month="queryList.yearMonth"
            :year="+nowYear"
            :month-number="monthNumber"
          />
          <lawyer-table :data="tableData" />
          <div style="height:20px" />
          <lawyer-info :data="infoData" :month-number="+monthNumber" />
          <div style="height:20px" />
          <lawyer-intro
            :rental="infoData&&infoData.rental?+infoData.rental:0"
            :name="queryList.tabsName"
            :member-personal="+memberPersonal"
          />
          <div style="height:20px" />
          <lawyer-boon :salary="salary" />
          <other-info :data="otherInfoAry" />
        </div>
      </div>
    </div>
    <div v-if="addPayControl">
      <el-dialog :title="addButtonText" width="800px" :visible.sync="addPayControl">
        <add-pay
          :payed="+payed"
          :membered="+memberPersonal"
          :salary="+salaryMonth"
          :uncleared="+uncleared"
          :name="queryList.tabsName"
          :year="nowYear"
          :year-month="queryList.yearMonth"
          @onAddSuccess="onAddSuccess"
        />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import print from 'print-js'
import { pmTime, pmArray } from 'plugins-methods'
import { chain, evaluate } from 'mathjs'
import { parseData } from './components/config'
import LawyerHeader from './components/LawyerHeader'
import LawyerTable from './components/LawyerTable'
import LawyerInfo from './components/LawyerInfo'
import LawyerIntro from './components/LawyerIntro'
import LawyerBoon from './components/LawyerBoon'
import AddPay from './components/AddPay'
import OtherInfo from './components/OtherInfo'
import { userLawyer } from '@/api/user'
import { caseMonthCase, casePaySum } from '@/api/case'
import { salaryLawyer } from '@/api/salary'

export default {
  name: 'ViewsCaseCaseLawyer', // 律师统计
  components: { // 引用组件
    LawyerHeader,
    LawyerTable,
    LawyerInfo,
    LawyerIntro,
    LawyerBoon,
    AddPay,
    OtherInfo
  },
  data() { // 定义数据
    return {
      nameList: [],
      infoData: {
        welfare: 0, // 社保医保
        subtotal01: 0, // 工资
        myIncomeTax: 0, // 个税
        labourUnion: 0
      },
      queryList: {},
      pickerOptions: {
        disabledDate: (time) => time.getTime() < new Date('2021-06').getTime() || time.getTime() > new Date().getTime()
      },
      tableKey: 1,
      tableData: [],
      tableLoading: true,
      printText: '',
      salary: [],
      memberPersonal: 0,
      payed: 0,
      salaryMonth: 0,
      uncleared: 0,
      addButtonText: '增加数值',
      addPayControl: false,
      otherInfoAry: []
    }
  },
  computed: {
    isIn() {
      const name = this.queryList.tabsName
      return name === '许永云' || name === '关怀' || name === '梁泓燕' || name === '洪德文'
    },
    nowYear() {
      return ~~pmTime.timeFormat(`${this.queryList.yearMonth}-01`, '{y}')
    },
    monthNumber() {
      const month = ~~pmTime.timeFormat(`${this.queryList.yearMonth}-01`, '{m}')
      return this.nowYear === 2021 ? month - 5 : month
    }
  },
  mounted() { // 渲染后运行
    this.getMonthData()
  },
  beforeRouteUpdate(to, from, next) { // 路由更新前
    if (to.path === from.path) {
      const oldQuery = Object.assign({}, from.query)
      const newQuery = Object.assign({}, to.query)
      JSON.stringify(oldQuery) !== JSON.stringify(newQuery) && this.getMonthData()
    }
    next()
  },
  created() { // 渲染时运行
    this.parseQuery()
  },
  methods: { // 方法函数
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      const queryList = { yearMonth: pmTime.timeFormat(new Date(), '{y}-{m}') }
      this.queryList = { ...queryList, ...query }
    },
    handleFilter() {
      this.refresh()
    },
    refresh() {
      this.$router.push({ path: '/case/lawyer', query: this.queryList })
    },
    getMonthData() { // 从用户表中读取律师成员
      userLawyer().then(res => {
        const { data } = res
        if (data && data.length > 0) {
          this.nameList = data
          if (!this.queryList.tabsName) {
            this.queryList.tabsCurrent = `${data[0].id}`
            this.queryList.tabsName = `${data[0].realName}`
          }
          this.printText = `${this.queryList.tabsName}律师${this.queryList.yearMonth}统计表`
          this.getLawyerData()
        } else {
          this.nameList = []
          this.tableData = []
        }
      })
    },
    getLawyerData() { // 从案件中读取案件消息
      caseMonthCase({
        createRealName: this.queryList.tabsName,
        createYearMonth: this.queryList.yearMonth
      }).then(res => {
        const { data } = res
        data.forEach(item => { // 进帐总额
          item.price = item.price || 0
          item.enterPrice = item.enterDate ? item.inHave : 0
        })
        this.tableData = data
        this.tableLoading = false
        this.getPay()
      })
    },
    getPay() { // 获取律师已支付
      const jsonData = {
        name: this.queryList.tabsName,
        year: this.nowYear,
        yearMonth: this.queryList.yearMonth
      }
      casePaySum(jsonData).then((res) => {
        const { data } = res
        const { payTotal, memberTotal, salaryTotal, unclearedTotal } = data[0]
        this.payed = payTotal || '0'
        this.memberPersonal = memberTotal || '0'
        this.salaryMonth = salaryTotal || '0'
        this.uncleared = unclearedTotal || '0'
        this.getInfoData()
        const otherInfoObj = {}
        const otherInfoAry = data[1]
        Object.keys(otherInfoAry).forEach((key) => {
          const objKey = otherInfoAry[key]['yearMonth']
          if (otherInfoObj[objKey]) {
            otherInfoObj[objKey]['member'] = +otherInfoObj[objKey]['member'] + +otherInfoAry[key]['member']
            otherInfoObj[objKey]['pay'] = +otherInfoObj[objKey]['pay'] + +otherInfoAry[key]['pay']
            otherInfoObj[objKey]['salary'] = +otherInfoObj[objKey]['salary'] + +otherInfoAry[key]['salary']
            otherInfoObj[objKey]['uncleared'] = +otherInfoObj[objKey]['uncleared'] + +otherInfoAry[key]['uncleared']
          } else {
            otherInfoObj[objKey] = {
              name: otherInfoAry[key]['name'],
              yearMonth: otherInfoAry[key]['yearMonth'],
              member: +otherInfoAry[key]['member'],
              pay: +otherInfoAry[key]['pay'],
              salary: +otherInfoAry[key]['salary'],
              uncleared: +otherInfoAry[key]['uncleared']
            }
          }
        })
        const tempAry = []
        Object.keys(otherInfoObj).forEach((key) => { tempAry.push(otherInfoObj[key]) })
        this.otherInfoAry = pmArray.arrayOrderByField(tempAry, 'yearMonth', true) // 支付排序
      }).catch(() => {
        this.payed = 0
        this.getInfoData()
      })
    },
    getInfoData() { // 从薪资表中读取薪资消息
      salaryLawyer({ name: this.queryList.tabsName, yearMonth: this.queryList.yearMonth }).then(res => {
        let { data } = res
        this.salary = data
        data = parseData(data)
        const { value: welfare } = chain(data.myPension).add(data.myUnemployment).add(data.myMedicalCare).add(data.unPension)
          .add(data.unUnemployment).add(data.unMedicalCare).add(data.unBirth).add(data.unInjury) // 社医保
        const subtotal01 = (+this.salaryMonth).toFixed(2) // 工资
        const myIncomeTax = (+data.myIncomeTax).toFixed(2) // 个税
        let endTotal = 0 // 案件总额
        let enterPrice = 0 // 进帐总额
        this.tableData.forEach(item => {
          endTotal = evaluate(`${endTotal}+${item.price}`)
          enterPrice = evaluate(`${enterPrice}+${item.enterPrice}`)
        })
        const manage = (endTotal * 0.05).toFixed(2) // 管理费
        const VAT = (endTotal / 1.01 * 0.01).toFixed(2) // 增值税款
        let accounting = this.isIn ? '0' : 2000 / 3 // 会计
        accounting = (accounting * this.monthNumber).toFixed(2)
        let finance = this.isIn ? '0' : 6000 / 3 // 财务
        finance = (finance * this.monthNumber).toFixed(2)
        const taxPoint = (endTotal * 0.1).toFixed(2) // 税点
        const memberPersonal = (+this.memberPersonal).toFixed(2) // 会员费个人
        const memberCompany = (0).toFixed(2) // 会员费律所
        const mutualFund = (0).toFixed(2) // 互助基金
        const commercialInsurance = (0).toFixed(2) // 商业保险
        const supplementaryInsurance = (0).toFixed(2) // 医疗补充保险
        const employmentFund = (endTotal * 0.01).toFixed(2) // 残疾人就业基金
        let labourUnion = subtotal01 > 0 ? subtotal01 * 0.025 : 0 // 工会
        labourUnion = labourUnion.toFixed(2)
        const additional = (VAT * 0.125).toFixed(2) // 附加费
        let soft = this.isIn ? 0 : 10000 / 3
        soft = soft.toFixed(2)
        const rentalPeople = ['郭锦标']
        let rental = rentalPeople.includes(this.queryList.tabsName) ? 3000 : 0 // 办公房间租赁费
        rental = (rental * (this.monthNumber - 1)).toFixed(2)
        const payed = (+this.payed).toFixed(2)
        const uncleared = (+this.uncleared).toFixed(2)
        const { value: total } = chain(manage).add(welfare).add(+subtotal01).add(+myIncomeTax).add(+VAT).add(+accounting)
          .add(+finance).add(+taxPoint).add(+memberPersonal).add(+memberCompany).add(+memberCompany).add(+mutualFund).add(+commercialInsurance)
          .add(+supplementaryInsurance).add(+employmentFund).add(+labourUnion).add(+additional).add(+soft).add(+rental)
        this.infoData = {
          manage, welfare, subtotal01, myIncomeTax, VAT, accounting, finance, taxPoint,
          memberPersonal, memberCompany, mutualFund, commercialInsurance, supplementaryInsurance,
          employmentFund, labourUnion, additional, soft, rental, payed, uncleared, total, endTotal, enterPrice
        }
      })
    },
    tabsClick(tabs) {
      this.queryList.tabsCurrent = tabs.name
      this.queryList.tabsName = tabs.label
      this.refresh()
    },
    addPayShow() {
      this.addPayControl = true
    },
    onAddSuccess() {
      this.addPayControl = false
      this.queryList.timestamp = Math.random() * 10000
      this.refresh()
    },
    printLawyerTable() {
      const style = '#printLawyerTable td,#printLawyerTable th{border-collapse:collapse;padding:5px;border:1px #000 solid;text-align:center}' +
        '.info{ width:100%;color:#000;border:1px solid #333;border-collapse:collapse;line-height:25px;}' +
        '.info th,.info td{border:1px solid #333;font-size:14px;padding:5px;background:#fff;}.el-table_1_column_4{width:280px;}'
      print({
        printable: 'printLawyerTable', // 打印表格的ID
        type: 'html', // 打印类型
        header: this.printText,
        headerStyle: 'text-align:center;color:#f00;width:100%;', // 标题样式
        scanStyles: false, // 设置为false时，库不会处理应用于正在打印的html的样式。使用css参数时很有用。
        style // 样式，亦可引用外部样式
      })
    }
  }
}
</script>}

<style scoped lang="scss">
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

