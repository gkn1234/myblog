/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-21 11:34:15
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-22 17:52:37
 */
const COLLECTIONS = require('./collections')
const { getDb } = require('../utils/tcb')
const db = getDb()

// 常规数据库schema
class Base {
  // 所有集合名称
  static COLLECTIONS = COLLECTIONS
  static db = db

  // NOSQL每一条数据的唯一索引
  _id = null
  // 数据库引用
  db = db
  // 数据库集合名称
  collectionName = ''
  // 数据库集合实例
  get collection () {
    if (!this.db || typeof this.db.collection !== 'function') {
      throw new Error('The database has not be initialised correctly!')
    }
    return this.db.collection(this.collectionName)
  }
  set collection (val) {
    throw new Error('The value on key collection is readonly!')
  }
  // 数据库文档引用
  get doc () {
    if (!this._id) {
      // 如果没有_id，代表没有跟数据库同步，返回null
      return null
    }
    return this.collection.doc(this._id)
  }
  set doc (value) {
    throw new Error('The value on key doc is readonly!')
  }
  // 数据
  data = {}

  /**
   * @param {Object} data 传入Object，代表新数据，需要调用add方法后与数据库同步
   * @param {String} data 传入String，作为id，需要通过get从数据库获取数据
   */
  constructor (data = {}) {
    if (typeof data === 'string') {
      this._id = data
    }
    else if (data && typeof data === 'object') {
      this.set(data)
    }
  }

  // 添加数据
  async add () {
    if (!this._id) {
      const res = await this.collection.add(this.data)
      this._id = res.id
    }
    else {
      throw new Error('The doc has already been added to database.')
    }
  }

  // 获取数据
  async get () {
    if (this.doc) {
      const res = await this.doc.get()
      if (res.data && res.data.length > 0) {
        this.set(res.data[0])
      }
      else {
        throw new Error('The doc is not exist!')
      }
    }
    else {
      throw new Error('The should add this doc to database before getting!')
    }
  }

  // 同步数据
  set (data) {
    Object.assign(this.data, data)
  }

  // 更新到数据库
  async update () {
    if (this.doc) {
      const res = await this.doc.update(this.data)
    }
    else {
      throw new Error('The should add this doc to database before updating!')
    }
  }

  // 删除数据
  async delete () {
    if (this.doc) {
      const res = await this.doc.remove()
    }
    else {
      throw new Error('The should add this doc to database before deleting!')
    }
  }
}

module.exports = Base