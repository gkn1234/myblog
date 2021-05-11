/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-11 10:03:16
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-11 14:31:23
 */
const tcb = require('@cloudbase/node-sdk')

let tcbApp = null

function getTcb () {
  if (!tcbApp) {
    tcbApp = tcb.init({
      secretId: CONFIG.secretId,
      secretKey: CONFIG.secretKey,
      env: CONFIG.tcbEnvId,
      region: CONFIG.tcbRegion
    })
  }
  return tcbApp
}

function getDb () {
  const app = getTcb()
  return app.database()
}

module.exports = {
  getTcb,
  getDb
}