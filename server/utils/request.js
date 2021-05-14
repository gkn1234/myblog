const http = require('http')
const https = require('https')
const httpProxy = require('http-proxy')
const fs = require('fs')

const request = {  
  /* 
    创建服务
    @prop listen {Function} - 创建服务的回调函数
    @prop port {String} - 端口号
    @prop type {String} [HTTP] - 服务类型,是HTTP还是HTTPS
    @prop sslAddr {Object/Null} [null] - 如果创建HTTPS服务,需要的SSL证书信息的地址
      @key key {String} - SSL证书中的key部分文件的地址
      @key cert {String} - SSL证书中的cert部分文件的地址
  */
  createServer (listen, port, type = 'HTTP', sslAddr = null) {
    port = request.normalizePort(port)
    
    let server
    if (type == 'HTTPS') {
      let ssl = {}
      if (sslAddr) {
        ssl = request.getSSL(sslAddr)
      }
      server = https.createServer(ssl, listen)
    }
    else if (type == 'HTTP') {
      server = http.createServer(listen)
    }
    // 暂时不支持其他服务
    else {
      return
    }
    
    server.listen(port)
    server.on('error', request.errorHandler)
    server.on('listening', request.listenHandler(server))
  },
  
  /*
    创建代理对象,一般用来绑定域名
    @prop options {Array} - 域名与代理目标的设置
      @key host {String} - 域名
      @key target {String} - 代理目标
    @prop port {String} - 端口
    @prop type {String} [HTTP] - 服务类型,是HTTP还是HTTPS
    @prop sslAddr {Object/Null} [null] - 如果创建HTTPS服务,需要的SSL证书信息的地址
      @key key {String} - SSL证书中的key部分文件的地址
      @key cert {String} - SSL证书中的cert部分文件的地址
  */
  createProxy (options, port, type = 'HTTP', sslAddr = null) {
    if (!options || !Array.isArray(options) || options.length == 0) {
      return
    }
    
    const proxy = httpProxy.createProxyServer({})
    /*proxy.on((err, req, res) => {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
    })*/
    
    port = request.normalizePort(port)
    
    request.createServer((req, res) => {
      const host = req.headers.host
      const des = options.find(item => item.host == host)
      if (des) {
        proxy.web(req, res, { target: des.target })
      }
      else {
        res.writeHead(200, { 
          'Content-Type': 'text/plain' 
        })
        res.end('Welcome')
      }
    }, port, type, sslAddr)
  },
  
  // 获取SSL秘钥
  getSSL (addr) {
    return {
      key: fs.readFileSync(addr.key, 'utf8'),
      cert: fs.readFileSync(addr.cert, 'utf8')
    }
  },
  
  // 将端口统一进行格式化
  normalizePort (val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
      // named pipe
      return val
    }

    if (port >= 0) {
      // port number
      return port
    }

    return false
  },
  
  // HTTP服务发生错误的回调
  errorHandler (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    let port = error.port
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  },
  
  // HTTP服务监听端口的回调
  listenHandler(server) {
    return () => {
      const addr = server.address()
      const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
      console.log('Listening on ' + bind)
    }
  }
}

module.exports = request