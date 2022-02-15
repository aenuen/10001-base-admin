import Layout from '@/components/Layout'

export const loginRouter = {
  path: '/login',
  component: () => import('@/views/login'),
  hidden: true
}
export const httpRedirectRouter = {
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '/redirect/:path(.*)',
      component: () => import('@/views/login/redirect/http')
    }
  ]
}
export const authRedirectRouter = {
  path: '/auth-redirect',
  component: () => import('@/views/login/redirect/auth'),
  hidden: true
}
