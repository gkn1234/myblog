/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-30 11:19:22
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-30 11:36:29
 */
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

// marked是否已经完成配置
let isMarkedSet = false

export function createMarked () {
  if (!isMarkedSet) {
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

    isMarkedSet = true
  }

  return {
    install (app) {
      app.provide('$md', marked)
    }
  }
}