<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="queryList.isUse" class="filter-ele" :placeholder="`${fields['isUse']}`" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item,key) in isUseAry" :key="key" :value="item.value" :label="item.label" />
      </el-select>
      <el-input v-model="queryList.username" :placeholder="fields.username" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @select="handleFilter" />
      <el-input v-model="queryList.petName" :placeholder="fields.petName" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @select="handleFilter" />
      <el-input v-model="queryList.realName" :placeholder="fields.realName" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @select="handleFilter" />
      <el-input v-model="queryList.email" :placeholder="fields.email" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @select="handleFilter" />
      <el-input v-model="queryList.mobile" :placeholder="fields.mobile" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @select="handleFilter" />
      <el-select v-model="queryList.roles" class="filter-ele" :placeholder="fields.roles" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item,index) in rolesAry" :key="index" :value="item['value']" :label="item['label']" />
      </el-select>
      <el-button type="primary" class="filter-btn el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" class="filter-btn el-icon-plus" @click="routerGo('create')">创建</el-button>
    </div>
    <ListTable
      :table-data="tableData"
      :table-loading="tableLoading"
      :table-sort="tableSort"
      :table-is-use="tableIsUse"
      :table-is-admin="tableIsAdmin"
      @onSortChange="onSortChange"
      @onIsUseChange="onIsUseChange"
      @onIsAdminChange="onIsAdminChange"
    />
  </div>
</template>

<script>
import { fields } from './modules/fields'
import { rolesAry, rolesObject, rolesParse } from './modules/roles'
import { isUseAry, pmKeyword } from 'plugins-methods'
import ListMixin from '@/libs/Mixins/ListMixin'
import MethodsMixin from '@/libs/Mixins/MethodsMixin'
import ListTable from './components/ListTable'
import { userDispatch } from '@/api/user'
export default {
  name: 'ManagerList',
  components: { ListTable },
  mixins: [ListMixin, MethodsMixin],
  data() {
    return {
      fields,
      rolesAry,
      rolesObject,
      isUseAry,
      tableIsAdmin: [],
      tableIsUse: []
    }
  },
  methods: {
    startAction() {
      userDispatch.use('list', this.queryList).then(({ code, data: { list, count }}) => {
        if (code === 200) {
          this.tableData = list
          this.tableDataLength = count
          this.tableData.forEach(item => {
            this.tableIsUse[item.id] = +item.isUse === 1
            this.tableIsAdmin[item.id] = +item.isAdmin === 1
            item.usernameKeyword = pmKeyword.keywordHeightLight(this.queryList, 'username', item.username)
            item.petNameKeyword = pmKeyword.keywordHeightLight(this.queryList, 'petName', item.petName)
            item.realNameKeyword = pmKeyword.keywordHeightLight(this.queryList, 'realName', item.realName)
            item.emailKeyword = pmKeyword.keywordHeightLight(this.queryList, 'email', item.email)
            item.mobileKeyword = pmKeyword.keywordHeightLight(this.queryList, 'mobile', item.mobile)
            const object = { roles: rolesObject[this.queryList.roles] || '' }
            const roles = rolesParse(item.roles)
            item.rolesKeyword = pmKeyword.keywordHeightLight(object, 'roles', roles)
          })
        }
      })
    },
    onIsUseChange(event, id) {
      event = event ? '1' : '0'
      userDispatch.use('isUse', { id, event }).then(res => {
        const { data, msg } = res
        if (data === '1') {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
      })
    },
    onIsAdminChange(event, id) {
      event = event ? '1' : '0'
      userDispatch.use('isAdmin', { id, event }).then(res => {
        const { data, msg } = res
        if (data === '1') {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
