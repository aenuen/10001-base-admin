<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="nowCompany" class="filter-item" :placeholder="`${fields['company']}`">
        <el-option v-for="item in companyObject" :key="item['key']" :label="item['label']" :value="item['value']" />
      </el-select>
      <el-button v-show="dataList.length>0" class="filter-item el-icon-printer" style="width:250px" @click="printContent">
        打印{{ dataList && dataList[0] && dataList[0].name ? dataList[0].name : '' }}社医保明细
      </el-button>
    </div>
    <div style="width:100%">
      <div style="width:100px;float:left;">
        <el-tabs v-model="defaultId" tab-position="left" @tab-click="handleClick">
          <el-tab-pane v-for="item in nameList" :key="item.id" :label="item.name" :name="`${item.id}`" />
        </el-tabs>
      </div>
      <div id="printDetailedTable" style="width:calc(100% - 100px);float:left;">
        <el-table
          :key="tableKey"
          :data="dataList"
          show-summary
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
          <el-table-column prop="name" :label="`${fields['name']}`" align="center" />
          <el-table-column prop="yearMonth" label="月份" align="center" />
          <el-table-column :label="`${fields['myPension']}`" align="center">
            <el-table-column prop="myPension" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['myUnemployment']}`" align="center">
            <el-table-column prop="myUnemployment" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['myMedicalCare']}`" align="center">
            <el-table-column prop="myMedicalCare" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unPension']}`" align="center">
            <el-table-column prop="unPension" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unUnemployment']}`" align="center">
            <el-table-column prop="unUnemployment" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unMedicalCare']}`" align="center">
            <el-table-column prop="unMedicalCare" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unInjury']}`" align="center">
            <el-table-column prop="unInjury" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['unBirth']}`" align="center">
            <el-table-column prop="unBirth" :label="`${fields['unit']}`" align="center" />
          </el-table-column>
          <el-table-column prop="subtotal" label="小计" align="center" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import print from 'print-js'
import { fields, companyObject } from './components/config'
import { salaryName, salaryPersonal } from '@/api/salary'

export default {
  name: 'ViewsSalaryDetailed', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */ },
  data() { /* 定义数据 */
    return {
      fields: fields,
      companyObject: companyObject,
      nowCompany: '尚德',
      defaultId: 0,
      nameList: [],
      searchId: 0,
      dataList: [],
      tableKey: 1
    }
  },
  watch: { /* 监控值变换 */
    nowCompany() {
      this.getList()
    }
  },
  methods: { /* 函数及方法 */
    getList() {
      salaryName({ company: this.nowCompany }).then(res => {
        const { data } = res
        if (data && data.length > 0) {
          this.nameList = data
          this.defaultId = `${data[0].id}`
          this.searchId = data[0].id
          this.getData()
        } else {
          this.nameList = []
          this.dataList = []
        }
      })
    },
    handleClick(tab) {
      this.searchId = tab.name
      this.defaultId = tab.name
      this.getData()
    },
    getData() {
      salaryPersonal({ sid: this.searchId }).then(res => {
        const { data } = res
        this.parseData(data)
      })
    },
    parseData(data) {
      data.forEach(item => {
        item.subtotal = (
          +item.myPension * 100 + +item.unPension * 100 +
          +item.myUnemployment * 100 + +item.unUnemployment * 100 +
          +item.myMedicalCare * 100 + +item.unMedicalCare * 100 +
          +item.unInjury * 100 + +item.unBirth * 100
        ) / 100
      })
      this.dataList = data
    },
    printContent() {
      print({
        printable: 'printDetailedTable',
        type: 'html',
        header: `${this.nowCompany} ${this.dataList && this.dataList[0] && this.dataList[0].name ? this.dataList[0].name : ''} 社医保明细`,
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th{border-collapse:collapse;padding:15px;border:1px #000 solid;text-align:center}'
      })
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
