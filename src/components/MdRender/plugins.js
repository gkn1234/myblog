/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-04 15:08:59
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-04 15:32:46
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

import themes from 'juejin-markdown-themes'

export const plugins = [
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

export function handleTheme (file) {
  const themeKey = file.frontmatter && file.frontmatter.theme ? file.frontmatter.theme : 'github'
  const styleHtml = themes[themeKey] && themes[themeKey].style ? themes[themeKey].style : themes.github.style

  let $style
  console.log(import.meta.env.SSR)
  if (!import.meta.env.SSR) {
    $style = document.createElement('style')
    $style.innerHTML = styleHtml
    document.head.appendChild($style)
  }

  return $style
}


