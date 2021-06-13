/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-06-04 10:52:45
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-04 10:59:01
 */
/**
 * 获取文件后缀名
 * @param {String | File} file 
 * @returns 
 */
export function getFileTail (file) {
  let fileName = typeof file === 'string' ? file : file.name
  const fileSections = fileName.split('.')
  const tail = fileSections[fileSections.length - 1]
  return tail
}

/**
 * 获取文件字符串内容
 * @param {File} file 
 */
export function getFileText (file, encoding = 'utf-8') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      if (e.target.readyState == FileReader.DONE) {
        resolve(e.target.result)
      }
    }
    reader.readAsText(file, encoding)
  })
}