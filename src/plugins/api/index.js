/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-27 11:23:43
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-25 19:30:37
 */
import md5 from 'js-md5'
import { API } from './api'
import { http } from './http'

export { API }

// 只在客户端环境下调用的请求
export async function clientRequest (apiName, params = {}) {
  if (import.meta.env.SSR) { return }

  if (!API[apiName]) {
    throw new Error('Invalid API name!')
  }
  const [path, method] = API[apiName]

  const request = method === 'post' ? http.post : http.get
  const res = await request(path, params)
  return res.data
}

// SSR应用从后端获取数据的插件，能够妥善处理SSR场景下的数据同步
export function createApiService () {
  const service = {
    asyncData: {},

    async request (apiName, params = {}) {
      if (!API[apiName]) {
        throw new Error('Invalid API name!')
      }
      const name = apiName
      const [path, method] = API[apiName]
      const requestId = md5(name + JSON.stringify(params))

      if (import.meta.env.SSR) {
        // SSR的Node环境，直接用接口获取数据，不需要axios请求
        // 接口已在Node环境中被注册为全局变量
        if (!INTERFACES || !INTERFACES[name]) {
          // 前端和后端的接口名称必须约定一致
          throw new Error('Can not find property interfaces')
        }
  
        const intf = INTERFACES[name]
        // 后端接口必须为异步的形式
        const res = await intf(params)
        // 存入同步数据
        service.asyncData[requestId] = res
        return res
      }
  
      // 前端接管服务器完成渲染的情况
      if (window && window.__INITIAL_STATE__ && typeof window.__INITIAL_STATE__ === 'object' && window.__INITIAL_STATE__[requestId]) {
        // 如果后端已经完成请求且渲染到位，则前端接管页面后，没必要重复，直接同步即可，
        // 但是只有在接管服务端渲染后可以同步一次，以后还需要重新获取数据
        const res = window.__INITIAL_STATE__[requestId]
        window.__INITIAL_STATE__[requestId] = null
        return res
      }
  
      // 前端为客户端渲染，客户端发起请求的情况
      const request = method === 'post' ? http.post : http.get
      const res = await request(path, params)
      return res.data 
    },
    
    // 供Vue.use调用
    install (app, options) {
      app.provide('$apiService', service)
      app.provide('$http', service.request)
    }
  }

  return service
}