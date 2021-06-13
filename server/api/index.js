/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-24 10:29:20
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-04 15:59:49
 */
const test = require('./test')
const blogContent = require('./blogContent')
const customLogin = require('./customLogin')
const blogList = require('./blogList')

// 注册接口
const INTERFACES = {
  test: test.main,
  blogContent: blogContent.main,
  customLogin: customLogin.main,
  blogList: blogList.main
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
  app.use('/api/blogList', blogList.router)
}