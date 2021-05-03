<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-03 10:45:45
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-03 14:01:41
-->
<template>
  <div ref="md" style="padding-top: 60px;"></div>
</template>

<script>
import { Editor, Viewer } from 'bytemd'
import breaks from '@bytemd/plugin-breaks';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight-ssr';
import math from '@bytemd/plugin-math-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import mermaid from '@bytemd/plugin-mermaid';
import locale from 'bytemd/lib/locales/zh_Hans.json'
import themes from 'juejin-markdown-themes'
import { onMounted, ref } from 'vue';
console.log(themes)

const plugins = [
  breaks(),
  footnotes(),
  frontmatter(),
  gemoji(),
  gfm(),
  highlight(),
  math(),
  mediumZoom(),
  mermaid(),
  // Add more plugins here
  {
    viewerEffect({ file }) {
      const $style = document.createElement('style')

      const theme = file.frontmatter ? themes[file.frontmatter.theme] : themes.juejin
      if (theme && theme.style) {
        $style.innerHTML = theme.style
      }
      else {
        $style.innerHTML = themes.juejin.style
      }
      document.head.appendChild($style)
      return () => {
        $style.remove()
      }
    }
  }
];

export default {
  setup () {
    const md = ref(null)

    onMounted(() => {
      const editor = new Editor({
        target: md.value,
        props: {
          value: '',
          locale: locale,
          plugins,
        },
      })

      editor.$on('change', (e) => {
        editor.$set({ value: e.detail.value });
      })
    })

    return {
      md
    }
  }
}
</script>