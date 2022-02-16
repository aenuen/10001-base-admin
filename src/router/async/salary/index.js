import Layout from '@/components/Layout'

// 组件
const salaryRouter = {
  path: '/salary', name: 'salary', component: Layout, redirect: '/salary/create',
  meta: {
    title: '薪资管理',
    icon: 'money',
    roles: ['editor']
  },
  children: [
    {
      path: 'list',
      name: 'salaryList',
      component: () => import('@/views/salary/list'),
      meta: {
        title: '人员列表',
        roles: ['editor']
      }
    },
    {
      path: 'create',
      name: 'salaryCreate',
      component: () => import('@/views/salary/create'),
      meta: {
        title: '人员录入',
        roles: ['editor']
      }
    },
    {
      path: 'month',
      name: 'salaryMonth',
      component: () => import('@/views/salary/month'),
      meta: {
        title: '薪资月表',
        roles: ['editor']
      }
    },
    {
      path: 'edit/:id',
      name: 'salaryEdit',
      component: () => import('@/views/salary/edit'),
      meta: {
        title: '人员编辑',
        roles: ['editor'],
        activeMenu: '/salary/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'detailed',
      name: 'salaryDetailed',
      component: () => import('@/views/salary/detailed'),
      meta: {
        title: '社医保明细',
        roles: ['editor']
      }
    }
  ]
}

export default salaryRouter
