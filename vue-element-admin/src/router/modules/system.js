/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'list'
  },
  children: [
    {
      path: 'system-table',
      component: () => import('@/views/system/user/index'),
      name: 'UserManager',
      meta: { title: '用户管理' }
    },
    {
      path: 'role-table',
      component: () => import('@/views/system/role/index'),
      name: 'RoleManager',
      meta: { title: '角色管理' }
    }
    // {
    //   path: 'log-table',
    //   component: () => import('@/views/system/log/index'),
    //   name: 'SystemLog',
    //   meta: { title: '系统日志' }
    // }
  ]
}
export default systemRouter
