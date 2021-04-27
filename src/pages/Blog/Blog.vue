<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:26
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 18:28:50
-->
<template>
  <div style="padding-top: 100px;">Welcome!
    <div v-for="(item, index) in a" :key="index">{{ item }}</div>
  </div>
</template>

<script src="./Blog.js"></script>