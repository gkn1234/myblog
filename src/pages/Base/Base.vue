<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:35:47
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-28 17:07:17
-->
<template>
  <BlogHead :links="links" :activeIndex="activeIndex" 
    :logoSrc="logoUrl" :logoTransparentSrc="logoTransparentUrl"></BlogHead>
  <router-view @haha="handler"></router-view>
  
</template>

<style lang="stylus">
</style>

<script src="./Base.js"></script>