/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-21 09:07:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-11 11:28:38
 */
// 全局配置，只需要在核心文件匹配一次，之后注册为全局变量
const CONFIG = require('../server.config')
CONFIG.mountGlo()

const express = require('express')

const { initSSRMidware, ssrDynamicRenderRouter } = require('./utils/ssr')
const useApi = require('./api/index')
const { getTcb } = require('./utils/tcb')

const app = express()

// 初始化函数，为了兼容serverless
app.slsInitialize = async () => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // SSR建立服务，初始化相关中间件
  let ssrViteDevServer = await initSSRMidware(app)

  // 云开发相关，TCB初始化
  getTcb()

  // API路由处理
  useApi(app)

  // SSR路由处理
  ssrDynamicRenderRouter(app, ssrViteDevServer)

  // 没有匹配到任何路由
  app.use((err, req, res, next) => {
    console.log('error', err)
    
    // set locals, only providing error in development
    /*
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
    */
  })

  // 应用异常捕获,我承认我是菜比,先这么处理吧
  /*
  process.on('uncaughtException', (err) => {
    //打印出错误
    console.log(err)
    //打印出错误的调用栈方便调试,以后写一个日志类再记录到文件
    console.log(err.stack)
  })
  */  
}

module.exports = app
