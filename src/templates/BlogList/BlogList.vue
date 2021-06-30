<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-08 11:36:04
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-13 20:17:13
-->
<template>
  <section class="blog-list">
    <BlogCard v-for="item in list" :key="item._id"
      :blogData="item"
      @click="clickHandler(item)"></BlogCard>
  </section>
</template>

<style lang="stylus" src="./BlogList.styl" scoped></style>

<script setup>

import { onBeforeUnmount, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getProcessor } from 'bytemd'
import { style as mdTheme } from '@/plugins/md/themes/github'

import BlogCard from '../BlogCard/BlogCard.vue'

const router = useRouter()
const http = inject('$http')

let list = reactive([])

const data = await http('blogList', {})
list = list.concat(data)

// 点击进入文章详情
function clickHandler (item) {
  console.log(item, router)
  router.push({
    name: 'BlogDetail',
    params: {
      id: item._id
    }
  })
}

</script>.