<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-20 11:53:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-20 18:07:38
-->
<template>
  <div class="notices">
    <transition-group name="notices-list" tag="div">
      <div class="notice-item" v-for="item in noticesList" :key="item.index">
        <svg v-if="item.icon"
          class="icon text-24 flex-s-0 margin-right-10" :class="[item.iconClass]" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
        <div class="notice-item-main">
          <div class="notice-item-title" v-if="item.title !== ''">{{ item.title }}</div>
          <div class="notice-item-content">{{ item.content }}</div>
        </div>
        <svg class="icon text-14 flex-s-0 margin-left-10 app-pointer" aria-hidden="true" @click="item.remove">
          <use xlink:href="#iconclose"></use>
        </svg>
      </div>
    </transition-group>
  </div>
</template>

<style lang="stylus" src="./Notice.styl" scoped></style>
<script src="./Notice.js"></script>