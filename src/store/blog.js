/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-06-02 11:47:19
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-04 11:30:33
 */

// 初始化的博客信息
export function blogDefaultData () {
  return {
    title: '',
    desc: '',
    tags: [],
    categories: [],
    fileId: '',
    url: '',
    readNum: 0,
    createdTime: Date.now(),
    updatedTime: Date.now()
  }
}