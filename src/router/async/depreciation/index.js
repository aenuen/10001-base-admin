import Layout from '@/components/Layout'

// 组件
const depreciationRouter = {
  path: '/depreciation', name: 'depreciation', component: Layout, redirect: '/depreciation/create',
  meta: {
    title: '折旧管理',
    icon: 'skill'
  },
  children: [
    {
      path: 'list',
      name: 'depreciationList',
      component: () => import('@/views/depreciation/list'),
      meta: {
        title: '折旧列表',
        roles: ['editor']
      }
    },
    {
      path: 'create',
      name: 'depreciationCreate',
      component: () => import('@/views/depreciation/create'),
      meta: {
        title: '折旧录入',
        roles: ['editor']
      }
    },
    {
      path: 'month',
      name: 'depreciationMonth',
      component: () => import('@/views/depreciation/month'),
      meta: {
        title: '折旧月表',
        roles: ['editor']
      }
    },
    {
      path: 'edit/:id',
      name: 'depreciationEdit',
      component: () => import('@/views/depreciation/edit'),
      meta: {
        title: '折旧编辑',
        roles: ['editor'],
        activeMenu: '/depreciation/list'
      },
      hidden: true
    }
  ]
}

export default depreciationRouter
