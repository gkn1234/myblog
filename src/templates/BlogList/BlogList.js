/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-08 11:36:16
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-08 13:52:25
 */
import { defineComponent, onBeforeUnmount } from 'vue'

import { getProcessor } from 'bytemd'
import { style as mdTheme } from '@/plugins/md/themes/github'

import BlogCard from '../BlogCard/BlogCard.vue'

export default defineComponent({
  name: 'BlogList',
  components: {
    BlogCard
  },
  setup () {
    useDescMdRender()

    const mdHtml = mdToHtml('123454sasasqwqeqq`sasa`sadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadqhdqwhuidhqwuidhwqiudhquidhqwwuidhquihdqwuiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    const content = {
      desc: mdHtml
    }

    return {
      content
    }
  }
})

// 准备将摘要部分渲染成md，不导入mdRender，因为加上各种插件后太重，因此只用 bytemd 的基础功能解析摘要
function useDescMdRender () {
  // 将md的样式插入文档，只提供github样式
  let $style
  if (!import.meta.env.SSR) {
    $style = document.createElement('style')
    $style.innerHTML = mdTheme
    document.head.appendChild($style)
  }
  // 离开页面后剔除样式
  onBeforeUnmount(() => {
    if ($style) {
      $style.remove()
    }
  })
}

// 将摘要的md文本转换成HTML
function mdToHtml (md) {
  return getProcessor({}).processSync(md)
}