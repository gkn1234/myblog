/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-21 09:07:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-22 17:55:47
 */
const app = require('./app')
const request = require('./utils/request.js')
const { getDb } = require('./utils/tcb')

// 创建HTTP服务与HTTPS服务
app.slsInitialize().then(() => {
  request.createServer(app, CONFIG.port, 'HTTP')
})

const db = getDb()
db.collection('test').doc('49688a5060a8d4bb0002347d63fb5111').get().then((res) => {
  console.log(typeof res.data[0].a, res.data[0].a instanceof Date)
})
.catch((e) => {
  console.log(e.message)
})