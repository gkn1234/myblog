<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 14:38:21
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-31 18:13:36
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
        <Select multiple v-model:values="form.tags" style="width: 300px">
          <SelectOption v-for="(item, index) in categories" :key="index"
            :value="item"></SelectOption>
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