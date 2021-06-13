/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-21 16:16:44
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-04 11:46:12
 */
import { reactive } from 'vue'
import config from '$/client.config'
import { notice } from '@/components/index'
import { clientRequest, tcbReadyAsync } from '@/plugins/index'
import { isQQ } from '@/utils/index'

// 本地保存的用户id的键值索引，用于获取自动登录的数据
const LOCAL_UID_KEY = 'localUserId'

// 初始化的用户信息
export function userDefaultData () {
  return {
    uid: '',
    nickName: '',
    email: '',
    avatarUrl: ''
  }
}

class User {
  // 客户端用户信息
  data = reactive({
    ...userDefaultData()
  })
  // auth对象，可以获取TCB用户数据
  _auth = null

  constructor () {}

  async _initTcb () {
    if (!this._auth) {
      const tcbInstance = await tcbReadyAsync(['auth'])
      this._auth = tcbInstance ? tcbInstance.auth : null
    }
  }

  // 是否为管理员
  isAdmin () {
    return config.isAdmin(this)
  }

  // 是否登录
  isLogin () {
    return this._auth && this._auth.hasLoginState()
  }

  // 是否为正式用户
  isFormal () {
    return this.isLogin() && true
  }

  // 自动登录
  async autoLogin () {
    // 初始化TCB
    await this._initTcb()
    if (!this._auth) { return }

    // 已经登录，无需重复登录，同步信息即可
    if (this.isLogin()) {
      this._onLoginSuccess()
      return
    }

    // 获取本地记录的uid
    let uid = localStorage.getItem(LOCAL_UID_KEY)
    if (!uid) {
      // 未获取到，结束自动登录
      return
    }

    // 先用uid换取ticket
    const res = await clientRequest('customLogin', { uid })
    // ticket自定义登录
    await this._auth.customAuthProvider().signIn(res.content)
    this._onLoginSuccess()
  }

  /**
   * 首次登录，发留言时触发
   * @param {String} nickName 昵称，会覆盖qq号拉取的名称
   * @param {String} qq 用于拉取名称和头像
   */
  async firstLogin (nickName = '', qq = '') {
    // 初始化TCB
    await this._initTcb()
    if (!this._auth) { return }

    // 已经登录，无需重复登录，同步信息即可
    if (this.isLogin()) {
      this._onLoginSuccess()
      return
    }

    // 先用匿名登录换取uid
    await this._auth.anonymousAuthProvider().signIn()
    const uid = this._auth.currentUser.uid
    // 用uid换取ticket
    const res = await clientRequest('customLogin', { uid })

    // 再关联自定义登录
    await this._auth.currentUser.linkWithTicket(res.content)

    // 根据qq号获取头像，修改用户信息
    nickName = typeof nickName !== '' && nickName !== '' ? nickName : `游客${uid}`
    const avatarUrl = isQQ ? config.qqAvatarUrl + qq : ''
    await this._auth.currentUser.update({
      nickName, avatarUrl
    })
    
    // 刷新信息，登录成功
    await this._auth.currentUser.refresh()
    this._onLoginSuccess()
  }

  /**
   * 关联邮箱登录
   * @param {String} email 邮箱
   * @param {String} password 邮箱密码
   */
  async linkWithEmailLogin (email = '', password = '') {

  }

  // 登出
  async logout () {
    if (!this.isLogin()) {
      notice({
        type: 'error',
        title: '登出失败',
        content: `当前不存在已登录的账号！`
      })
      return
    }
    
    await this._auth.signOut()
    // 将用户数据重置为初始数据
    for (let key in this.data) {
      this.data[key] = defaultUserData[key]
    }
  }

  // 登录成功时的操作
  _onLoginSuccess () {
    // 同步TCB用户信息
    this._syncFromAuth()
    // uid写入本地记录
    localStorage.setItem(LOCAL_UID_KEY, this.data.uid)
  }

  // 从TCB用户数据中同步用户信息
  _syncFromAuth () {
    if (!this._auth) { return }

    for (let key in this.data) {
      if (this._auth.currentUser.hasOwnProperty(key)) {
        this.data[key] = this._auth.currentUser[key]
      }
    }
  }
}

export function userStore () {
  let user = new User()

  return {
    install (app) {
      app.provide('user', user)
      
      user.autoLogin().then(() => {
        if (user.isLogin()) {
          console.log(user)
          notice({
            type: 'success',
            title: '登录成功',
            content: `欢迎，${user.data.nickName}`
          })
        }
      })
      .catch((e) => {
        console.error(e)
        notice({
          type: 'error',
          title: '登录失败',
          content: `自动登录出现错误！`
        })
      })
    }
  }
} 