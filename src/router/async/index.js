// 异步加载
import personalRouter from '@/router/async/personal'
import caseApprovalRouter from '@/router/async/caseApproval'
import expressRouter from '@/router/async/express'
import salaryRouter from '@/router/async/salary'
import statsRouter from '@/router/async/stats'
// import projectRouter from '@/router/async/project'
// import stockRouter from '@/router/async/stock'
import reserveRouter from '@/router/async/reverse'
import depreciationRouter from '@/router/async/depreciation'
import amortizationRouter from '@/router/async/amortization'
import managerRouter from '@/router/async/manager'
import iconsRouter from '@/router/async/icons'

const asyncRoutes = [
  personalRouter, // 简况
  caseApprovalRouter, // 案件审批
  salaryRouter, // 薪资
  statsRouter, // 项目
  expressRouter, // 快递
  // projectRouter, // 项目
  // stockRouter, // 库存
  reserveRouter, // 库存
  depreciationRouter, // 折旧
  amortizationRouter, // 推销
  managerRouter, // 管理员
  iconsRouter, // 图标
  { path: '*', redirect: '/404', hidden: true } // 无页面=404页面
]

export default asyncRoutes
