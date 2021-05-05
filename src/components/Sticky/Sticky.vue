<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 17:22:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-05 11:58:26
-->
<template>
  <div class="sticky" ref="stickyEl" :style="stickyElStyle">
    <div class="sticky-content" :class="stickyClass" :style="stickyContentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="stylus" src="./Sticky.styl" scoped></style>
<script src="./Sticky.js"></script>