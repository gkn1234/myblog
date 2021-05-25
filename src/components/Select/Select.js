/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-25 15:05:26
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-25 19:35:22
 */
import { defineComponent, provide, reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import Option from './Option.vue'

export default defineComponent({
  name: 'Select',
  components: {
    Option
  },
  props: {
    // 是否支持多选，多选的内容将会以标签的形式展示在输入框中
    mutiple: {
      type: Boolean,
      default: false
    },
    // 是否根据输入内容过滤选项，根据选项的value键值进行过滤
    inputFilter: {
      type: Boolean,
      default: false
    },
    // 支持随意输入，按下回车后就会形成标签，inputFilter必须为true，此选项才有效
    inputCreateOption: {
      type: Boolean,
      default: false
    },
    // 初始值，支持双向绑定，集合包含的每一个对象为options中的value
    value: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit, slots }) {
    const { valuesToOptions, optionsToValues } = useOptions(props)
    const { selectEl, dropdownEl, dropdownStyle, isDropdownShow, showDropdown, hideDropdown, toggleDropdown } = useDropdown()

    return {
      valuesToOptions, optionsToValues,
      selectEl, dropdownEl, dropdownStyle, isDropdownShow, showDropdown, hideDropdown, toggleDropdown
    }
  }
})

// 处理选项
function useOptions () {
  // 选项，使用Map为了确保value的唯一性，子选项的value不能重复
  let valuesToOptions = reactive(new Map())
  let optionsToValues = reactive(new Map())

  // 传递给子选项的数据，子选项用以与父组件Selector通信
  const handler = {
    // 单选/多选 模式
    mutiple: props.mutiple,
    // 新的选项创建时
    onOptionCreated (option) {
      valuesToOptions.set(option.value, option)
      optionsToValues.set(option, option.value)
    },
    // 新的选项销毁时
    onOptionDestroy (option) {
      valuesToOptions.delete(option.value)
      optionsToValues.delete(option)
    },
    // 选项发生变化时
    onOptionChange (option) {
      const value = optionsToValues.get(option)
      if (!value) {
        valuesToOptions.delete(value)
        return
      }
      
      if (value !== option.value) {
        valuesToOptions.delete(value)
        valuesToOptions.set(option.value, option)
        optionsToValues.set(option, option.value)
      }
    },
    // 选中选项
    onOptionSelect (option) {

    },
    // 当取消选
    onOptionCancel (option) {
      
    }
  }
  provide('optionHandler', handler)

  return { valuesToOptions, optionsToValues }
}

// 处理下拉选项框逻辑
function useDropdown () {
  // 对象的dom
  const selectEl = ref(null)
  const dropdownEl = ref(null)
  // 下拉框的定位样式
  let dropdownStyle = reactive({})
  // 下拉框的是否显示
  let isDropdownShow = ref(false)

  function toggleDropdown () {
    if (isDropdownShow.value) {
      hideDropdown()
    }
    else {
      showDropdown()
    }
  }

  // 显示下拉框的回调
  function showDropdown () {
    console.log('show')
    if (!selectEl.value || isDropdownShow.value) {
      return    
    }

    // 获取select对象位置
    const rect = selectEl.value.getBoundingClientRect()
    // 调整下拉框位置
    dropdownStyle.width = `${rect.width}px`
    dropdownStyle.top = `${rect.top + rect.height + 5}px`
    dropdownStyle.left = `${rect.left}px`  

    // 显示
    isDropdownShow.value = true
  }

  // 隐藏下拉框
  function hideDropdown () {
    console.log('hide')
    isDropdownShow.value = false
  }

  // 点击外部区域隐藏下拉框的事件
  function clickOutterHandler (e) {
    if (e.target !== dropdownEl.value && isDropdownShow.value) {
      hideDropdown()
    }
  }
  onMounted(() => {
    document.addEventListener('click', clickOutterHandler)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutterHandler)
  })

  return { selectEl, dropdownEl, dropdownStyle, isDropdownShow, showDropdown, hideDropdown, toggleDropdown }
}