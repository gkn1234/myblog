<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:35:47
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 18:28:11
-->
<template>
  <BlogHead :links="links" :activeIndex="activeIndex"
    :logoSrc="logoUrl" :logoTransparentSrc="logoTransparentUrl"></BlogHead>
  <suspense>
    <router-view @haha="handler"></router-view>
  </suspense>
  
</template>

<style lang="stylus">
</style>

<script src="./Base.js"></script>