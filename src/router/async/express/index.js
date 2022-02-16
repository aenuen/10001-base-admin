import Layout from '@/components/Layout'

// 组件
const expressRouter = {
  path: '/express', name: 'express', component: Layout, redirect: '/express/create',
  meta: {
    title: '快递管理',
    icon: 'skill'
  },
  children: [
    {
      path: 'list',
      name: 'expressList',
      component: () => import('@/views/express/list'),
      meta: {
        title: '快递列表',
        roles: ['editor']
      }
    },
    {
      path: 'create',
      name: 'expressCreate',
      component: () => import('@/views/express/create'),
      meta: {
        title: '快递录入',
        roles: ['editor']
      }
    },
    {
      path: 'update/:id',
      name: 'expressEdit',
      component: () => import('@/views/express/update'),
      meta: {
        title: '快递编辑',
        roles: ['editor'],
        activeMenu: '/express/list'
      },
      hidden: true
    }
  ]
}

export default expressRouter
