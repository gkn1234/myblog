<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-03 09:08:10
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-03 10:17:32
-->
<template>
  <aside class="md-toc">
    <Sticky :top="top">
      <div class="md-toc-wrapper" :style="tocWrapperStyle">
        <div class="title">- 目录 -</div>
        <ul class="toc">
          <li class="md-toc-link" v-for="(item, index) in toc" :key="index"
            :style="{'padding-left': `${(item.lvl - 1) * 10}px`}">
            <a :href="'#' + item.content" @click="selectHandler(item)"
              :class="{ 'selected': selectedToc === item.content }"
              :style="{ 'font-size': `${15 - item.lvl}px` }">{{ item.content }}</a>
          </li>
        </ul>
      </div>
    </Sticky>
  </aside>
</template>

<style lang="stylus" src="./MdToc.styl" scoped></style>
<script src="./MdToc.js"></script>