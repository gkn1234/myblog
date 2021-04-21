/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2020-12-21 09:07:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-21 10:39:27
 */
const path = require('path')

// __dirname总是指向config.js脚本的绝对路径
const rootPath = path.join(__dirname, '..')

const config = {
  // 项目的根路径
  rootPath,

  // 提供一个相对于根目录，快速定位到其他目录的方法
  des (p) {
    return path.join(rootPath, p)
  },

  // 是否为生产环境
  isProd: process.env.NODE_ENV === 'production',
  
  // SSR渲染模板路径
  // ssrTemplatePath: path.join(rootPath, 'src/index.temp.html'),
  
  cors: {
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    alloweHeaders: ['Content-Type', 'Authorization']
  }
}

// 注册为全局变量，以便任何文件都能方便引用
global.CONFIG = config

module.exports = config