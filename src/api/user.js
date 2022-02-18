import Dispatch from '@/libs/axios/dispatch'

export const userDispatch = new Dispatch({
  login: ['/user/login', 'post'], // 登录
  info: ['/user/info', 'get'], // 用户信息
  list: ['/user/list', 'get'], // 列表
  avatarList: ['/user/avatarList', 'get'], // 头像列表
  avatarHistory: ['/user/avatarHistory', 'get'], // 历史上传
  create: ['/user/insert', 'post'], // 新建用户
  state: ['/user/state', 'post'], // 新建用户
  base: ['/user/base', 'post'], // 修改基本信息
  avatar: ['/user/avatar', 'post'], // 更换头像
  avatarUpload: ['/user/avatarUpload', 'post'], // 上传头像
  avatarDelete: ['/user/avatarDelete', 'post'], // 删除头像
  email: ['/user/email', 'post'], // 修改电子邮件
  mobile: ['/user/mobile', 'post'], // 修改手机号码
  password: ['/user/password', 'post'] // 修改手机号码
})
