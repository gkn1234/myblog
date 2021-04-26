/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-26 16:08:06
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-26 16:15:16
 */
const path = require('path')

// __dirname总是指向配置脚本的绝对路径
const rootPath = __dirname

const config = {
  // 提供一个相对于根目录，快速定位到其他目录的方法
  des (p) {
    return path.join(rootPath, p)
  },
  // 提供一个注册为全局变量的方法
  mountGlo () { global.CONFIG = config },

  // 项目的根路径
  rootPath,
  // 服务目录
  serverPath: path.join(rootPath, 'server'),
  // 应用目录
  srcPath: path.join(rootPath, 'src'),

  // 是否为生产环境
  isProd: process.env.NODE_ENV === 'production',
  // 是否为Serverless环境
  isServerless: process.env.SERVERLESS,

  // 存储桶COS目录
  cosUrl: 'https://myblog-1255355961.cos.ap-guangzhou.myqcloud.com/'
}

module.exports = config