<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 14:38:21
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-13 18:37:09
-->
<template>
  <Popup :isShow="isShow" :maskClosable="isLoading">
    <div class="blog-poster">
      <div class="blog-poster-line">
        <label>文章标题</label>
        <Input class="blog-poster-content" v-model:value="form.title"></Input>
      </div>

      <div class="blog-poster-line">
        <label>选择文件</label>
        <div class="blog-poster-content">
          <FileInput v-model:file="form.file"></FileInput>
          <div class="margin-top-3">{{ fileName }}</div>
        </div>
      </div>

      <div class="blog-poster-line">
        <label>文章分类</label>
        <Select multiple v-model:values="form.categories" style="width: 300px">
          <SelectOption v-for="(item, index) in categories" :key="index"
            :value="item"></SelectOption>
        </Select>
      </div>

      <div class="blog-poster-line">
        <label>文章标签</label>
        <Select multiple filter tags v-model:values="form.tags" style="width: 300px"></Select>
      </div>

      <div class="blog-poster-buttons">
        <Button type="primary" @click="submitHandler" :loading="isLoading">确定</Button>
        <Button @click="cancelHandler" :loading="isLoading">取消</Button>
      </div>
    </div>
  </Popup>
</template>

<style lang="stylus" src="./BlogPoster.styl" scoped></style>

<script setup>

import { defineProps, defineEmit, ref, reactive, computed } from 'vue'
import { 
  Button, 
  Input, 
  FileInput,
  Select, SelectOption,
  Popup, 
  notice
} from '@/components/index'
import { tcbReady } from '@/plugins/tcb'
import { uid, getFileTail, getFileText } from '@/utils'
import { useVModel } from '@/mixins'
import { blogDefaultData } from '@/store'
import config from '$/client.config'

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  // 文章分类列表
  categories: {
    type: Array,
    default: () => ['1', '2', {c: 1}, '3', '4', '5', '6', '7', '8', '9', '10']
  }
})

const emit = defineEmit([
  'update:isShow'
])

/** @section 表单定义  */
let form = reactive({
  title: '',
  file: null,
  tags: [],
  categories: []
})
// 文件名称
let fileName = computed(() => {
  return form.file ? form.file.name : '未指定文件'
})

/** @section 页面触发定义 */
// 控制悬浮窗显隐
const showModel = useVModel(props, emit, 'isShow')

// 取消按钮触发
function cancelHandler () {
  showModel.value = false
}

// 确定按钮触发
let isLoading = ref(false)
function submitHandler () {
  const isValid = validate(form)
  if (!isValid) { return }

  isLoading.value = true
  tcbReady(['storage', 'db'], (modals) => {
    submit(form, modals).then((res) => {
      console.log(res)
      notice({ type: 'success', content: '上传成功！' })
      showModel.value = false
      isLoading.value = false
    })
    .catch((e) => {
      console.log(e)
      notice({ type: 'error', content: '上传失败，' + e.message })
      isLoading.value = false
    })
  })
}

// 表单验证
function validate (form) {
  if (form.title === '') {
    notice({ type: 'error', content: '标题不得为空!' })
    return false
  }
  if (!form.file) {
    notice({ type: 'error', content: '必须选择一个文件!' })
    return false
  }
  const tail = getFileTail(form.file)
  if (tail !== 'md') {
    notice({ type: 'error', content: '必须选择md文件!' })
    return false
  }
  return true
}

// 表单提交
async function submit (form, { tcb, db }) {
  // 构造文件名
  const tail = getFileTail(form.file)
  const name = form.title + '-' + uid(8) + '.' + tail
  // 上传md文件
  const uploadResult = await tcb.uploadFile({
    cloudPath: config.storage.blogs + name,
    filePath: form.file
  })

  // 获取md文件链接
  const urlResult = await tcb.getTempFileURL({
    fileList: [uploadResult.fileID]
  })
  const url = urlResult.fileList[0].tempFileURL

  // 获取摘要
  const desc = await getMdDesc(form.file)

  // 存入数据库
  const data = Object.assign(blogDefaultData(), {
    title: form.title,
    tags: form.tags,
    categories: form.categories,
    fileId: uploadResult.fileID,
    url: url,
    desc
  })
  const dbResult = await db.collection(config.dbCollections.blogs).add(data)

  return {
    uploadResult, uploadResult, dbResult, data
  }
}

// 从文件中获取摘要
async function getMdDesc (mdFile) {
  // 获取文件内容
  const text = await getFileText(mdFile)

  // 先找标题位置，第一个标题前的内容为摘要，不得多于100字
  const res = text.match(/\n(#+)(.*)/)
  const index = res.index > 100 ? 100 : res.index

  return text.slice(0, index)
}

</script>