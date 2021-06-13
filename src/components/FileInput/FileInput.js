/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-16 11:20:51
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-02 10:39:34
 */
import { defineComponent, ref, onMounted } from 'vue'

import Button from '../Button/Button.vue'

export default defineComponent({
  name: 'FileInput',
  components: {
    Button
  },
  emit: [
    // 获取到了文件
    'fileInput'
  ],
  props: {
    accept: {
      default: '',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    file: {
      default: null,
      type: File
    },
    files: {
      default: () => [],
      type: [FileList, Array]
    }
  },
  setup (props, { slots, emit }) {
    const { isDefaultTemplate } = uploaderTemplate(slots)
    const { fileInput, selectFileHandler, fileInputHandler } = useUploader(emit)

    return {
      isDefaultTemplate,
      fileInput, selectFileHandler, fileInputHandler
    }
  }
})



// 组件样式相关
function uploaderTemplate (slots) {
  let isDefaultTemplate = ref(true)

  onMounted(() => {
    // 插槽里有内容，则不显示默认的上传按钮
    isDefaultTemplate.value = slots.default && slots.default()[0] ? false : true
  })

  return { isDefaultTemplate }
}

// 上传逻辑
function useUploader (emit) {
  // 上传的DOM对象
  let fileInput = ref(null)
  // 任务列表

  // 点击上传触发
  function selectFileHandler () {
    if (fileInput.value) {
      fileInput.value.click()
    }
  }

  // 获取文件触发
  function fileInputHandler (e) {
    const files = e.target.files
    console.log(files)
    emit('fileInput', files)
  }

  return { fileInput, selectFileHandler, fileInputHandler }
}