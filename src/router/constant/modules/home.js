import Layout from '@/libs/Layout'
// 首页
const homeRouter = {
  path: '/', component: Layout, redirect: '/home', children: [
    {
      component: () => import('@/views/aConstant/home'),
      path: 'home', name: 'home',
      meta: { title: '首页', icon: 'chart', affix: true }
    }
  ]
}

export default homeRouter
