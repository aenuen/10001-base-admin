<template>
  <div class="app-container">
    <div v-if="userInfo">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="user-data">
            <el-card style="margin-bottom:20px;">
              <div slot="header" class="clearfix">
                <span>个人资料</span>
              </div>
              <div class="box-center">
                <el-avatar :size="100" :src="userInfo.avatar" @error="true">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
                </el-avatar>
              </div>
              <div class="box-center">
                <div class="user-name">{{ userInfo.realName }}</div>
                <div class="user-role text-muted">{{ userInfo.role }}</div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="18">
          <el-card style="margin-bottom:20px;">
            <div slot="header" class="clearfix">
              <span>编辑资料</span>
            </div>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="基本资料" name="base">
                <base-data :user-info="userInfo" />
              </el-tab-pane>
              <el-tab-pane label="登录密码" name="password">
                <password :user-info="userInfo" />
              </el-tab-pane>
              <el-tab-pane label="电子邮箱" name="email">
                <email :user-info="userInfo" />
              </el-tab-pane>
              <el-tab-pane label="手机号码" name="mobile">
                <mobile :user-info="userInfo" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import BaseData from './components/BaseData'
import Password from './components/Password'
import Email from './components/Email'
import Mobile from './components/Mobile'
import { getInfo } from '@/api/user'

export default {
  name: 'ViewsPersonalIndex',
  components: {
    BaseData,
    Password,
    Email,
    Mobile
  },
  data() {
    return {
      userInfo: {},
      activeTab: 'base'
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getInfo().then(res => {
        const { data } = res
        this.userInfo = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-data {
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .user-name {
    padding-top: 10px;
    font-weight: bold;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
    color: #777;
  }
}
</style>
