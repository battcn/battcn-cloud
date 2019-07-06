import request from '@/utils/request'

/**
 * 根据条件分页查询
 * @param query 查询条件
 */
export function fetchSystemUser(query) {
  return request({
    url: '/system/users',
    method: 'get',
    params: query
  })
}

/**
 * 添加用户
 * @param data 数据
 */
export function createSystemUser(data) {
  return request({
    url: '/system/users',
    method: 'post',
    data
  })
}

/**
 * 修改用户信息
 * @param data
 */
export function updateSystemUser(data) {
  return request({
    url: '/system/users/' + data.id,
    method: 'put',
    data
  })
}

/**
 * 根据ID删除用户信息
 * @param id ID
 */
export function deleteSystemUser(id) {
  return request({
    url: '/system/users/' + id,
    method: 'delete'
  })
}
