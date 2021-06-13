/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-07 11:40:54
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-04 10:52:14
 */

// 字符串相关方法

/**
 * 生成随机id
 * @param {Number | null} len Number时指定长度，null代表使用rfc4122标准编码固定的32位uid
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 * @param {Boolean} firstU 将返回的首字母置为"u"
 */
export function uid (len = 16, radix = null, firstU = false) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
	let uuid = []
	radix = radix || chars.length

	if (len) {
		// 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
		for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix]
    }
	} 
  else {
		let r
		// rfc4122标准要求返回的uuid中,某些位为固定的字符
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
		uuid[14] = '4'

		for (let i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
			}
		}
	}
  
	// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
	if (firstU) {
		uuid.shift();
		return 'u' + uuid.join('')
	}

	return uuid.join('')
}

export function isQQ (val) {
  const pattern = /[1-9]([0-9]{5,11})/
  return pattern.test(val)
}