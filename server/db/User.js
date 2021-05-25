/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-21 11:22:57
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-22 18:43:59
 */
const Base = require('./Base')

const USER_GENDER = {
  unknown: 0,
  male: 1,
  female: 2
}

// 用户数据库schema
class User extends Base {
  collectionName = User.COLLECTIONS.user

  data = {
    // 用户名
    username: '',
    // 密码，加密存储
    password: '',
    // 昵称
    nickname: '',
    // 头像
    avatar: {
      // 云存储id
      id: '',
      // 临时URL
      url: ''
    },
    // 性别，0 未知 1 男性 2 女性
    gender: USER_GENDER.unknown,
    // 手机信息
    phone: {
      // 号码
      num: '',
      // 是否验证
      isVerified: false
    },
    // 邮箱信息
    email: {
      // 地址
      addr: '',
      // 是否验证
      isVerified: false
    },
    // QQ信息
    qq: {
      // 号码
      num: '',
      // QQ昵称
      name: ''
    },
    // 各个平台的登录信息
    platformsData: {
      wxUnionId: '',
      aliOpenId: ''
    },
    // 实名认证信息，有待扩展
    identityAuth: {

    },
    // 登录与注册信息
    logData: {
      // 注册时间
      createdTime: '',
      // 注册IP
      createdIp: '',
      // 上一次登录时间
      lastLogTime: '',
      // 上一次登录IP
      lastLogIp: ''
    }
  }

  constructor (data = {}) {
    super(data)
  }

  /**
   * 博客注册逻辑
   * @param {String} nickname 昵称
   * @param {String} qq QQ号
   */
  async signIn (nickname, qq) {
    this.nickname = ''
    // 从接口拉取头像并上传到存储
  }

}

module.exports = {
  User,
  USER_GENDER
}