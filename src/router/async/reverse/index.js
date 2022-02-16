import Layout from '@/components/Layout'

// 组件
const reserveRouter = {
  path: '/reserve', name: 'reserve', component: Layout, redirect: '/reserve/create',
  meta: {
    title: '库存管理',
    icon: 'shopping',
    roles: ['editor']
  },
  children: [
    {
      path: 'list',
      name: 'reserveList',
      component: () => import('@/views/reserve/list'),
      meta: {
        title: '库存列表',
        roles: ['editor']
      }
    },
    {
      path: 'create',
      name: 'reserveCreate',
      component: () => import('@/views/reserve/create'),
      meta: {
        title: '库存录入',
        roles: ['editor']
      }
    },
    {
      path: 'edit/:id',
      name: 'reserveEdit',
      component: () => import('@/views/reserve/edit'),
      meta: {
        title: '库存编辑',
        activeMenu: '/reserve/list', // 指定高亮位置
        roles: ['editor']
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'month',
      name: 'reserveMonth',
      component: () => import('@/views/reserve/month'),
      meta: {
        title: '库存月表',
        roles: ['editor']
      }
    }
  ]
}

export default reserveRouter
