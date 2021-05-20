/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-12 10:19:27
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-18 18:25:07
 */
// 获取tcb配置
import config from '$/client.config'

// TCB实例
let tcbInstance = null

// 导出给组件使用的方法
export function tcbReady (modals = [], callback = () => {}) {
  _tcbReady(modals).then((res) => {
    if (res && typeof res === 'object') {
      callback(res)
    }
  })
}

// 初始化TCB的执行函数
async function _tcbReady(modals = []) {
  // SSR环境下不会触发，返回null，主函数检测到null，会阻止回调执行，从而在服务端不执行此函数
  if (import.meta.env.SSR) { return null }

  if (!tcbInstance) {
    let cloudbase = await import('@cloudbase/js-sdk/app')
    cloudbase = typeof cloudbase.init === 'function' ? cloudbase : cloudbase.default
    const tcb = cloudbase.init({
      env: config.tcbEnvId,
      region: config.tcbRegion
    })
    tcbInstance = {
      tcb
    }
  }

  const result = await getModals(modals)

  return result
}

async function getModals (modals = []) {
  let result = { tcb: tcbInstance.tcb }
  for (let i = 0; i < modals.length; i++) {
    const modal = modals[i]
    if (!tcbInstance[modal]) {
      await createModal(modal)
    }
    if (tcbInstance[modal]) {
      result[modal] = tcbInstance[modal]
    }
  }
  return result
}

// 载入tcb的模块
async function createModal (modal) {
  if (modal === 'db') {
    await import('@cloudbase/js-sdk/database')
    tcbInstance[modal] = tcbInstance.tcb.database()
  }
  else if (modal === 'auth') {
    await import('@cloudbase/js-sdk/auth')
    tcbInstance[modal] = tcbInstance.tcb.auth({
      persistence: 'local'
    })
  }
  else if (modal === 'storage') {
    await import('@cloudbase/js-sdk/storage')
  }
}