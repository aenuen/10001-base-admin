import Layout from '@/components/Layout'
// 简况
const personalRouter = {
  path: '/personal', name: 'personal', component: Layout, redirect: '/personal/data',
  meta: {
    title: '管理员管理',
    icon: 'peoples'
  },
  hidden: true,
  children: [
    {
      path: 'data', name: 'personalData', component: () => import('@/views/personal/data'),
      meta: {
        title: '个人资料'
      },
      hidden: true
    }
  ]
}

export default personalRouter
