/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-24 10:29:20
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 16:39:27
 */
const test = require('./test')

// 注册接口
const INTERFACES = {
  test: test.main
}


module.exports = function (app) {
  // 将所有API接口注册到全局命名空间，供渲染时调用(因为SSR模板渲染时，服务端的cjs和客户端的esm模块无法互相引用)
  global.INTERFACES = INTERFACES

  // 注册路由
  app.use('/api/test', test.router)
}