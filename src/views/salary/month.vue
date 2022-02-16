<template>
  <div class="app-container">
    <div class="filter-container" style="overflow: hidden">
      <el-select v-model="queryList.getCompany" class="filter-item" :placeholder="`${fields['company']}`" @change="handleFilter">
        <el-option v-for="item in companyObject" :key="item['key']" :label="item['label']" :value="item['value']" />
      </el-select>
      <el-date-picker v-model="queryList.getYearMonth" type="month" class="filter-item" placeholder="选择月" value-format="yyyy-MM" :clearable="false" :picker-options="pickerOptions" @change="handleFilter" />
      <el-button type="primary" class="filter-item" @click="onAddMonth">选择增加人员</el-button>
      <el-checkbox v-model="showDelete" style="margin-left:10px">显示删除</el-checkbox>
      <el-checkbox v-model="showBatchUpdate" style="margin-left:10px">显示批量编辑</el-checkbox>
      <el-button v-show="showSave" type="primary" class="filter-item el-icon-document-copy" style="float:right;" @click="saveMonthData">保存现有数据到本月</el-button>
      <el-button v-show="showCover" v-loading="submitLoading" type="danger" class="filter-item el-icon-document-copy" style="width: 220px;float:right;" :disabled="submitLoading" @click="coverMonthData">将现有数据到覆盖到本月</el-button>
    </div>
    <el-tabs v-model="queryList.tabPosition" type="border-card" @tab-click="tabsClick">
      <el-tab-pane label="工资发放表" name="grant">
        <grant-table :month-data="monthData" :now-company="nowCompany" :now-year-month="nowYearMonth" :show-delete="showDelete" :show-batch-update="showBatchUpdate" @onUpdateSuccess="onUpdateSuccess" @onBatchUpdateSuccess="onBatchUpdateSuccess" @onEditMonth="onEditMonth" @onDeleteMonthRow="onDeleteMonthRow" />
      </el-tab-pane>
      <el-tab-pane label="社保医保单位分配表" name="social">
        <social-table :month-data="monthData" :now-company="nowCompany" :now-year-month="nowYearMonth" :show-delete="showDelete" @onEditMonth="onEditMonth" @onDeleteMonthRow="onDeleteMonthRow" />
        <team-table v-if="teamData.length>0&&nowCompany!=='居乐'" :team-data="teamData" :now-company="nowCompany" :now-year-month="nowYearMonth" />
      </el-tab-pane>
      <el-tab-pane label="个人所得税申报表" name="income">
        <income-table :month-data="monthData" :now-company="nowCompany" :now-year-month="nowYearMonth" :show-delete="showDelete" @onEditMonth="onEditMonth" @onDeleteMonthRow="onDeleteMonthRow" />
      </el-tab-pane>
      <el-tab-pane label="工资计提表" name="wages">
        <wages-table :month-data="monthData" :now-company="nowCompany" :now-year-month="nowYearMonth" :show-delete="showDelete" @onEditMonth="onEditMonth" @onDeleteMonthRow="onDeleteMonthRow" />
        <team-wages v-if="teamData.length>0&&nowCompany!=='居乐'" :team-data="teamInfo" :now-company="nowCompany" :now-year-month="nowYearMonth" />
      </el-tab-pane>
    </el-tabs>
    <div v-if="addMonthShow">
      <el-dialog title="增加人员" width="630px" :visible.sync="addMonthShow">
        <add-month-personnel :month-data="monthData" :company="queryList.getCompany" :year-month="queryList.getYearMonth" @addMonthPersonnelSuccess="addMonthPersonnelSuccess" />
      </el-dialog>
    </div>
    <el-dialog title="人员编辑" width="1200px" :visible.sync="dialogShow" @close="closeDialogShow">
      <detail :edit-data="editId" :is-month="true" @onSuccessMonthUpdate="onSuccessMonthUpdate" />
    </el-dialog>
  </div>
</template>

<script>
import { pmDate, pickerOptions } from 'plugins-methods'
import { fields, companyObject, startYeahMonth } from './components/config'
import GrantTable from './components/GrantTable'
import SocialTable from './components/SocialTable'
import TeamTable from './components/TeamTable'
import IncomeTable from './components/IncomeTable'
import WagesTable from './components/WagesTable'
import TeamWages from './components/TeamWages'
import Detail from './components/Detail'
import AddMonthPersonnel from './components/AddMonthPersonnel'
import { salaryMonth, salarySave, salaryMonthDel } from '@/api/salary'

export default {
  name: 'ViewsSalaryMonth', /* 组件名称 */
  components: { /* 应用组件 */
    GrantTable,
    SocialTable,
    TeamTable,
    IncomeTable,
    WagesTable,
    TeamWages,
    Detail,
    AddMonthPersonnel
  },
  data() { /* 定义数据 */
    return {
      fields,
      companyObject,
      queryList: {},
      pickerOptions: pickerOptions.scopedTime(startYeahMonth),
      nowCompany: '',
      nowYearMonth: '',
      submitAction: 'save',
      submitLoading: false,
      showSave: false,
      showCover: false,
      monthData: [],
      teamData: [],
      teamInfo: [],
      editId: 0,
      dialogShow: false,
      showDelete: false,
      showBatchUpdate: false,
      addMonthShow: false
    }
  },
  mounted() { /* 渲染后运行 */
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
  created() { /* 创建后运行 */
    this.parseQuery()
  },
  methods: { /* 函数及方法 */
    // 解析查询条件
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      const queryList = {
        getYearMonth: pmDate.dateYearMonth(),
        getCompany: '尚德',
        tabPosition: 'grant'
      }
      this.queryList = { ...queryList, ...query }
    },
    // 刷新本页
    refresh() {
      this.$router.push({
        path: '/salary/month',
        query: this.queryList
      })
    },
    tabsClick(tab) {
      this.queryList.tabPosition = tab.name
      this.refresh()
    },
    // 过滤事件
    handleFilter() {
      this.refresh()
    },
    // 获取当前公司当前月的数据
    getMonthData() {
      this.submitLoading = true
      salaryMonth({ company: this.queryList.getCompany, yearMonth: this.queryList.getYearMonth }).then(res => {
        const { data } = res
        if (data && data.length > 0) {
          this.nowCompany = this.queryList.getCompany // 渲染后的传值，子组件才能监听到
          this.nowYearMonth = this.queryList.getYearMonth // 渲染后的传值，子组件才能监听到
          this.showSave = false
          this.showCover = true
          this.parseData(data)
        } else {
          this.$message.warning('本月暂无数据,请手动保存本月数据！')
          this.monthData = []
          this.showSave = true
          this.showCover = false
        }
        this.submitAction = 'save'
        this.submitLoading = false
      }).catch(() => {
        this.submitLoading = false
      })
    },
    // 保存当前公司当前月的数据
    saveMonthData() {
      this.submitLoading = true
      salarySave({
        yearMonth: this.queryList.getYearMonth,
        company: this.queryList.getCompany,
        action: this.submitAction
      }).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.showSave = false
        this.submitLoading = false
        this.getMonthData()
      }).catch(() => {
        this.submitLoading = false
      })
    },
    // 覆盖当前公司当前月的数据
    coverMonthData() {
      this.$confirm(
        `此操作将会覆盖 ${this.nowCompany} 的${this.nowYearMonth} 数据且无法恢复，是否继续`,
        '提示',
        { type: 'warning' }
      ).then(() => {
        this.submitAction = 'cover'
        this.saveMonthData()
      }).catch(() => {
      })
    },
    // 解析数据
    parseData(data) {
      data.forEach(item => {
        const basePay = +item.basePay * 100
        const meritPay = +item.meritPay * 100
        item.subtotal01 = (basePay + meritPay) / 100
        item.days = 0
        item.deduction = 0
        const days = +item.days * 100
        const deduction = +item.deduction * 100
        item.subtotal02 = (days + deduction) / 100
        const myPension = +item.myPension * 100
        const myUnemployment = +item.myUnemployment * 100
        const myMedicalCare = +item.myMedicalCare * 100
        item.myIncomeTax = +item.myIncomeTax
        const myIncomeTax = +item.myIncomeTax * 100
        item.subtotal03 = (myPension + myUnemployment + myMedicalCare + myIncomeTax) / 100
        item.subtotal04 = (item.subtotal01 * 100 - item.subtotal02 * 100 - item.subtotal03 * 100) / 100
        const unPension = +item.unPension * 100
        const unUnemployment = +item.unUnemployment * 100
        const unInjury = +item.unInjury * 100
        const unMedicalCare = +item.unMedicalCare * 100
        const unBirth = +item.unBirth * 100
        item.subtotal05 = (unPension + unUnemployment + unInjury + unMedicalCare + unBirth) / 100
      })
      this.monthData = data
      this.teamStatistical(data)
      this.teamWages(data)
    },
    teamStatistical(data) {
      const json = {}
      data.forEach((item) => {
        if (item.team) {
          if (json[item.team]) {
            json[item.team] = {
              team: item.team,
              number: +json[item.team].number + 1,
              unPension: (+json[item.team].unPension * 100 + +item.unPension * 100) / 100,
              unUnemployment: (+json[item.team].unUnemployment * 100 + +item.unUnemployment * 100) / 100,
              unInjury: (+json[item.team].unInjury * 100 + +item.unInjury * 100) / 100,
              unMedicalCare: (+json[item.team].unMedicalCare * 100 + +item.unMedicalCare * 100) / 100,
              unBirth: (+json[item.team].unBirth * 100 + +item.unBirth * 100) / 100
            }
          } else {
            json[item.team] = {
              team: item.team,
              number: 1,
              unPension: +item.unPension,
              unUnemployment: +item.unUnemployment,
              unInjury: +item.unInjury,
              unMedicalCare: +item.unMedicalCare,
              unBirth: +item.unBirth
            }
          }
        }
      })
      const teamArray = []
      for (const i in json) teamArray.push(json[i])
      this.teamData = teamArray.sort(function(a, b) {
        const x = a['team']
        const y = b['team']
        return x < y ? -1 : x > y ? 1 : 0
      })
    },
    // 解析数据
    teamWages(data) {
      const json = {}
      data.forEach((item) => {
        if (item.team) {
          if (json[item.team]) {
            json[item.team] = {
              team: item.team,
              number: +json[item.team].number + 1,
              basePay: (+json[item.team].basePay * 100 + +item.basePay * 100) / 100,
              meritPay: (+json[item.team].meritPay * 100 + +item.meritPay * 100) / 100,
              subtotal01: (+json[item.team].subtotal01 * 100 + +item.subtotal01 * 100) / 100
            }
          } else {
            json[item.team] = {
              team: item.team,
              number: 1,
              basePay: +item.basePay,
              meritPay: +item.meritPay,
              subtotal01: +item.subtotal01
            }
          }
        }
      })
      const teamArray = []
      for (const i in json) teamArray.push(json[i])
      this.teamInfo = teamArray.sort(function(a, b) {
        const x = a['team']
        const y = b['team']
        return x < y ? -1 : x > y ? 1 : 0
      })
    },
    // 个人所得税编辑成功
    onUpdateSuccess() {
      this.getMonthData()
    },
    // 修改月表
    onEditMonth(id) {
      this.editId = id
      this.dialogShow = true
    },
    // 关闭修改月表
    closeDialogShow() {
      this.dialogShow = false
    },
    // 月表修改成功
    onSuccessMonthUpdate() {
      this.dialogShow = false
      this.queryList.refresh = this.editId + 10000 * Math.random()
      this.refresh()
    },
    onDeleteMonthRow(id) {
      this.$confirm('删除后将无法恢复，确定是否继续吗', '提示', { type: 'warning' }).then(() => {
        salaryMonthDel({ id }).then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.refresh()
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    onAddMonth() {
      this.addMonthShow = true
    },
    addMonthPersonnelSuccess() {
      this.addMonthShow = false
      this.queryList.refresh = this.queryList.refresh + 10000 * Math.random()
      this.refresh()
    },
    onBatchUpdateSuccess() {
      this.getMonthData()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  .filter-item {
    width: 180px;
    margin-right: 5px;
  }
}
</style>
