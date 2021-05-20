<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-08 10:30:22
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-08 14:01:22
-->
<template>
  <div class="blog-card">
    <div class="blog-card-header">
      <h3 class="blog-card-header-title">
        <a>文章标题</a>
      </h3>
      <div class="blog-card-header-extra">
        <span>栏目：十神</span>
        <span>栏目：十神</span>
        <span>栏目：十神</span>
      </div>
    </div>
    <div class="blog-card-content">
      <img class="blog-card-content-img" :src="bannerUrl1" />
      <div class="blog-card-content-desc markdown-body" v-html="blogData.desc"></div>
    </div>
    <div class="blog-card-footer">
      
    </div>
  </div>
</template>

<style lang="stylus" src="./BlogCard.styl" scoped></style>
<script src="./BlogCard.js"></script>