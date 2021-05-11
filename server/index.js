/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-21 09:07:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-11 10:57:11
 */
const app = require('./app')
const request = require('./utils/request.js')

// 创建HTTP服务与HTTPS服务
app.slsInitialize().then(() => {
  request.createServer(app, CONFIG.port, 'HTTP')
})