<!--suppress HtmlDeprecatedAttribute, JSValidateTypes -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryList.username"
        :placeholder="`${fields['username']}`"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @select="handleFilter"
      />
      <el-input
        v-model="queryList.nickName"
        :placeholder="`${fields['nickName']}`"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @select="handleFilter"
      />
      <el-input
        v-model="queryList.realName"
        :placeholder="`${fields['realName']}`"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @select="handleFilter"
      />
      <el-input
        v-model="queryList.email"
        :placeholder="`${fields['email']}`"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @select="handleFilter"
      />
      <el-input
        v-model="queryList.mobile"
        :placeholder="`${fields['mobile']}`"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @select="handleFilter"
      />
      <el-select
        v-model="queryList.role"
        class="filter-item"
        :placeholder="`${fields['role']}`"
        clearable
        @clear="handleFilter"
        @change="handleFilter"
      >
        <el-option v-for="item in roleObject" :key="item['key']" :value="item['value']" :label="item['label']" />
      </el-select>
      <el-select
        v-model="queryList.isUse"
        class="filter-item"
        :placeholder="`${fields['isUse']}`"
        clearable
        @clear="handleFilter"
        @change="handleFilter"
      >
        <el-option v-for="(item,key) in isUseAry" :key="key" :value="item.value" :label="item.label" />
      </el-select>
    </div>
    <el-table
      :key="tableKey"
      v-loading="tableLoading"
      :data="tableList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :default-sort="tableSort"
      @sort-change="sortChange"
    >
      <el-table-column :label="`${fields['id']}`" prop="id" sortable="custom" align="center" width="80" />
      <el-table-column :label="`${fields['work']}`" align="center" fixed="left" width="100">
        <template slot-scope="{row:{username}}">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="$router.push({path:`edit/${username}`})" />
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['username']}`" prop="username" align="center" />
      <el-table-column :label="`${fields['nickName']}`" prop="nickName" align="center" />
      <el-table-column :label="`${fields['realName']}`" prop="realName" align="center" />
      <el-table-column :label="`${fields['email']}`" prop="email" align="center" />
      <el-table-column :label="`${fields['mobile']}`" prop="mobile" align="center" />
      <el-table-column :label="`${fields['role']}`" align="center">
        <template slot-scope="{row:{role}}"><span>{{ roleObject[role]['label'] || '' }}</span></template>
      </el-table-column>
      <el-table-column :label="`${fields['avatar']}`" align="center">
        <template slot-scope="{row:{avatar}}">
          <el-avatar :size="30" :src="avatar" @error="true">
            <img alt src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column :label="`${fields['isUse']}`" align="center">
        <template slot-scope="{row:{id}}">
          <el-switch
            v-model="tableIsUse[id]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="isUseChange($event,id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="tableListTotal>0"
      :total="tableListTotal"
      :page.sync="queryList.page"
      :limit.sync="queryList.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
import { isUseAry } from 'plugins-methods'
import Pagination from '@/components/Pagination'
import { fields, roleObject } from '../personal/components/config'
import { userList, userState } from '@/api/user'

export default {
  name: 'ViewsPersonalData', /* 组件名称 */
  components: { /* 应用组件 */
    Pagination
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      isUseAry,
      roleObject: roleObject,
      queryList: {},
      tableKey: 1,
      tableList: [],
      tableSort: {},
      tableLoading: true,
      tableIsUse: [],
      tableListTotal: 0
    }
  },
  mounted() { /* 渲染后运行 */
    this.getTableList()
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path) {
      const oldQuery = Object.assign({}, from.query)
      const newQuery = Object.assign({}, to.query)
      JSON.stringify(oldQuery) !== JSON.stringify(newQuery) && this.getTableList()
    }
    next()
  },
  created() { /* 创建后运行 */
    this.parseQuery()
  },
  methods: {
    // 解析查询条件
    parseQuery: function() {
      const query = Object.assign({}, this.$route.query)
      let sort = '+id'
      const queryList = { page: 1, pageSize: 10, sort }
      if (query) {
        query.page && (query.page = +query.page)
        query.pageSize && (query.pageSize = +query.pageSize)
        query.pageSize && (sort = query.sort)
      }
      const sortSymbol = sort[0]
      const sortOrder = sort.slice(1, sort.length)
      this.tableSort = {
        order: sortSymbol === '+' ? 'ascending' : 'descending',
        prop: sortOrder
      }
      this.queryList = { ...queryList, ...query }
    },
    // 刷新本页
    refresh() {
      this.$router.push({
        path: '/manager/list',
        query: this.queryList
      })
    },
    // 过淲条件-角色
    handleFilter() {
      this.queryList.page = 1
      this.refresh()
    },
    // 排序改变
    sortChange(data) {
      const { prop, order } = data
      this.queryList.sort = (order === 'descending' ? `-` : `+`) + `${prop}`
      this.handleFilter()
    },
    // 获取管理员列表失败
    getTableList() {
      userList(this.queryList).then(res => {
        const { data, msg } = res
        const { list, count } = data
        this.$message.success(msg)
        this.tableList = list
        this.tableList.forEach(item => {
          this.tableIsUse[item.id] = item['isUse'] === '1'
          item.nickNameKeyword = this.heightLightKeyword('nickName', item.nickName)
          item.realNameKeyword = this.heightLightKeyword('realName', item.realName)
        })
        this.tableListTotal = count
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = true
        this.$message.error('获取管理员列表失败')
      })
    },
    // 关键字高亮
    heightLightKeyword(k, v) {
      return v ? (this.queryList[k] ? v.replace(new RegExp(this.queryList[k], 'ig'), value => {
        return `<span style="color:#1980ff">${value}</span>`
      }) : v) : '--'
    },
    // 使用状态改变
    isUseChange(event, id) {
      event = event ? '1' : '0'
      userState({ id, event }).then(res => {
        const { data, msg } = res
        if (data === '1') {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
        this.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  .filter-item {
    width: 120px;
    margin-right: 5px;
  }
}
</style>
