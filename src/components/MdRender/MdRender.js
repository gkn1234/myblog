/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-03 09:07:24
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-05 11:12:42
 */

import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue"
import { getProcessor } from 'bytemd'
import { mdPlugins, mdHandleTheme } from '@/plugins/index'

export default defineComponent({
  name: 'MdRender',
  props: {
    md: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // md文档生成的HTML
    let mdFile = getProcessor({
      plugins: mdPlugins
    }).processSync(props.md)
    // md主体dom对象
    const mdBody = ref(null)

    // md文档样式注入
    let styleDom
    mdHandleTheme(mdFile).then((res) => {
      styleDom = res
    })
    .catch((e) => {
      console.error(e)
    })

    onMounted(() => {
      // 为了与MdToc组件配合，需要为每一个标题加上id
      addTitleId(mdBody.value)
    })

    onBeforeUnmount(() => {
      // 去除注入的样式
      if (styleDom) {
        styleDom.remove()
      }
    })

    // md主体点击事件
    function clickHandler (e) {
      const $ = e.target
      if ($.tagName !== 'A') {
        return
      }

      const href = $.getAttribute('href')
      if (!href || !href.startsWith('#')) {
        return
      }

      const dest = mdBody.querySelector('#user-content-' + href.slice(1))
      if (dest) {
        dest.scrollIntoView()
      }
    }

    return {
      mdFile, mdBody,
      clickHandler
    }
  }
})

function addTitleId (mdBody) {
  const tags = ['h', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  tags.forEach((tag) => {
    const hList = mdBody.getElementsByTagName(tag)
    for (let i = 0; i < hList.length; i++) {
      hList[i].setAttribute('id', hList[i].textContent)
    }
  })
}