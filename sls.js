/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-26 08:53:28
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-26 09:13:29
 */

// Serverless入口文件
const createApp = require('./server/app')

const app = createApp()

module.exports = app