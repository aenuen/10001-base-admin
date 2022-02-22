<!--suppress HtmlDeprecatedAttribute -->
<template>
  <el-table :key="1" :loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%" :default-sort="tableSort" @sort-change="onSortChange">
    <el-table-column :label="fields.id" prop="id" align="center" width="80" sortable="custom" />
    <el-table-column :label="fields.work" align="center" width="100" fixed="left">
      <template slot-scope="{row:{id}}">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="$router.push({path:`edit/${id}`})" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.username" prop="username" align="center">
      <template slot-scope="{row:{usernameKeyword}}"><span v-html="usernameKeyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.petName" prop="petName" align="center">
      <template slot-scope="{row:{petNameKeyword}}"><span v-html="petNameKeyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.realName" prop="petName" align="center">
      <template slot-scope="{row:{realNameKeyword}}"><span v-html="realNameKeyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.email" prop="petName" align="center">
      <template slot-scope="{row:{emailKeyword}}"><span v-html="emailKeyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.mobile" prop="petName" align="center">
      <template slot-scope="{row:{mobileKeyword}}"><span v-html="mobileKeyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.roles" align="center">
      <template slot-scope="{row:{rolesKeyword}}"><span v-html="rolesKeyword" /></template>
    </el-table-column>
    <el-table-column :label="fields.avatar" align="center">
      <template slot-scope="{row:{avatar}}">
        <el-avatar :size="30" :src="avatar" @error="true">
          <img alt :src="noneImage">
        </el-avatar>
      </template>
    </el-table-column>
    <el-table-column :label="fields.isAdmin" align="center">
      <template slot-scope="{row:{id}}">
        <el-switch v-model="tableIsAdmin[id]" active-color="#13ce66" inactive-color="#ff4949" @change="onIsAdminChange($event,id)" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.isUse" align="center">
      <template slot-scope="{row:{id}}">
        <el-switch v-model="tableIsUse[id]" active-color="#13ce66" inactive-color="#ff4949" @change="onIsUseChange($event,id)" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.created" align="center">
      <template slot-scope="{row:{created}}">{{ created|filterDateHI }}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fields } from '../modules/fields'
import noneImage from '@/assets/image/noneImage.png'
import { filterDateHI } from 'plugins-methods'
export default {
  name: 'ListTable',
  filters: {
    filterDateHI
  },
  props: {
    tableLoading: Boolean,
    tableSort: { type: Object, default: () => {} },
    tableData: { type: Array, default: () => [] },
    tableIsAdmin: { type: Array, default: () => [] },
    tableIsUse: { type: Array, default: () => [] }
  },
  data() {
    return {
      fields,
      noneImage
    }
  },
  methods: {
    onSortChange(data) {
      this.$emit('onSortChange', data)
    },
    onIsUseChange(event, id) {
      this.$emit('onIsUseChange', event, id)
    },
    onIsAdminChange(event, id) {
      this.$emit('onIsAdminChange', event, id)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
