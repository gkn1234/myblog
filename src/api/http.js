/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-27 11:46:17
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 16:25:53
 */
import axios from 'axios'

// 创建定制的axios实例
export const http = axios.create({
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  // 是否跨站点访问控制请求
  withCredentials: true,
  // 超时时间
  timeout: 10000,
  /**
   * 向服务器发送请求前，序列化请求数据钩子transformRequest，取值是Array<Function>
   * 注意请求头中有application/json时，这一步会由axios代劳
   * transformRequest: Array<Function>
   */
  /**
   * 修改服务器响应数据的钩子transformResponse，取值是Array<Function>，与transformRequest类似
   */
  // 无论响应出错与否，都设置为resolve状态，统一在then处理
  validateStatus () { return true }
})

export const HTTP_STATUS = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
}

function showStatus (status) {
  let message = HTTP_STATUS[status]
  if (!message) {
    message = `连接出错(${status})!`
  }
  return message
}

// 请求拦截器
http.interceptors.request.use((config) => {
  return config
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
  const status = response.status
  let msg = ''
  if (status < 200 || status >= 300) {
    // 处理http错误，抛到业务代码
    msg = showStatus(status)
    if (typeof response.data === 'string') {
      response.data = { msg }
    } 
    else {
      response.data.msg = msg
    }
  }
  return response
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
  return Promise.resolve(error)
})