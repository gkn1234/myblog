<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 15:34:33
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-21 19:02:34
-->
<template>
  <header class="blog-header">
    <div class="app-viewport flex flex-j-between flex-a-center">
      <router-link class="blog-header-logo" to="/">蘑菇王的博客</router-link>
      <ul class="blog-header-links-group flex flex-j-end margin-0">
        <li class="blog-header-link" v-for="(item, index) in links" :key="index">
          <router-link :to="item.to">{{ item.text }}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="stylus" src="./BlogHead.styl" scoped></style>
<script src="./BlogHead.js"></script>
