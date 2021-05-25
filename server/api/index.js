/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-24 10:29:20
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-22 14:13:18
 */
const test = require('./test')
const blogContent = require('./blogContent')
const customLogin = require('./customLogin')

// 注册接口
const INTERFACES = {
  test: test.main,
  blogContent: blogContent.main,
  customLogin: customLogin.main
}


module.exports = function (app) {
  // 将所有API接口注册到全局命名空间，供渲染时调用(因为SSR模板渲染时，服务端的cjs和客户端的esm模块无法互相引用)
  globalThis.INTERFACES = INTERFACES

  if (!app) {
    return
  }

  // 注册路由
  app.use('/api/test', test.router)
  app.use('/api/blogContent', blogContent.router)
  app.use('/api/customLogin', customLogin.router)
}