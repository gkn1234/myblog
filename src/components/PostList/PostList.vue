<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 10:57:49
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-06 14:10:52
-->
<template>
  <section class="post-list">
    <Poster reversedBg></Poster>
    <PostCard v-for="(item, index) in postLists" :key="index"></PostCard>
  </section>
</template>

<style lang="stylus" src="./PostList.styl" scoped></style>
<script src="./PostList.js"></script>