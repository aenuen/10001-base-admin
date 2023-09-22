// 异步加载
import caseRouter from './modules/case'
import salaryRouter from './modules/salary'
import articleRouter from './modules/article'
import lotteryRouter from './modules/lottery'
import iconsRouter from './modules/icons'
const asyncRoutes = [
  caseRouter,
  salaryRouter,
  articleRouter,
  lotteryRouter,
  iconsRouter,
  { path: '*', redirect: '/404', hidden: true } // 无页面=404页面
]

export default asyncRoutes
