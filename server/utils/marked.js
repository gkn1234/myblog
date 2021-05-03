/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-03 08:56:49
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-03 08:59:22
 */
const marked = require('marked')
const highlight = require('highlight.js')

const renderer = new marked.Renderer()

marked.setOptions({
  renderer: renderer,
  // 代码高亮
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  // 加上hljs类名，确保有背景
  langPrefix: 'hljs language-',
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

module.exports = marked