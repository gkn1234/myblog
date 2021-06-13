/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-06-04 11:50:11
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-04 16:23:54
 */
const express = require('express')
const { getDb } = require('../utils/tcb')

const { http } = require('../utils/http')

const router = express.Router()

/**
 * @param {Number} start 开始的条数索引
 * @param {Number} limit 获取条数限制
 * @param {String} category 分类
 * @param {Array<String>} tags 标签
 * @param {String} keyword 关键字
 */
async function main ({ 
  start = 0, 
  limit = 10, 
  category = '',
  tags = [], 
  keyword = '' 
} = {}) {
  const db = getDb()
  const _ = db.command
  const collection = db.collection(CONFIG.dbCollections.blogs)

  let condition = {}
  if (category && category !== '') {
    condition.categories = category
  }
  if (tags && Array.isArray(tags) && tags.length > 0) {
    condition.tags = _.in(tags)
  }
  if (keyword && keyword !== '') {
    condition = _.and(condition,
      _.or(
        {
          desc: db.RegExp({
            regexp: `${keyword}`,
            options: 'i'
          })
        },
        {
          title: db.RegExp({
            regexp: `${keyword}`,
            options: 'i'
          })
        }
      )
    )
  }

  console.log(condition)

  const res = await collection.where(condition)
    .skip(start)
    .limit(limit)
    .get()
  
  return res.data
}

router.get('/', async function (req, res) {
  const result = await main(req.query)
  res.send(result)
})

module.exports = {
  main,
  router
}