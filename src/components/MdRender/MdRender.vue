<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-03 09:07:04
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-05 11:12:50
-->
<template>
  <article class="md-render">
    <div class="markdown-body" ref="mdBody" v-html="mdFile" @click="clickHandler"></div>
  </article>
</template>

<style lang="stylus" src="./MdRender.styl"></style>
<script src="./MdRender.js"></script>