/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-12 10:19:27
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-12 13:25:10
 */
// 获取tcb配置
import { onMounted } from 'vue'
import config from '$/client.config'

// TCB实例
let tcbInstance = null

/**
 * TCB方法只能在onMounted周期中使用，也就是不能在SSR环境下执行。
 * 但是这很合理，因为TCB都是用户信息，而用户数据不被SEO收录才是正常的，因此不会参与服务端预渲染。
 */
function asyncMounted () {
  return new Promise((resolve, reject) => {
    onMounted(() => {
      resolve()
    })
  })
}

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

  await asyncMounted()

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
  let result = {}
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
}