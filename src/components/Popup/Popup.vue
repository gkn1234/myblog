<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 14:26:44
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-14 20:12:56
-->
<template>
  <teleport to="body" v-if="showSignal">
    <div class="popup popup-animation" :class="[maskAnimationClass]" :style="animationDuration"
      @click.self="hide">
      <div class="popup-card popup-animation" :class="[animationClass, position]" :style="animationDuration">
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </div>
  </teleport>
</template>

<style lang="stylus" src="./Popup.styl" scoped></style>
<script src="./Popup.js"></script>