/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-11 09:18:22
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-23 15:30:25
 */
const fs = require('fs')

/**
 * 初始化SSR相关中间件
 * @return {ssrViteDevServer} vite SSR中间件对象，只会在开发环境返回
 */
async function initSSRMidware (app) {
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
    // 生产环境下，启动静态文件服务
    const serverStatic = require('serve-static')
    
    app.use(serverStatic(CONFIG.des('dist/client'), {
      index: false
    }))
  }
  return ssrViteDevServer
}

// 处理SSR静态预处理模板的路由
function ssrStaticTemplateRouter (app) {

}

// 处理SSR动态渲染的路由
function ssrDynamicRenderRouter (app, ssrViteDevServer) {
  app.use('*', async function (req, res) {
    try {
      const url = req.originalUrl
      console.log(url)
  
      let template, render, manifest = ''
  
      if (ssrViteDevServer) {
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
}

module.exports = {
  initSSRMidware,
  ssrStaticTemplateRouter,
  ssrDynamicRenderRouter
}


