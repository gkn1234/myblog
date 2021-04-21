const ssrRouter = function (app) {
  // 初始化页面路由
  app.use('*', require('./ssr/index.js'))
}

const apiRouter = function (app) {
  
}

module.exports = {
  ssrRouter,
  apiRouter
}