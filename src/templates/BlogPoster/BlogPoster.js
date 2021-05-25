/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 14:38:35
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-25 17:43:40
 */
import { defineComponent, ref, reactive, computed, inject } from 'vue'

import { 
  Button, 
  Input, 
  FileInput,
  Select, Option,
  Popup, 
  notice
} from '@/components/index'

import { tcbReady } from '@/plugins/tcb'
import { uid } from '@/utils/index'
import config from '$/client.config'

export default defineComponent({
  name: 'BlogPoster',
  components: {
    Button, 
    Input, 
    FileInput,
    Select, Option,
    Popup
  },
  props: {
    /**
     * @param {Boolean} isShow 是否显示，继承给Popup组件，不再重复声明
     */

    // 文章分类列表
    categories: {
      type: Array,
      default: () => ['1', '2']
    }
  },
  setup () {
    const { form, fileName, fileInputHandler } = usePosterForm()
    const { popupWrapper, cancelHandler, submitHandler } = usePosterTrigger(form)
    return {
      form, fileName, fileInputHandler,
      popupWrapper, cancelHandler, submitHandler
    }
  }
})

// 表单输入
function usePosterForm () {
  // 整体表单
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

  // 文件输入变化
  function fileInputHandler (files) {
    form.file = files[0]
  }

  return { form, fileName, fileInputHandler }
}

// 表单触发
function usePosterTrigger (form) {
  const $http = inject('$http')
  const popupWrapper = ref(null)

  function cancelHandler () {
    if (popupWrapper.value) {
      popupWrapper.value.hide()
    }
  }

  function submitHandler () {
    if (form.title === '') {
      notice({ type: 'error', content: '标题不得为空!' })
      return
    }
    if (!form.file) {
      notice({ type: 'error', content: '必须选择一个文件!', title: '错误', duration: null })
      return
    }

    tcbReady(['storage'], ({ tcb }) => {
      submit(form, { $http, tcb }).then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    })
  }

  return { popupWrapper, cancelHandler, submitHandler }
}

// 上传文件，提交表单的系列操作
async function submit (form, { $http, tcb }) {
  const fileSections = form.file.name.split('.')
  const tail = fileSections[fileSections.length - 1]
  const name = form.title + '-' + uid(8) + '.' + tail
  const result = await tcb.uploadFile({
    cloudPath: config.storage.blog + name,
    filePath: form.file
  })
  return result
}