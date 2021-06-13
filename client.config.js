/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-12 10:24:00
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-06 17:14:20
 */
// 前端配置文件

const config = {
  // 腾讯云相关，连接登录、数据库、存储
  tcbEnvId: 'myblog-0gvef4vz84623519',
  // tcbEnvId: 'hello-cloudbase-4gkq77kf4a3c8e31',
  tcbRegion: 'ap-guangzhou',

  // QQ头像CDN地址
  qqAvatarUrl: 'http://q1.qlogo.cn/g?b=qq&s=100&nk=',

  // 存储路径
  storage: {
    blogs: 'blogs/'
  },

  // 数据库集合名
  dbCollections: {
    blogs: 'blogs'
  },

  // 管理员标志
  isAdmin (user) {
    return user.data.email === 'guokainan1175@163.com'
  }
}

export default config