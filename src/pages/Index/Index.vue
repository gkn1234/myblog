<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:37:03
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-28 17:07:58
-->
<template>
  <!-- 博客首页 -->
  <main class="index-main">

    <!-- banner区域 -->
    <IndexSection height="640px" :backgroundImg="bannerUrl1">
      <div class="index-banner app-full">
        <div class="index-banner-title">
          <img src="/img/title-1.png" />
          <img src="/img/title-2.png" />
        </div>
        <div class="index-banner-btn-list flex flex-wrap flex-j-center">
          <button>Github</button>
          <button>进入博客</button>
        </div>
      </div>
    </IndexSection>

    <!-- 博客使用的开发工具 -->
    <IndexSection>
      <div class="index-content index-build-tools"></div>
    </IndexSection>

    <!-- 自我介绍与博客的运行时间 -->
    <IndexSection :backgroundImg="bannerUrl2">
      <div class="index-content app-full index-self-intro"></div>
    </IndexSection>

    <!-- 底部备案 -->
  </main>
</template>

<style lang="stylus" src="./Index.styl" scoped></style>
<script src="./Index.js"></script>
