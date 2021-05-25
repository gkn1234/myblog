/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-21 11:16:00
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-23 15:30:47
 */
const express = require('express')
const { getAuth, getDb } = require('../utils/tcb')

const router = express.Router()

/**
 * @param {Object} user 用户对象信息
 */
async function main (params) {
  // 先从数据库获取_id
  const db = getDb()


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