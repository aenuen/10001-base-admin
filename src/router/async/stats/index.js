import Layout from '@/components/Layout'

// 组件
const statsRouter = {
  path: '/stats', name: 'stats', component: Layout, redirect: '/stats/create',
  meta: {
    title: '项目统计',
    icon: 'skill'
  },
  children: [
    {
      path: 'list',
      name: 'statsList',
      component: () => import('@/views/stats/list'),
      meta: {
        title: '产品列表',
        roles: ['editor']
      }
    },
    {
      path: 'create',
      name: 'statsCreate',
      component: () => import('@/views/stats/create'),
      meta: {
        title: '产品创建',
        roles: ['editor']
      }
    },
    {
      path: 'month',
      name: 'statsMonth',
      component: () => import('@/views/stats/month'),
      meta: {
        title: '月表统计',
        roles: ['editor']
      }
    },
    {
      path: 'update/:id',
      name: 'statsUpdate',
      component: () => import('@/views/stats/update'),
      meta: {
        title: '产品编辑',
        roles: ['editor'],
        activeMenu: '/stats/list'
      },
      hidden: true
    }
  ]
}

export default statsRouter
