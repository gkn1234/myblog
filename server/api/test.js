/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-26 18:29:09
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-26 18:38:05
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

router.get('/', async function (req, res) {
  await sleep(1000)
  res.json({a: 1})
})

module.exports = router