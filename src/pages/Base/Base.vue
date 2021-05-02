<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:35:47
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-02 11:42:45
-->
<template>
  <BlogHead :links="links" :activeIndex="activeIndex" 
    :logoSrc="logoUrl" :logoTransparentSrc="logoTransparentUrl"></BlogHead>
  <router-view></router-view>
  
</template>

<style lang="stylus">
</style>

<script src="./Base.js"></script>