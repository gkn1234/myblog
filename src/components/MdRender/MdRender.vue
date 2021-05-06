<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-03 09:07:04
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-05 14:44:42
-->
<template>
  <article class="markdown-body" ref="mdBody" v-html="mdFile" @click="clickHandler"></article>
</template>

<style lang="stylus" src="./MdRender.styl"></style>
<script src="./MdRender.js"></script>