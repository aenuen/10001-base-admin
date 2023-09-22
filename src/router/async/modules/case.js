import Layout from '@/components/Layout'
const caseRouter = {
  path: '/case', name: 'case', component: Layout, redirect: '/case/list',
  meta: {
    title: '案件管理',
    icon: 'peoples',
    roles: ['admin']
  },
  children: [
    {
      path: 'list', name: 'caseList', component: () => import('@/views/case/list'),
      meta: {
        title: '案件列表',
        roles: ['lawyer']
      }
    },
    {
      path: 'create', name: 'caseCreate', component: () => import('@/views/case/create'),
      meta: {
        title: '新增案件',
        roles: ['lawyer']
      }
    },
    {
      path: 'update/:id', name: 'caseUpdate', component: () => import('@/views/case/update'),
      meta: {
        title: '案件编辑',
        roles: ['lawyer'],
        activeMenu: '/case/list'
      },
      hidden: true
    },
    {
      path: 'view/:id', name: 'caseView', component: () => import('@/views/case/view'),
      meta: {
        title: '收案审批表',
        roles: ['admin'],
        activeMenu: '/case/list'
      },
      hidden: true
    },
    {
      path: 'month', name: 'caseMonth', component: () => import('@/views/case/month'),
      meta: {
        title: '律师月表',
        roles: ['admin']
      }
    },
    {
      path: 'invoice', name: 'caseInvoice', component: () => import('@/views/case/invoice'),
      meta: {
        title: '发票统计',
        roles: ['admin']
      }
    },
    {
      path: 'year', name: 'caseYear', component: () => import('@/views/case/year'),
      meta: {
        title: '年份案件',
        roles: ['admin']
      }
    },
    {
      path: 'type', name: 'caseType', component: () => import('@/views/case/type'),
      meta: {
        title: '类型统计',
        roles: ['admin']
      }
    }
  ]
}

export default caseRouter
