<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 15:34:33
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-25 10:42:22
-->
<template>
  <header class="blog-header" :class="{ transparent: isTransparent }"
    v-media="{ key: 'max-width', val: '720px', handler: m }">
    <div class="app-viewport flex flex-j-between flex-a-center">
      <!-- <div>Logo通过<a href="https://www.designevo.com/cn/" title="免费在线logo制作软件">DesignEvo</a>设计制作</div> -->
      <!-- 左侧LOGO -->
      <router-link class="blog-header-logo" to="/">
        <img v-if="isLogoImgShow" :src="logoImgSrc" />
      </router-link>

      <!-- 中间全站搜索 -->
      

      <!-- 右侧导航 -->
      <ul class="blog-header-nav-group flex flex-j-end margin-0">
        <li class="blog-header-nav"
          v-for="(item, index) in links" :key="index"
          :class="{ active: index === activeIndex }">
          <router-link :to="item.to">{{ item.text }}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="stylus" src="./BlogHead.styl" scoped></style>
<script src="./BlogHead.js"></script>
