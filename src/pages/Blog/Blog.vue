<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:26
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-20 18:03:57
-->
<template>
  <main class="blog app-viewport">
    <BlogPoster v-model:isShow="isPosterShow"></BlogPoster>
    <BlogList class="flex-g-1"></BlogList>
    <aside class="blog-aside">
      <Sticky v-if="trigger" top="60">
        <div style="background-color:red;" :style="s">HL</div>
        <button @click="postBlogHandler">sabsuiahsui</button>
      </Sticky>
    </aside>
    <button style="position: fixed;bottom: 200px;width: 100px;height: 100px; z-index:10;" @click="postBlogHandler">aaaaaa</button>
  </main>
</template>

<style lang="stylus" src="./Blog.styl" scoped></style>
<script src="./Blog.js"></script>