import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import router from '@/router'
import api from './environment'

const PORT1 = '/baseinfo'
const BASE_INFO = '/baseinfo'
const PORT2 = '/order'
const PORT3 = '/bill'

// 创建axios实例
const service = axios.create({
  baseURL: api.envApi
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 可以不通过access_token校验的接口
    const whitePath = [
      `${BASE_INFO}/mobile/signUp`,
      '/auth/mobile/token/social',
      `${PORT1}/WeChatEventPush/getQRCodeTemp`,
      `${PORT1}/mobile/signUp`,
      `${PORT1}/mobile/changePassword`,
      `${PORT1}/user/updatePassword`
    ]

    // 文件下载接口列表
    const outputFilePath = [
      `${PORT2}/express_addresses/export`,
      `${PORT3}/price/exportExcelTemplate`,
      `${PORT3}/bill/exportExcelTemplate`,
      `${PORT3}/account/exportAccount`,
      `${PORT3}/bill/exportBill`,
      `${PORT3}/hostingAccount/importAccount`,
      `${PORT3}/hostingAccount/exportExcelTemplate`,
      `${PORT3}/hostingAccount/exportHostingAccount`,
      `${PORT2}/orders/export`,
      `${PORT2}/hosting_orders/export`,
      `${PORT1}/company/exportInTrustOverview`,
      `${PORT3}/hostingBill/exportBill`,
      `${PORT1}/user/exportExcelTemplate`,
      `${PORT1}/user/importUsers`,
      `${PORT2}/hosting_orders/export`,
      `${PORT2}/express_addresses/import`,
      `${PORT2}/orders/import`,
      `${PORT1}/platform/exportOverview/1`,
      `${PORT1}/platform/exportOverview/2`,
      `${PORT2}/orders/exportExcelTemplate`,
      `${PORT2}/order_tasks/export`
    ]
    // 验证码登录
    const oauthLoginPath = 'auth/oauth/token'
    if (whitePath.indexOf(config.url) > -1) {
      config.headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
    } else if (config.url.indexOf(oauthLoginPath) > -1) {
      config.headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
    } else {
      config.headers[
        'Authorization'
      ] = `Bearer ${store.getters.authorization.access_token}`
      config.headers['TENANT-ID'] = store.getters.authorization.tenant_id
    }
    if (
      outputFilePath.indexOf(config.url) > -1 ||
      config.url.indexOf('/baseinfo/user/importUsers') > -1 ||
      config.url.indexOf('/zjs/orders/import') > -1
    ) {
      config.responseType = 'blob'
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    if (response.status === 200) {
      const res = response.data
      if (res.code === 401) {
        Message.error({
          message: '登录过期请重新登录',
          duration: 2 * 1000
        })
        setTimeout(function() {
          store.commit('SET_AUTHOR', {})
          router.push({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }, 1000)
      } else if (res.code > 401) {
        if (res.message) {
          Message.error({
            message: res.message.split('@@')[0],
            duration: 2 * 1000
          })
        }
        return false
      } else if (res.code === 400) {
        if (res.message) {
          Message.error({
            message: res.message.split('@@')[0],
            duration: 2 * 1000
          })
        }
        return false
      }
      return Promise.resolve(response)
    } else if (response.status === 201) {
      return Promise.reject(response)
    }
  },
  err => {
    if (err.response && err.response.status) {
      if (err.response.status === 401) {
        Message.error({
          message: err.response.data.message.split('@@')[0],
          duration: 2000
        })
      } else if (err.response.status < 500) {
        Message.error({
          message: err.response.data.message,
          duration: 2000
        })
      } else {
        store.commit('SET_AUTHOR', {})
        Message.error({
          message: '服务异常',
          duration: 2000
        })
      }
    }
    return Promise.reject(err)
  }
)

/**
 * 封装get请求
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param body
 * @returns {Promise}
 */
export function post(url, body) {
  return new Promise((resolve, reject) => {
    service
      .post(url, body)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param body
 * @returns {Promise}
 */
export function patch(url, body) {
  return new Promise((resolve, reject) => {
    service
      .patch(url, body)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装delete方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function Delete(url, params) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param body
 * @returns {Promise}
 */

export function put(url, params) {
  return new Promise((resolve, reject) => {
    service
      .put(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
