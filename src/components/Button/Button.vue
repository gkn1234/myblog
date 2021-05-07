<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-07 08:56:30
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-07 09:22:37
-->
<template>
  <button class="btn" :class="buttonClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style lang="stylus" src="./Button.styl" scoped></style>
<script src="./Button.js"></script>