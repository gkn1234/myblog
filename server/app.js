/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-21 09:07:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-05 10:55:15
 */
// 全局配置，只需要在核心文件匹配一次，之后注册为全局变量
const CONFIG = require('../server.config')
CONFIG.mountGlo()

const fs = require('fs')
const express = require('express')

const app = express()

// 初始化函数，为了兼容serverless
app.slsInitialize = async () => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // SSR建立服务
  let ssrViteDevServer
  if (!CONFIG.isProd) {
    // 开发环境下，开启vite中间件
    const { createServer: createViteServer } = require('vite')
    ssrViteDevServer = await createViteServer({
      root: CONFIG.rootPath,
      server: { 
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })
    app.use(ssrViteDevServer.middlewares)
  }
  else {
    const serverStatic = require('serve-static')
    
    app.use(serverStatic(CONFIG.des('dist/client'), {
      index: false
    }))
  }

  // API处理
  const useApi = require('./api/index')
  useApi(app)


  // SSR路由处理
  app.use('*', async function (req, res) {
    try {
      const url = req.originalUrl
  
      let template, render, manifest = ''
  
      if (!CONFIG.isProd) {
        // 开发环境，应用vite HTML转换，启动热更新
        template = await fs.promises.readFile(CONFIG.des('index.html'), 'utf-8')
        template = await ssrViteDevServer.transformIndexHtml(url, template)
        // 开发环境加载服务器入口
        render = await ssrViteDevServer.ssrLoadModule(CONFIG.des('src/entry-server.js'))
        render = render.render
      }
      else {
        // 线上生产环境，读取SSR构建的最终结果
        template = await fs.promises.readFile(CONFIG.des('dist/client/index.html'), 'utf-8')
        render = require(CONFIG.des('dist/server/entry-server.js')).render
        manifest = require(CONFIG.des('dist/client/ssr-manifest.json'))
      }
  
      // 渲染出HTML
      const [appHtml, preloadLinks, asyncData] = await render(url, manifest)
  
      // 注入应用渲染的 HTML 到模板中。
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`'<async-data>'`, JSON.stringify(asyncData))
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } 
    catch (e) {
      // 在开发环境下，如果捕获到了一个错误，让 vite 来修复该堆栈，这样它就可以映射回你的实际源码中。
      if (ssrViteDevServer) { ssrViteDevServer.ssrFixStacktrace(e) }
      console.error(e)
      res.status(500).end(e.message)
    }
  })

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
