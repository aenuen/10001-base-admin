import Layout from '@/components/Layout'
// 简况
const managerRouter = {
  path: '/manager', name: 'manager', component: Layout, redirect: '/manager/list',
  meta: {
    title: '管理员管理',
    icon: 'peoples',
    roles: ['admin']
  },
  children: [
    {
      path: 'list', name: 'managerList', component: () => import('@/views/manager/list'),
      meta: {
        title: '管理员列表',
        roles: ['admin']
      }
    },
    {
      path: 'create', name: 'managerCreate', component: () => import('@/views/manager/create'),
      meta: {
        title: '新建管理员',
        roles: ['admin']
      }
    },
    {
      path: 'edit/:username', name: 'managerEdit', component: () => import('@/views/manager/edit'),
      meta: {
        title: '人员编辑',
        roles: ['admin'],
        activeMenu: '/manager/list'
      },
      hidden: true
    }
  ]
}

export default managerRouter
