<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:37:03
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-13 18:02:25
-->
<template>
  <!-- 博客首页 -->
  <main class="index-main">

    <!-- banner区域 -->
    <Banner height="640px" :backgroundImg="bannerUrl1">
      <div class="index-banner app-full">
        <div class="index-banner-title">
          <img src="/img/title-1.png" />
          <img src="/img/title-2.png" />
        </div>
        <div class="index-banner-btn-list flex flex-wrap flex-j-center flex-a-center">
          <Button type="default" shape="radius" outlined>
            <svg class="icon text-16" aria-hidden="true">
              <use xlink:href="#icongithub-fill"></use>
            </svg>
            Github
          </Button>
          <Button>进入博客</Button>
        </div>
      </div>
    </Banner>

    <!-- 博客使用的开发工具 -->
    <Banner>
      <div class="index-content index-build-tools"></div>
    </Banner>

    <!-- 自我介绍与博客的运行时间 -->
    <Banner :backgroundImg="bannerUrl2">
      <div class="index-content app-full index-self-intro"></div>
    </Banner>

    <!-- 底部备案 -->
  </main>
</template>

<script setup>

import { defineEmit, ref, onMounted, inject } from 'vue'
import { transparentHeaderPage } from '@/mixins/index'
import { tcbReady } from '@/plugins/tcb'

import { Banner, Button } from '@/components/index'

import bannerUrl1 from '/img/banner.png'
import bannerUrl2 from '/img/banner3.png'

const emit = defineEmit([
  'header-normal', 'header-transparent'
])

// 使标题栏能够响应透明化
transparentHeaderPage(emit)

</script>

<style lang="stylus" scoped>
@import './Index.styl'
</style>
