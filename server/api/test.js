/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-26 18:29:09
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 17:02:42
 */
const express = require('express')

const router = express.Router()

function sleep (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// 接口定义
async function main () {
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