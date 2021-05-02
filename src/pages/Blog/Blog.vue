<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:26
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-02 16:28:07
-->
<template>
  <main class="blog app-viewport">
    <div class="blog-list flex-g-1"></div>
    <aside class="blog-aside">
      <Sticky v-if="trigger" top="60">
        <div style="background-color:red;" :style="s">HL</div>
      </Sticky>
    </aside>
    <button style="position: fixed;bottom: 0;width: 100px;height: 100px;" @click="h">aaaaaa</button>
  </main>
</template>

<style lang="stylus" src="./Blog.styl" scoped></style>
<script src="./Blog.js"></script>