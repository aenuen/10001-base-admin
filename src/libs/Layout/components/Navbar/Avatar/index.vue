<!--suppress ALL -->
<template>
  <div>
    <el-dropdown class="avatar-container hover-effect" trigger="click">
      <div class="avatar-wrapper" style="cursor: pointer">
        <el-avatar class="user-avatar" :size="35" :src="`${avatar}`" @error="true">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
        </el-avatar>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/personal/data">
          <el-dropdown-item>个人资料</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="logout">
          <span style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '', /* 组件名称 */
  components: { /* 应用组件 */ },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */ },
  data() { /* 定义数据 */
    return {}
  },
  computed: { /* 监控自定义的变量 */
    ...mapGetters([
      'avatar'
    ])
  },
  watch: { /* 监控值变换 */ },
  mounted() { /* 渲染后运行 */
  },
  created() { /* 创建后运行 */
  },
  methods: { /* 函数及方法 */
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    width: 35px;
    height: 35px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 35px;
      height: 35px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      left: 50%;
      margin-left: -6px;
      bottom: -9px;
      font-size: 12px;
    }
  }
}
</style>
