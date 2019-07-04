import request from '@/utils/request'

export function fetchSystemUser(query) {
    return request({
        url: '/system/users',
        method: 'get',
        params: query
      })
  }