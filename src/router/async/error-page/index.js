import Layout from '@/components/Layout'

const errorPageRouter = {
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: '错误页面',
  meta: {
    title: '错误页面',
    icon: '404'
  },
  children: [
    {
      path: '401',
      component: () => import('@/views/error-page/401'),
      name: '401页面',
      meta: {
        title: '401页面',
        noCache: true
      }
    },
    {
      path: '404',
      component: () => import('@/views/error-page/404'),
      name: '404页面',
      meta: {
        title: '404页面',
        noCache: true
      }
    }
  ]
}

export default errorPageRouter
