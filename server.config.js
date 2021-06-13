/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-26 16:08:06
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-04 12:03:32
 */
const path = require('path')

// __dirname总是指向配置脚本的绝对路径
const rootPath = __dirname

// 后端配置文件
const config = {
  // 提供一个注册为全局变量的方法
  mountGlo () { globalThis.CONFIG = config },

  // 项目的根路径
  rootPath,
  // 服务目录
  serverPath: path.join(rootPath, 'server'),
  // 应用目录
  srcPath: path.join(rootPath, 'src'),
  // 提供一个相对于根目录，快速定位到其他目录的方法
  des (p) {
    return path.join(rootPath, p)
  },

  // 是否为生产环境
  isProd: process.env.NODE_ENV === 'production',
  // 是否为Serverless环境
  isServerless: process.env.SERVERLESS,

  // 监听的端口
  port: 3000,
  // 域名
  domain: 'service-i8gwrsjk-1255355961.gz.apigw.tencentcs.com',

  // 腾讯云相关
  secretId: 'AKIDlWuEOPa2d3Vq04hmSo0Z5TxdPEkTjQk3',
  secretKey: 'dRFa3X58uqluASR2mgn7S3cNnN9v8GE1',
  // TCB环境，数据库需要这个环境
  tcbEnvId: 'myblog-0gvef4vz84623519',
  tcbRegion: 'ap-guangzhou',

  // 存储桶COS目录
  cosUrl: 'https://myblog-1255355961.cos.ap-guangzhou.myqcloud.com/',

  // 数据库集合名
  dbCollections: {
    blogs: 'blogs'
  },
}

module.exports = config