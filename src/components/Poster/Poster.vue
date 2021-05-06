<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 11:04:08
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-06 14:33:22
-->
<template>
  <div class="poster" :class="{ 'reversed-background': reversedBg } ">
    <div class="poster-user">
      <img class="app-round" width="48" height="48" src="/img/default.gif" />
      <div class="name">sasasa</div>
    </div>

    <div class="poster-content">
      <div class="poster-input" contenteditable outline="none"
        :placeholder="placeholder"></div>
      <div class="poster-tools">
        <button>发送</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" src="./Poster.styl" scoped></style>
<script src="./Poster.js"></script>