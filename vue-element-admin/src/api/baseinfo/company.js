import request from '@/utils/request'

export function fetchCompanyByParams(query) {
    return request({
        url: '/companies',
        method: 'get',
        params: query
      })
  }

  export function createCompany(data) {
    return request({
      url: '/companies',
      method: 'post',
      data
    })
  }

  export function updateCompany(data) {
    return request({
      url: '/companies/'+data.id,
      method: 'put',
      data
    })
  }
  
  export function deleteCompanyById(id) {
    return request({
      url: '/companies/'+id,
      method: 'delete'
    })
  }