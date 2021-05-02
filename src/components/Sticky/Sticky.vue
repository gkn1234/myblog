<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 17:22:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-02 16:17:20
-->
<template>
  <div class="sticky" ref="stickyEl" :style="stickyElStyle">
    <div class="sticky-content" :style="stickyContentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="stylus" src="./Sticky.styl" scoped></style>
<script src="./Sticky.js"></script>