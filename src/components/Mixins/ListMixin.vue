<script>
export default {
  data() {
    return {
      queryList: {},
      tableData: [],
      tableDataLength: 0,
      tableSort: {},
      defaultTableSort: '+id',
      tableEnable: [],
      tableLoading: true,
      multipleSelection: [],
      batchUpdateControl: false
    }
  },
  mounted() {
    this.startAction()
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path) {
      const oldQuery = Object.assign({}, from.query)
      const newQuery = Object.assign({}, to.query)
      JSON.stringify(oldQuery) !== JSON.stringify(newQuery) && this.startAction()
    }
    next()
  },
  created() {
    this.parseQuery()
  },
  methods: {
    parseQuery: function() {
      const query = Object.assign({}, this.$route.query)
      const sort = query && query.sort ? query.sort : this.defaultTableSort
      const pageSet = {
        page: query && query.page ? ~~query.page : 1,
        pageSize: query && query.pageSize ? ~~query.pageSize : 20
      }
      const queryList = { page: 1, pageSize: 10, sort }
      this.queryList = { ...queryList, ...this.setData(), ...query, ...pageSet }
      this.tableSort = { order: sort[0] === '+' ? 'ascending' : 'descending', prop: sort.slice(1, sort.length) }
    },
    setData() {
      return {}
    },
    startAction() {
    },
    handleFilter() {
      this.queryList.page = 1
      this.refresh()
    },
    refresh() {
      this.$router.push({ path: this.$route.path, query: this.queryList })
    },
    refreshStrong() {
      this.queryList.timestamp = Math.random() * 1000
      this.refresh()
    },
    onSortChange({ prop, order }) {
      this.queryList.sort = (order === 'descending' ? `-` : `+`) + `${prop}`
      this.handleFilter()
    },
    selectionChange(val) {
      this.multipleSelection = val
    },
    batchUpdate() {
      if (this.multipleSelection === []) {
        this.$message.info('请选择需要批量编辑的内容')
      } else {
        this.batchUpdateControl = true
      }
    },
    batchDelete() {
      if (this.multipleSelection === []) {
        this.$message.info('请选择需要批量删除的内容')
      } else {
        this.$confirm('删除后将无法恢复，确定继续批量删除吗？').then(() => {
          this.startBatchDelete()
        }).catch(() => {
          this.$message.info('取消批量删除')
        })
      }
    },
    startBatchDelete() {}
  }
}
</script>
