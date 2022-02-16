import Layout from '@/components/Layout'

// 组件
const caseApprovalRouter = {
  path: '/case', name: 'caseApproval', component: Layout, redirect: '/case/list',
  meta: { title: '案件审批', icon: 'skill' },
  children: [
    {
      path: 'list', name: 'caseApprovalList', component: () => import('@/views/case/list'),
      meta: {
        title: '案件列表',
        roles: ['lawyer']
      }
    },
    {
      path: 'view/:id', name: 'caseApprovalView', component: () => import('@/views/case/view'),
      meta: {
        title: '案体浏览',
        roles: ['lawyer'],
        activeMenu: '/case/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'create', name: 'caseApprovalCreate', component: () => import('@/views/case/create'),
      meta: {
        title: '案件录入',
        roles: ['lawyer']
      }
    },
    {
      path: 'create/:id', name: 'caseApprovalStepTwo', component: () => import('@/views/case/create'),
      meta: {
        title: '案体材料',
        roles: ['lawyer'],
        activeMenu: '/case/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'invoice', name: 'caseApprovalInvoice', component: () => import('@/views/case/invoice'),
      meta: {
        title: '发票统计',
        roles: ['admin']
      }
    },
    {
      path: 'case', name: 'caseApprovalCase', component: () => import('@/views/case/case'),
      meta: {
        title: '案体统计',
        roles: ['admin']
      }
    },
    {
      path: 'lawyer', name: 'caseApprovalLawyer', component: () => import('@/views/case/lawyer'),
      meta: {
        title: '律师统计',
        roles: ['admin']
      }
    }
  ]
}

export default caseApprovalRouter
