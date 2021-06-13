/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-04 15:08:59
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-04 11:19:02
 */
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import math from '@bytemd/plugin-math-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'

import { themes } from './themes/index'
import { highlights } from './highlights/index'

// 样式导入
import 'bytemd/dist/index.min.css'

export const mdPlugins = [
  breaks(),
  footnotes(),
  frontmatter(),
  gemoji(),
  gfm(),
  highlight(),
  math({
    katexOptions: {
      output: 'html'
    }
  }),
  mediumZoom(),
  mermaid()
]

// 生成主题样式
const DEFAULT_THEME = 'github'
const DEFAULT_HIGHLIGHT = 'default'
export async function mdHandleTheme (file) {
  // 解析主题样式
  let themeKey = file.frontmatter && file.frontmatter.theme ? file.frontmatter.theme : DEFAULT_THEME
  if (!themes[themeKey]) {
    themeKey = DEFAULT_THEME
  }
  let themeStyle = themes[themeKey]
  if (typeof themeStyle === 'function') {
    // 解压动态导入的样式
    const output = await themeStyle()
    themeStyle = output.style
    themes[themeKey] = themeStyle
  }

  // 解析高亮样式
  let highlightKey = file.frontmatter && file.frontmatter.highlight ? file.frontmatter.highlight : DEFAULT_HIGHLIGHT
  if (!highlights[highlightKey]) {
    highlightKey = DEFAULT_HIGHLIGHT
  }
  let highlightStyle = highlights[highlightKey]
  if (typeof highlightStyle === 'function') {
    // 解压动态导入的样式
    const output = await highlightStyle()
    highlightStyle = output.style
    highlights[highlightKey] = highlightStyle
  }

  let $style
  if (!import.meta.env.SSR) {
    $style = document.createElement('style')
    $style.innerHTML = themeStyle + highlightStyle
    document.head.appendChild($style)
  }

  return $style
}


