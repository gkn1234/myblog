/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-24 10:29:20
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-26 18:36:18
 */
const test = require('./test')

module.exports = function (app) {
  app.use('/api/test', test)
}