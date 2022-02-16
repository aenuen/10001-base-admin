import request from '@/libs/axios/request'

export const getRoutes = () => request({ url: '/vue-element-admin/routes', method: 'get' })
export const getRoles = () => request({ url: '/vue-element-admin/roles', method: 'get' })
export const addRole = data => request({ url: '/vue-element-admin/role', method: 'post', data })
export const updateRole = (id, data) => request({ url: `/vue-element-admin/role/${id}`, method: 'put', data })
export const deleteRole = id => request({ url: `/vue-element-admin/role/${id}`, method: 'delete' })
