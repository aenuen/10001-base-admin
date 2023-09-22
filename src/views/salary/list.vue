<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 姓名搜索 -->
      <el-select v-model="queryList.name" filterable class="filter-ele" :placeholder="fields.name" clearable @change="handleFilter">
        <el-option v-for="item in nameAry" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
      <!-- 公司搜索 -->
      <el-select v-model="queryList.company" filterable class="filter-ele" :placeholder="fields.company" clearable @change="handleFilter">
        <el-option v-for="item in companyAry" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
      <!-- 部门搜索 -->
      <el-select v-model="queryList.department" filterable class="filter-ele" :placeholder="fields.department" clearable @change="handleFilter">
        <el-option v-for="item in departmentAry" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <!-- 项目组搜索 -->
      <el-select v-model="queryList.team" filterable class="filter-ele" :placeholder="fields.team" clearable @change="handleFilter">
        <el-option v-for="item in teamAry" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <!-- 状态搜索 -->
      <el-select v-model="queryList.isUse" class="filter-ele" :placeholder="`${fields['isUse']}`" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, key) in defineIsUseAry" :key="key" :value="item.value" :label="item.label" />
      </el-select>
      <el-button class="filter-btn el-icon-search" type="default" style="width: auto" @click="handleFilter"> 查询 </el-button>
      <el-button class="filter-btn el-icon-plus" type="success" style="width: auto" @click="$router.push('create')"> 新增 </el-button>
      <el-button class="filter-btn el-icon-brush" type="success" style="width: auto" @click="$router.push('month')"> 月表 </el-button>
      <el-button class="filter-btn el-icon-delete" type="danger" style="width: auto" @click="removeBatchConfirm"> 批量删除 </el-button>
    </div>
    <!-- 列表 -->
    <ListTable :table-data="tableData" :table-loading="tableLoading" :is-use="tableIsUse" @onSelectorChange="onSelectorChange" @onSortChange="onSortChange" @onIsUseChange="onIsUseChange" @onRemoveAlone="onRemoveAlone" />
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.page" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
  </div>
</template>
<script>
// api
import { salaryApi } from '@/api/salary'
// components
import Pagination from '@/components/Pagination'
import ListTable from './components/listTable'
// data
import { fields } from './modules/fields'
// filter
// function
import { usedParseEmpty, usedParseOnly } from './utils/usedParse'
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
import { defineIsUseAry, keyLight } from 'abbott-methods/import'
// settings
export default {
  name: 'SalaryList',
  components: { Pagination, ListTable },
  mixins: [ListMixin],
  data() {
    return {
      fields,
      nameAry: [],
      companyAry: [],
      departmentAry: [],
      teamAry: [],
      tableIsUse: [],
      defineIsUseAry
    }
  },
  mounted() {
    this.getUsed()
  },
  methods: {
    // 设置数据
    setData() {
      return {
        sort: '-id'
      }
    },
    // 获取使用过的数据
    getUsed() {
      salaryApi.used({ name: 1, company: 1, department: 1, team: 1 }).then(({ code, data }) => {
        if (code === 200) {
          this.nameAry = [...usedParseOnly(data.name)]
          this.companyAry = [...usedParseOnly(data.company)]
          this.departmentAry = [...usedParseEmpty(data.department, '未分部门')]
          this.teamAry = [...usedParseEmpty(data.team, '未分项目组')]
        }
      })
    },
    // 获取列表
    startHandle() {
      salaryApi.list(this.queryList).then(({ code, data }) => {
        if (code === 200) {
          const { list, count } = data
          this.tableData = list
          this.tableDataLength = count
          this.tableLoading = false
          this.tableData.forEach((item) => {
            this.tableIsUse[item.id] = +item.isUse === 1
            item.name_kw = keyLight(this.queryList, 'name', item.name)
            item.company_kw = keyLight(this.queryList, 'company', item.company)
            item.department_kw = keyLight(this.queryList, 'department', item.department)
            item.team_kw = keyLight(this.queryList, 'team', item.team)
          })
        }
      })
    },
    // 状态切换
    onIsUseChange(event, id) {
      event = event ? '1' : '0'
      salaryApi.isUse({ id, event }).then((res) => {
        const { data, msg } = res
        if (+data === 1) {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
      })
    },
    // 单独删除员工
    removeAlone() {
      salaryApi.remove({ id: this.removeId }).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 批量删除员工
    removeBatch() {
      salaryApi.removeBatch({ ids: this.selectorAry }).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
