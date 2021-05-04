/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-29 11:04:53
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-04 15:12:22
 */
const express = require('express')
const marked = require('../utils/marked')
const toc = require('markdown-toc')

const { http } = require('../utils/http')

const router = express.Router()

// 接口定义
async function main () {
  const mdUrl = 'https://myblog-1255355961.cos.ap-guangzhou.myqcloud.com/blogs/test.md'
  const mdRes = await http.get(mdUrl)
  const mdData = mdRes.data
  if (mdData.errSignal) {
    return mdData
  }

  const mdTxt = mdData.content
  const tocData = toc(mdTxt).json
  return {
    md: mdTxt,
    toc: tocData
  }
}

router.get('/', async function (req, res) {
  const result = await main()
  res.send(result)    
})

module.exports = {
  main,
  router
}