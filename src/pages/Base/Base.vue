<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:35:47
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-06 15:20:34
-->
<template>
  <BlogHead :links="links" :activeIndex="activeIndex" 
    :logoSrc="logoUrl" :logoTransparentSrc="logoTransparentUrl"
    :isTransparent="isTransparent"></BlogHead>
  <router-view
    @header-normal="headerNormal"
    @header-transparent="headerTransparent"></router-view>
</template>

<style lang="stylus">
</style>

<script src="./Base.js"></script>