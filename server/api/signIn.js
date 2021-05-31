/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-22 14:08:58
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-22 14:08:58
 */
const express = require('express')

const router = express.Router()

/**
 * @param {Object} user 用户对象信息
 */
async function main ({ nickname, qq, uid }) {
  const auth = getAuth()
  const ticket = auth.createTicket(params.uid)
  return ticket
}

router.post('/', async function (req, res) {
  const result = await main(req.body)
  res.send(result)    
})

module.exports = {
  main,
  router
}