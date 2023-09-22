import Layout from '@/components/Layout'
const salaryRouter = {
  path: '/salary', name: 'salary', component: Layout, redirect: '/salary/list',
  meta: {
    title: '薪资管理',
    icon: 'peoples',
    roles: ['admin']
  },
  children: [
    {
      path: 'list', name: 'salaryList', component: () => import('@/views/salary/list'),
      meta: {
        title: '员工列表',
        roles: ['admin']
      }
    },
    {
      path: 'create', name: 'salaryCreate', component: () => import('@/views/salary/create'),
      meta: {
        title: '新增员工',
        roles: ['admin']
      }
    },
    {
      path: 'update/:id', name: 'salaryUpdate', component: () => import('@/views/salary/update'),
      meta: {
        title: '员工编辑',
        roles: ['admin'],
        activeMenu: '/salary/list'
      },
      hidden: true
    },
    {
      path: 'month', name: 'salaryMonth', component: () => import('@/views/salary/month'),
      meta: {
        title: '薪资月表',
        roles: ['admin']
      }
    },
    {
      path: 'details', name: 'salaryDetails', component: () => import('@/views/salary/details'),
      meta: {
        title: '医社保明细',
        roles: ['admin']
      }
    }
  ]
}

export default salaryRouter
