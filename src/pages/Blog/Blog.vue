<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:26
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-25 14:51:21
-->
<template>
  <main class="blog app-viewport">
    <BlogPoster v-model:isShow="isPosterShow"></BlogPoster>
    <BlogList class="flex-g-1"></BlogList>
    <aside class="blog-aside">
      <Sticky v-if="trigger" top="60">
        <div style="background-color:red;" :style="s">HL</div>
        <Button v-if="isBlogPosterEnabled"
          class="margin-top-10" style="width: 100%"
          type="primary" @click="postBlogHandler">发表文章</Button>
      </Sticky>
    </aside>
    <button style="position: fixed;bottom: 200px;width: 100px;height: 100px; z-index:10;" @click="h">aaaaaa</button>
  </main>
</template>

<style lang="stylus" src="./Blog.styl" scoped></style>
<script src="./Blog.js"></script>