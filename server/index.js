/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-21 09:07:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-06 17:13:41
 */
const app = require('./app')
const request = require('./utils/request.js')

// 创建HTTP服务与HTTPS服务
app.slsInitialize().then(() => {
  request.createServer(app, CONFIG.port, 'HTTP')
/*
INTERFACES.blogList({ keyword: '发定位' }).then((res) => {
  console.log(res)
})
.catch((e) => {
  console.log(e)
})
*/
})

