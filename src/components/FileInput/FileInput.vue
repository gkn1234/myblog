<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-16 11:20:46
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-18 15:05:18
-->
<template>
  <div class="file-input" @click="selectFileHandler">
    <input ref="fileInput" type="file"
      :accept="accept" :multiple="multiple"
      @input="fileInputHandler" />
    <Button type="primary" v-if="isDefaultTemplate">
      <svg class="icon text-16" aria-hidden="true">
        <use xlink:href="#iconupload"></use>
      </svg>
      点击上传
    </Button>
    
    <slot></slot>      
  </div>
</template>

<style lang="stylus" src="./FileInput.styl" scoped></style>
<script src="./FileInput.js"></script>