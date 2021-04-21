/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-21 09:07:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-21 09:32:46
 */
const createApp = require('./app')
const request = require('./utils/request.js')

// 创建HTTP服务与HTTPS服务
createApp().then((app) => {
  request.createServer(app, '3000', 'HTTP')
})
