<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-15 11:50:27
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-15 16:35:22
-->
<template>
  <div class="input" :class="{ focus: isFocus }">
    <slot name="before"></slot>

    <input ref="inputObj"
      :value="value"
      :type="isPasswordShow ? 'text' : type" 
      @input="inputHandler"
      @focus="focusHandler"
      @blur="blurHandler" />

    <slot name="after"></slot>

    <!-- 清除按钮 -->
    <svg class="icon input-item" aria-hidden="true"
       v-if="clearable" :class="{ hidden: value === '' }"
       @click="clear">
      <use xlink:href="#iconclose-circle-fill"></use>
    </svg>
    
    <!-- 密码输入时显示 -->
    <svg class="icon input-item" aria-hidden="true"
      v-if="type === 'password'"
      @click="passwordShowHandler">
      <use :xlink:href="'#' + passwordIcon"></use>
    </svg>
  </div>
</template>

<style lang="stylus" src="./Input.styl" scoped></style>
<script src="./Input.js"></script>