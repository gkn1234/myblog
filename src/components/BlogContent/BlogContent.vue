<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 19:46:44
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-03 09:32:39
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
      <MdToc top="60" :toc="toc"></MdToc>
      <MdRender :md="md"></MdRender>
    </section>
  </main>
</template>

<style lang="stylus" src="./BlogContent.styl" scoped></style>
<script src="./BlogContent.js"></script>