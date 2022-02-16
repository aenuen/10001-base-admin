import Layout from '@/components/Layout'

// 组件
const amortizationRouter = {
  path: '/amortization', name: 'amortization', component: Layout, redirect: '/amortization/create',
  meta: {
    title: '摊销管理',
    icon: 'skill'
  },
  children: [
    {
      path: 'list',
      name: 'amortizationList',
      component: () => import('@/views/amortization/list'),
      meta: {
        title: '摊销列表',
        roles: ['editor']
      }
    },
    {
      path: 'create',
      name: 'amortizationCreate',
      component: () => import('@/views/amortization/create'),
      meta: {
        title: '摊销录入',
        roles: ['editor']
      }
    },
    {
      path: 'month',
      name: 'amortizationMonth',
      component: () => import('@/views/amortization/month'),
      meta: {
        title: '摊销月表',
        roles: ['editor']
      }
    },
    {
      path: 'edit/:id',
      name: 'amortizationEdit',
      component: () => import('@/views/amortization/edit'),
      meta: {
        title: '摊销编辑',
        roles: ['editor'],
        activeMenu: '/amortization/list'
      },
      hidden: true
    }
  ]
}

export default amortizationRouter
