<template>
  <div>
    <div v-if="list.length>0" class="list-wrap">
      <div v-for="(value,index) in list" :key="index" class="list-item">
        <el-avatar shape="circle" fit="cover" :src="value.avatar" :size="100" />
        <div style="text-align: center;margin-top: 10px;">
          <el-button-group>
            <el-tooltip content="使用该头像" placement="top">
              <el-button icon="el-icon-wallet" size="mini" @click="useAvatar(value.avatar)" />
            </el-tooltip>
            <el-tooltip content="删除该头像" placement="top">
              <el-button icon="el-icon-delete" size="mini" @click="delAvatar(value.id)" />
            </el-tooltip>
          </el-button-group>
        </div>
      </div>
    </div>
    <div v-else style="text-align: center;">暂无数据</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userDispatch } from '@/api/user'
export default {
  name: 'AvatarHistory',
  props: {
    list: { type: Array, default: () => [] }
  },
  data() {
    return {
      avatar: ''
    }
  },
  computed: {
    ...mapGetters(['aid'])
  },
  methods: {
    useAvatar(avatar) {
      this.$emit('onUseAvatar', avatar)
    },
    delAvatar(id) {
      this.$confirm('删除后将无法恢复，是否确定删除').then(() => {
        const data = { adminId: this.aid, avatarId: id }
        userDispatch.use('avatarDelete', data).then(({ code, msg }) => {
          if (code === 200) {
            this.$message.success(msg)
            this.$emit('onDelAvatar')
          } else {
            this.$message.error(msg)
          }
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  width: 100%;
  overflow: hidden;
  .list-item {
    float: left;
    margin-left:10px;
  }
}
</style>
