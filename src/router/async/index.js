// 异步加载
import LotteryRouter from './modules/lottery'
import IconsRouter from './modules/icons'
const asyncRoutes = [
  LotteryRouter,
  IconsRouter,
  { path: '*', redirect: '/404', hidden: true } // 无页面=404页面
]

export default asyncRoutes
