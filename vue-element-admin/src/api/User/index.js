import { Delete, get, patch, post, put } from '../request'

const BASE_INFO = '/baseinfo'

const api = {}

/**
 * 获取公司员工列表
 */
api.getCompanyUser = param => {
  return get(`${BASE_INFO}/user`, param)
}

/**
 * 通过公司id获取公司员工列表
 */
api.getUserByCompanyId = id => {
  return get(`${BASE_INFO}/user/queryUsersByCompanyId/${id}`)
}

/**
 * 获取当前用户全部信息
 */
api.getUserInfo = () => {
  return get(`${BASE_INFO}/user/info`)
}

/**
 * 获取结算人列表
 */
api.getSetterMan = param => {
  return get(`${BASE_INFO}/user/getCompanyUser`, param)
}

/**
 * 获取公司部门列表
 */
api.getCompanyDept = param => {
  return get(`${BASE_INFO}/dept/listByCompanyId`, param)
}

/**
 * 获取公司登录二维码链接
 */
api.getUserTicket = () => {
  return get(`${BASE_INFO}/company/getTicket`)
}

/**
 * 获取公司注册验证码
 */
api.getCode = param => {
  return get(`${BASE_INFO}/mobile/signUp`, param)
}

/**
 * 获取公司重置密码验证码
 */
api.getResetCode = param => {
  return get(`${BASE_INFO}/mobile/changePassword`, param)
}

/**
 * 重置公司密码
 */
api.updatePwd = param => {
  return put(`${BASE_INFO}/user/updatePassword`, param)
}

/**
 * 更新用户信息
 */
api.updateUser = param => {
  return put(`${BASE_INFO}/user`, param)
}

/**
 * 添加用户
 */
api.addUser = param => {
  return post(`${BASE_INFO}/user`, param)
}

/**
 * 人员审核
 */
api.reviewUser = (status, param) => {
  return put(`${BASE_INFO}/user/updateStatus/${status}`, param)
}

/**
 * 获取公司审核状态
 */
api.getCompanyStatus = id => {
  return get(`${BASE_INFO}/company/${id}/approval`)
}

/**
 * 人员免审
 */
api.userUnReview = id => {
  return patch(`${BASE_INFO}/company/${id}/activate`)
}

/**
 * 取消免审
 */
api.userReview = id => {
  return patch(`${BASE_INFO}/company/${id}/disabled`)
}

/**
 * 管理员设置
 */
api.updateUserFlag = (params, status) => {
  return put(`${BASE_INFO}/user/updateAdminFlag/${status}`, params)
}

/**
 * 删除用户
 */
api.deleteUser = id => {
  return Delete(`${BASE_INFO}/user/${id}`)
}

/**
 * 查询单个用户信息
 */
api.getInfoUser = id => {
  return get(`${BASE_INFO}/user/${id}`)
}

/**
 * PC-绑定手机号
 */
api.bindingPC = params => {
  return put(`${BASE_INFO}/user/bindingPC`, params)
}

/**
 * PC-发送短信验证码-修改密码
 */
api.changePassword_mobile = params => {
  return get(`${BASE_INFO}/mobile/changePassword`, params)
}

/**
 * 根据ID，删除公司,需要配置删除按钮权限
 */
api.companyDel = params => {
  return Delete(`${BASE_INFO}/company/${params}`)
}

/**
 * 查询系统短息服务
 */
api.addMsgRecord = params => {
  return get(`${BASE_INFO}/msgRecord/queryMsgRecord`, params)
}

/**
 * 编辑公司
 */
api.editCompany = params => {
  return post(`${BASE_INFO}/company/editCompany`, params)
}

/**
 * 托管公司列表
 */
api.queryCompanyList = params => {
  return get(`${BASE_INFO}/company/queryCompanyByCompanyType`, params)
}

export default api
