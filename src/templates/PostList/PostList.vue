<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 10:57:49
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-07 18:24:19
-->
<template>
  <section class="post-list">
    <Poster class="post-list-poster" reversedBg></Poster>
    <PostCard v-for="(item, index) in postLists" :key="index"
      :postData="item" :isReplyShow="curReplyPostId === item.id"
      @reply="replyHandler">
      <PostCard v-for="(replyItem, replyIndex) in item.replies" :key="replyIndex"
        :postData="replyItem" :isReplyShow="curReplyPostId === replyItem.id" reversedBg
        @reply="replyHandler">
      </PostCard>
    </PostCard>
  </section>
</template>

<style lang="stylus" src="./PostList.styl" scoped></style>
<script src="./PostList.js"></script>