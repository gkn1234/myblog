/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-29 11:04:53
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-29 11:11:53
 */
const express = require('express')

const router = express.Router()

// 接口定义
async function main () {
  const mdUrl = ''
  await sleep(1000)
  return {a: 1}
}

router.get('/', async function (req, res) {
  const result = await main()
  res.send(result)
})

module.exports = {
  main,
  router
}