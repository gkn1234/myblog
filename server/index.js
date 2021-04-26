/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-21 09:07:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-26 17:47:57
 */
const app = require('./app')
const request = require('./utils/request.js')

// 创建HTTP服务与HTTPS服务
app.slsInitialize().then(() => {
  request.createServer(app, '3000', 'HTTP')
})