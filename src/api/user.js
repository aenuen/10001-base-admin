import Dispatch from '@/libs/axios/dispatch'

export const userDispatch = new Dispatch({
  login: ['/user/login', 'post'], // 登录
  info: ['/user/info', 'get'], // 用户信息
  detail: ['/user/detail', 'get'], // 用户资料
  list: ['/user/list', 'get'], // 列表
  avatarList: ['/user/avatarList', 'get'], // 头像列表
  avatarHistory: ['/user/avatarHistory', 'get'], // 历史上传
  create: ['/user/create', 'post'], // 新建用户
  update: ['/user/update', 'post'], // 编辑用户
  isUse: ['/user/isUse', 'post'], // 启用&&禁用用户
  isAdmin: ['/user/isAdmin', 'post'], // 是&&否后台用户
  base: ['/user/base', 'post'], // 修改基本信息
  avatar: ['/user/avatar', 'post'], // 更换头像
  avatarUpload: ['/user/avatarUpload', 'post'], // 上传头像
  avatarDelete: ['/user/avatarDelete', 'post'], // 删除头像
  email: ['/user/email', 'post'], // 修改电子邮件
  mobile: ['/user/mobile', 'post'], // 修改手机号码
  password: ['/user/password', 'post'] // 修改手机号码
})
