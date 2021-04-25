<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:35:47
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-24 18:39:06
-->
<template>
  <BlogHead :links="links" :activeIndex="activeIndex"
    logoSrc="/img/logo.png" logoTransparentSrc="/img/logo-transparent.png"></BlogHead>
  <router-view @haha="handler"></router-view>
</template>

<style lang="stylus">
</style>

<script src="./Base.js"></script>