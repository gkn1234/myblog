<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 19:46:44
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-30 11:48:48
-->
<template>
  <main class="blog-content">
    <IndexSection class="blog-content-title-img" height="300px" :backgroundImg="bannerUrl1">
      <div class="blog-content-title-wrapper app-full">
        <h1 class="blog-content-title">标题</h1>
        <div class="blog-content-info">
          <span>发表：2021-04-29</span>
          <span>更新：2021-04-29</span>
        </div>
        <div class="blog-content-tags">
          <span>#Vue</span>
          <span>#Vue</span>
          <span>#Vue</span>
          <span>#Vue</span>
        </div>
      </div>
    </IndexSection>

    <section class="blog-content-main-wrapper app-viewport">
      <aside class="blog-content-topic-wrapper">
        <Sticky top="60">
          <div class="blog-content-topic">
            <div>1111</div>
            <div>1111</div>
            <div>1111</div><div>1111</div><div>1111</div>
          </div>
        </Sticky>
      </aside>
      
      <article class="blog-content-main flex-g-1" v-html="md"></article>
    </section>
  </main>
</template>

<style lang="stylus" src="./BlogContent.styl" scoped></style>
<script src="./BlogContent.js"></script>