<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-08 10:30:22
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-13 18:23:29
-->
<template>
  <div class="blog-card">
    <div class="blog-card-header">
      <h3 class="blog-card-header-title" @click="clickHandler">
        <a>文章标题</a>
      </h3>
      <div class="blog-card-header-extra">
        <span>栏目：测试</span>
        <span>栏目：测试</span>
        <span>栏目：测试</span>
      </div>
    </div>
    <div class="blog-card-content">
      <img class="blog-card-content-img" :src="bannerUrl1" />
      <div class="blog-card-content-desc markdown-body" v-html="blogData.desc"></div>
    </div>
    <div class="blog-card-footer">
      <span>栏目：测试</span>
      <span>栏目：测试</span>
      <span>栏目：测试</span>
    </div>
  </div>
</template>

<style lang="stylus" src="./BlogCard.styl" scoped></style>

<script setup>

import { defineEmit, defineProps } from 'vue'

import bannerUrl1 from '/img/banner.png'

const props = defineProps({
  /**
   * 留言对象数据，对象的键值如下：
   * @param {String} title 文章标题
   * @param {String} desc 摘要内容，已经转换成mdHTML
   */
  blogData: {
    type: Object,
    default: () => {}
  },
})

const emit = defineEmit([
  'click'
])

function clickHandler () {
  emit('click')
}


</script>