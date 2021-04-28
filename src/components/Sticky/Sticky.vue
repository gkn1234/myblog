<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 17:22:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-28 18:38:53
-->
<template>
  <div class="sticky" ref="stickyEl" :style="stickyElStyle">
    <slot></slot>
  </div>
</template>

<style lang="stylus" src="./Sticky.styl" scoped></style>
<script src="./Sticky.js"></script>