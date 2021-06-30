/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-12 10:19:27
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-13 19:14:25
 */
// 获取tcb配置
import config from '$/client.config'

// TCB实例
let tcbInstance = null

// 只有成功获取tcb模块，才执行回调，在组件setup中使用，可防止在SSR环境中意外执行
export function tcbReady (modals = [], callback = () => {}) {
  tcbReadyAsync(modals).then((res) => {
    if (res && typeof res === 'object') {
      callback(res)
    }
  })
}

// 初始化TCB的执行函数
export async function tcbReadyAsync(modals = []) {
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
    const { registerDatabase } = await import('@cloudbase/js-sdk/database')
    registerDatabase(tcbInstance.tcb)
    tcbInstance[modal] = tcbInstance.tcb.database()
  }
  else if (modal === 'auth') {
    const { registerAuth } = await import('@cloudbase/js-sdk/auth')
    registerAuth(tcbInstance.tcb)
    tcbInstance[modal] = tcbInstance.tcb.auth({
      persistence: 'local'
    })
  }
  else if (modal === 'storage') {
    const { registerStorage } = await import('@cloudbase/js-sdk/storage')
    registerStorage(tcbInstance.tcb)
  }
}