import Layout from '@/components/Layout'
// 简况
const managerRouter = {
  path: '/manager', name: 'manager', component: Layout, redirect: '/manager/list',
  meta: {
    title: '用户管理',
    icon: 'peoples',
    roles: ['admin']
  },
  children: [
    {
      path: 'list', name: 'managerList', component: () => import('@/views/aConstant/manager/list'),
      meta: {
        title: '用户列表',
        roles: ['admin']
      }
    },
    {
      path: 'create', name: 'managerCreate', component: () => import('@/views/aConstant/manager/create'),
      meta: {
        title: '新建用户',
        roles: ['admin']
      }
    },
    {
      path: 'edit/:id', name: 'managerEdit', component: () => import('@/views/aConstant/manager/update'),
      meta: {
        title: '用户编辑',
        roles: ['admin'],
        activeMenu: '/manager/list'
      },
      hidden: true
    },
    {
      path: 'data', name: 'personalData', component: () => import('@/views/aConstant/manager/data'),
      meta: {
        title: '个人资料'
      },
      hidden: true
    }
  ]
}

export default managerRouter
