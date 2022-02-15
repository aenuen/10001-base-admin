import Layout from '@/components/Layout'
// 首页
const homeRouter = {
  path: '/', component: Layout, redirect: '/home', children: [
    {
      component: () => import('@/views/home'),
      path: 'home', name: 'home',
      meta: { title: '首页', icon: 'chart', affix: true }
    }
  ]
}

export default homeRouter
