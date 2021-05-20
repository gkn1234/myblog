<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 13:52:55
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-08 10:08:09
-->
<template>
  <div class="post-card" :class="{ 'reversed-background': reversedBg }">
    <img class="app-round flex-s-0" width="48" height="48" src="/img/default.gif" />
    <div class="post-card-wrapper">

      <div class="post-card-header">
        <div class="flex flex-a-center">
          <span class="user-name">{{ postData.poster }}</span>
          <span class="date tips">2天前</span>
        </div>
        <div class="flex flex-a-center">
          <a class="reply-link" @click="clickReplyHandler">回复</a>
          <span class="floor-id tips">{{ floorStr }}</span>
        </div>
      </div>

      <div class="post-card-content">aaaaa</div>

      <Poster class="margin-top-10" v-if="isReplyShow"
        ref="replyPoster"
        :reversedBg="!reversedBg" 
        :placeholder="'回复' + postData.poster"
        @blur="replyBlurHandler"></Poster>

      <div class="post-card-replies margin-top-10">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<style lang="stylus" src="./PostCard.styl" scoped></style>
<script src="./PostCard.js"></script>