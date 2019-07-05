import request from '@/utils/request'

export function fetchSystemUser(query) {
    return request({
        url: '/system/users',
        method: 'get',
        params: query
      })
  }

  export function createSystemUser(data) {
    return request({
      url: '/system/users',
      method: 'post',
      data
    })
  }

  export function updateSystemUser(data) {
    return request({
      url: '/system/users/'+data.id,
      method: 'put',
      data
    })
  }
  
  export function deleteSystemUser(id) {
    return request({
      url: '/system/users/'+id,
      method: 'delete'
    })
  }