import Layout from '@/components/Layout'
const articleRouter = {
  path: '/article', name: 'article', component: Layout, redirect: '/article/list',
  meta: {
    title: '文章管理',
    icon: 'peoples',
    roles: ['manager', 'editor']
  },
  children: [
    {
      path: 'list', name: 'articleList', component: () => import('@/views/article/list'),
      meta: {
        title: '文章列表',
        roles: ['manager', 'editor']
      }
    },
    {
      path: 'create', name: 'articleCreate', component: () => import('@/views/article/create'),
      meta: {
        title: '新建文章',
        roles: ['manager', 'editor']
      }
    },
    {
      path: 'update/:id', name: 'articleUpdate', component: () => import('@/views/article/update'),
      meta: {
        title: '文章编辑',
        roles: ['manager', 'editor'],
        activeMenu: '/article/list'
      },
      hidden: true
    }
  ]
}

export default articleRouter
