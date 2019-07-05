/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const companyRouter = {
  path: '/baseinfo/companies',
  component: Layout,
  redirect: '/baseinfo/companies',
  name: 'BaseinfoCompany',
  meta: {
    title: '基础信息',
    icon: 'list'
  },
  children: [
    {
      path: 'company-list',
      component: () => import('@/views/baseinfo/company/index'),
      name: 'Company',
      meta: { title: '公司管理' }
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
export default companyRouter
