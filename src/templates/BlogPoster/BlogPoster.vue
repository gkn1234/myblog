<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 14:38:21
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-25 17:35:55
-->
<template>
  <Popup ref="popupWrapper">
    <div class="blog-poster">
      <div class="blog-poster-line">
        <label>文章标题</label>
        <Input class="blog-poster-content" v-model:value="form.title"></Input>
      </div>

      <div class="blog-poster-line">
        <label>选择文件</label>
        <div class="blog-poster-content">
          <FileInput @fileInput="fileInputHandler"></FileInput>
          <div class="margin-top-3">{{ fileName }}</div>
        </div>
      </div>

      <div class="blog-poster-line">
        <label>文章分类</label>
        <Select>
          <Option v-for="(item, index) in categories" :key="index"
            :value="item"></Option>
        </Select>
      </div>

      <div class="blog-poster-buttons">
        <Button type="primary" @click="submitHandler">确定</Button>
        <Button @click="cancelHandler">取消</Button>
      </div>
    </div>
  </Popup>
</template>

<style lang="stylus" src="./BlogPoster.styl" scoped></style>
<script src="./BlogPoster.js"></script>