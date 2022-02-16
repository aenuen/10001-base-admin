import { userDispatch, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/libs/utils/token'
import router, { resetRouter } from '@/router/constant'

const state = {
  token: getToken(),
  realName: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, realName) => {
    state.realName = realName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) { // 用户登录
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      userDispatch.use('login', { username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) { // 获取用户信息
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        data || reject('验证失败，请重新登录。')
        const { roles, realName, avatar, introduction } = data
        // 角色必须是非空数组
        roles || roles.length <= 0 || reject('角色必须是非空数组！')
        commit('SET_ROLES', roles)
        commit('SET_NAME', realName)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state, dispatch }) { // 用户登出
    return new Promise((resolve, reject) => {
      try {
        commit('SET_TOKEN', '') // 清空token
        commit('SET_ROLES', []) // 清空角色信息
        removeToken() // 移除token
        resetRouter() // 清除所有路由
        dispatch('tagsView/delAllViews', null, { root: true }) // 删除所有tagsView，重置访问的视图和缓存的视图
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  // 动态修改权限
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getInfo')
    resetRouter()
    // 基于角色生成可访问路线图
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // 动态添加可访问路由
    router.addRoutes(accessRoutes)
    // 重置访问的视图和缓存的视图
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
