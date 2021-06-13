<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-06-02 16:16:54
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-02 16:22:16
-->
<template>
  <svg class="icon loading" aria-hidden="true">
    <use xlink:href="#iconloading"></use>
  </svg>
</template>

<style lang="stylus" scoped>

.loading
  animation: loading 1s linear infinite

@keyframes loading
  0%
    transform: rotate(0deg)
  50%
    transform: rotate(180deg)
  100%
    transform: rotate(360deg)

</style>