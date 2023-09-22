<template>
  <div class="app-container">
    <div class="filter-container" style="overflow: hidden">
      <div class="filter-work">
        <div class="left">
          <!-- 公司搜索 -->
          <el-select v-model="queryList.company" filterable class="filter-ele" :placeholder="fields.company" @change="handleFilter">
            <el-option v-for="item in companyAry" :key="item.value" :label="item.value" :value="item.value" />
          </el-select>
          <!-- 年月搜索 -->
          <el-date-picker v-model="queryList.yearMonth" :placeholder="fields.yearMonth" class="filter-ele" value-format="yyyy-MM" type="month" @change="handleFilter" />
          <!-- 增加月表员工 -->
          <el-button type="success" class="filter-btn el-icon-plus" style="width: auto" @click="personnelShow = true"> 增加月表员工 </el-button>
          <!-- 显示多显 -->
          <el-checkbox v-model="selectorShow" style="margin-left: 10px">显示多显</el-checkbox>
          <!-- 批量编辑 -->
          <el-button v-if="selectorShow" type="success" class="filter-btn el-icon-edit" style="width: auto" @click="updateBatchConfirm"> 批量编辑 </el-button>
          <!-- 批量删除 -->
          <el-button v-if="selectorShow" type="danger" class="filter-btn el-icon-delete" style="width: auto" @click="removeBatchConfirm"> 批量删除 </el-button>
          <el-checkbox v-model="removeShow" style="margin-left: 10px">显示删除</el-checkbox>
        </div>
        <div class="right">
          <!-- 个税及打印 -->
          <HeaderButtons :tab-name="tabName" :tab-code="tabCode" @onUpdateTax="taxShow = true" />
        </div>
      </div>
      <!-- 增加月表员工 -->
      <Dialog :control="personnelShow" title="增加月表人员" :width="630" @controlChange="personnelShow = false">
        <MonthAddPer :month-data="tableData" :company="queryList.company" :year-month="queryList.yearMonth" @onMonthAddPer="onMonthAddPer" />
      </Dialog>
      <!-- 编辑月表员工 -->
      <Dialog :control="updateShow" title="编辑月表人员" :width="990" @controlChange="updateShow = false">
        <Detail :month-id="monthId" @updateAloneSuccess="updateAloneSuccess" />
      </Dialog>
      <!-- 批量编辑月表员工 -->
      <Dialog :control="updateBatchShow" title="批量编辑月表人员" :width="990" @controlChange="updateBatchShow = false">
        <Detail is-batch :selector-ary="selectorAry" @updateBatchSuccess="updateBatchSuccess" />
      </Dialog>
      <!-- 编辑个人所得税 -->
      <Dialog :control="taxShow" title="编辑个人所得税" :width="990" :fullscreen="true" @controlChange="taxShow = false">
        <IncomeTax :table-data="tableData" @incomeTaxSuccess="incomeTaxSuccess" />
      </Dialog>
    </div>
    <!-- 签标切换 -->
    <el-tabs v-model="queryList.tabCode" type="border-card" style="width: 100%" @tab-click="tabsClick">
      <el-tab-pane label="工资发放表" name="grant">
        <!-- 工资发放表 -->
        <div id="grant">
          <header-title-grant :company="queryList.company" :year-month="queryList.yearMonth" is-grant />
          <monthGrant :table-data="tableData" :selector-show="selectorShow" :remove-show="removeShow" @onRemoveAlone="onRemoveAlone" @onDblclickAlone="onDblclickAlone" @onSelectorChange="onSelectorChange" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="社保医保单位分配表" name="social">
        <!-- 社保医保单位分配表 -->
        <div id="social">
          <header-title-none :company="queryList.company" :year-month="queryList.yearMonth" />
          <monthSocial :table-data="tableData" :selector-show="selectorShow" :remove-show="removeShow" @onRemoveAlone="onRemoveAlone" @onDblclickAlone="onDblclickAlone" @onSelectorChange="onSelectorChange" />
        </div>
        <!-- 社保医保项目组统计表 -->
        <headerTeam tab-name="社保医保项目组统计表" tab-code="teamSocial" />
        <div id="teamSocial">
          <header-title-none :company="queryList.company" :year-month="queryList.yearMonth" />
          <TeamSocial :table-data="teamSocial" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人所得税申报表" name="income">
        <!-- 个人所得税申报表 -->
        <div id="income">
          <header-title-none :company="queryList.company" :year-month="queryList.yearMonth" />
          <monthIncome :table-data="tableData" :selector-show="selectorShow" :remove-show="removeShow" @onRemoveAlone="onRemoveAlone" @onDblclickAlone="onDblclickAlone" @onSelectorChange="onSelectorChange" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="工资计提表" name="wages">
        <!-- 工资计提表  -->
        <div id="wages">
          <header-title-none :company="queryList.company" :year-month="queryList.yearMonth" />
          <monthWages id="wages" :table-data="tableData" :selector-show="selectorShow" :remove-show="removeShow" @onRemoveAlone="onRemoveAlone" @onDblclickAlone="onDblclickAlone" @onSelectorChange="onSelectorChange" />
        </div>
        <!-- 工资计提项目组统计表 -->
        <HeaderTeam tab-name="工资计提项目组统计表" tab-code="teamWages" />
        <div id="teamWages">
          <header-title-none :company="queryList.company" :year-month="queryList.yearMonth" />
          <TeamWages :table-data="teamWages" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// api
import { salaryApi } from '@/api/salary'
// components
import Dialog from '@/components/Dialog'
import MonthAddPer from './components/monthAddPer'
import MonthGrant from './components/monthGrant'
import MonthSocial from './components/monthSocial'
import MonthIncome from './components/monthIncome'
import MonthWages from './components/monthWages'
import TeamSocial from './components/teamSocial'
import TeamWages from './components/teamWages'
import Detail from './components/detail'
import HeaderButtons from './components/headerButtons'
import HeaderTeam from './components/headerTeam'
import HeaderTitleGrant from './components/headerTitleGrant'
import HeaderTitleNone from './components/headerTitleNone'
import IncomeTax from './components/incomeTax'
// data
import { fields } from './modules/fields'
// filter
// function
import { usedParseOnly } from './utils/usedParse'
import { monthData } from './utils/monthData'
import { teamSocial } from './utils/teamSocial'
import { teamWages } from './utils/teamWages'
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
import { timeGetYearMonth } from 'abbott-methods/import'
// settings
export default {
  components: { Dialog, MonthAddPer, MonthGrant, MonthSocial, MonthIncome, MonthWages, TeamSocial, TeamWages, Detail, HeaderButtons, HeaderTeam, HeaderTitleGrant, HeaderTitleNone, IncomeTax },
  mixins: [ListMixin],
  data() {
    return {
      fields,
      companyAry: [],
      monthId: 0,
      teamSocial: [],
      teamWages: [],
      personnelShow: false, // 显示增加公司员工控制变量
      removeShow: false, // 显示删除按钮控制变量
      taxShow: false // 显示编辑个人所得税控制变量
    }
  },
  computed: {
    tabName() {
      return this.queryList.tabName || '工资发放表'
    },
    tabCode() {
      return this.queryList.tabCode || 'grant'
    }
  },
  mounted() {
    this.getUsed()
  },
  methods: {
    // 设置数据
    setData() {
      return {
        company: '尚德',
        yearMonth: timeGetYearMonth(),
        tabCode: 'grant',
        tabName: '工资发放表'
      }
    },
    // 获取使用过的数据
    getUsed() {
      salaryApi.used({ company: 1 }).then(({ code, data }) => {
        if (code === 200) {
          this.companyAry = [...usedParseOnly(data.company)]
        }
      })
    },
    // 标签切换
    tabsClick(tab) {
      this.queryList.tabName = tab.label
      this.queryList.tabCode = tab.name
      this.tabName = tab.label
      this.tabCode = tab.name
      this.refreshStrong()
    },
    // 获取月表数据
    startHandle() {
      salaryApi.monthList(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          if (data.length > 0) {
            this.tableData = monthData(data)
            this.teamSocial = teamSocial(this.tableData) // 医保社保项目组统计
            this.teamWages = teamWages(this.tableData) // 工资计提项目组统计
          } else {
            this.tableData = [...[]]
            this.$message.warning(`${this.queryList.yearMonth}暂无数据`)
          }
        } else {
          this.$message.warning(msg)
        }
      })
    },
    // 增加公司员工成功
    onMonthAddPer() {
      this.personnelShow = false
      this.refreshStrong()
    },
    incomeTaxSuccess() {
      this.taxShow = false
      this.refreshStrong()
    },
    // 单个删除
    removeAlone() {
      salaryApi.monthRemove({ id: this.removeId }).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 批量删除
    removeBatch() {
      salaryApi.monthRemoveBatch({ ids: this.selectorAry }).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 双击行编辑
    onDblclickAlone(id) {
      this.updateShow = true
      this.monthId = id
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-work {
  display: flex;
  justify-content: space-between; /* 横向中间自动空间 */
}
</style>
