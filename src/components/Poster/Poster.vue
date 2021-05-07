<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 11:04:08
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-07 17:00:00
-->
<template>
  <div class="poster" :class="{ 'reversed-background': reversedBg } ">
    <div class="poster-user">
      <img class="app-round" width="48" height="48" src="/img/default.gif" />
      <div class="name">sasasa</div>
    </div>

    <div class="poster-content">
      <div class="poster-input" ref="postEditor"
        contenteditable outline="none"
        :placeholder="placeholder"
        @focus="editorFocusHandler"
        @blur="editorBlurHandler"></div>
      <div class="poster-tools">
        <Button type="primary" size="small">发送</Button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" src="./Poster.styl" scoped></style>
<script src="./Poster.js"></script>