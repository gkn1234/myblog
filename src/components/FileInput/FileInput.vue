<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-16 11:20:46
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-02 10:51:31
-->
<template>
  <div class="file-input" @click="selectFileHandler">
    <input ref="fileInput" type="file"
      :accept="accept" :multiple="multiple"
      @input="fileInputHandler" />
    <Button type="primary" v-if="isDefaultTemplate">
      <svg class="icon text-16" aria-hidden="true">
        <use xlink:href="#iconupload"></use>
      </svg>
      点击上传
    </Button>
    
    <slot></slot>      
  </div>
</template>

<style lang="stylus" src="./FileInput.styl" scoped></style>

<script setup>

import { defineProps, defineEmit, useContext, ref, computed, onMounted } from 'vue'
import Button from '../Button/Button.vue'

const props = defineProps({
  // 限制接受的文件类型
  accept: {
    default: '',
    type: String
  },
  // 是否能多选文件
  multiple: {
    default: false,
    type: Boolean
  },
  // 单选文件时的值，v-model
  file: {
    default: null,
    type: Object
  },
  // 多选文件时的值，v-model
  files: {
    default: () => [],
    type: [Object, Array]
  }
})

const emit = defineEmit([
  'update:file',
  'update:files'
])

const { slots } = useContext()

/** @section 组件模板逻辑处理  */
let isDefaultTemplate = ref(true)
onMounted(() => {
  // 插槽里有内容，则不显示默认的上传按钮
  isDefaultTemplate.value = slots.default && slots.default()[0] ? false : true
})


/** @section 文件输入处理 */
// 单选双向绑定
let fileModel = computed({
  get () { return props.file },
  set (val) {
    emit('update:file', val)
  }
})
// 多选双向绑定
let filesModel = computed({
  get () { return props.file },
  set (val) {
    emit('update:files', val)
  }
})

// 文件输入dom对象
let fileInput = ref(null)

// 点击上传触发
function selectFileHandler () {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// 获取文件触发
function fileInputHandler (e) {
  const files = e.target.files
  if (props.multiple) {
    filesModel.value = files
  }
  else {
    fileModel.value = files[0]
  }
}

</script>