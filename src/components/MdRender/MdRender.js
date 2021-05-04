/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-03 09:07:24
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-04 16:05:12
 */

import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue"
import { getProcessor } from 'bytemd'
import { plugins, handleTheme } from './plugins'


export default defineComponent({
  name: 'MdRender',
  props: {
    md: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    let mdFile = getProcessor({
      plugins
    }).processSync(props.md)
    // md主体dom对象
    const mdBody = ref(null)

    // 样式注入
    let styleHtml = handleTheme(mdFile)

    onMounted(() => {
      // 为了与MdToc组件配合，需要为每一个标题加上id
      addTitleId(mdBody.value)
    })

    onBeforeUnmount(() => {
      // 去除注入的样式
      if (styleHtml) {
        styleHtml.remove()
      }
    })

    return {
      mdFile, mdBody
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