<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:26
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-13 18:33:17
-->
<template>
  <main class="blog app-viewport">
    <BlogPoster v-model:isShow="isPosterShow"></BlogPoster>
    <suspense>
      <BlogList class="flex-g-1"></BlogList>
    </suspense>
    <aside class="blog-aside">
      <Sticky v-if="trigger" top="60">
        <div style="background-color:red;" :style="s">HL</div>
        <Button v-if="isBlogPosterEnabled"
          class="margin-top-10" style="width: 100%"
          type="primary" @click="postBlogHandler">发表文章</Button>
      </Sticky>
    </aside>
  </main>
</template>

<style lang="stylus" src="./Blog.styl" scoped></style>
<script src="./Blog.js"></script>