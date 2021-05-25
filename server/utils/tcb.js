/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-11 10:03:16
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-21 11:41:45
 */
const tcb = require('@cloudbase/node-sdk')
const credentials = require('../../customLoginKey.json')

let tcbInstance = null

function getTcb () {
  if (!tcbInstance) {
    const tcbApp = tcb.init({
      secretId: CONFIG.secretId,
      secretKey: CONFIG.secretKey,
      env: CONFIG.tcbEnvId,
      region: CONFIG.tcbRegion,
      credentials: credentials
    })

    tcbInstance = { tcb: tcbApp }
  }
  return tcbInstance.tcb
}

function getDb () {
  getTcb()
  if (!tcbInstance.db) {
    tcbInstance.db = tcbInstance.tcb.database()
  }
  return tcbInstance.db
}

function getAuth () {
  getTcb()
  if (!tcbInstance.auth) {
    tcbInstance.auth = tcbInstance.tcb.auth()
  }
  return tcbInstance.auth
}

module.exports = {
  getTcb,
  getDb,
  getAuth
}