/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-31 11:56:21
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-01 18:43:19
 */
import { ref, computed, inject, onBeforeUnmount } from 'vue'

// Select组件与子组件通信的key
export const SELECT_OPTIONS_KEY = '___selectOptionHandler__'

// 给定一个option选项对象，获取label显示文字，label为空时，将于value相等
export function getOptionLabel (option) {
  return option.label === '' ? String(option.value) : option.label
}

export function useOption (props, attrs) {
  const handler = inject(SELECT_OPTIONS_KEY)
  if (!handler || typeof handler !== 'object') {
    throw new Error('Component SelectOption can only be used in Select\'s default slot!')
  }

  let hook = { handler }

  const {
    multiple,
    // 选项管理钩子
    optionsHook,
    // 单选操作钩子
    singleSelectHook,
    // 多选操作钩子
    multipleSelectHook,
    // 下拉框钩子
    dropdownHook,
    // 过滤输入框的钩子
    filterHook,
    // 标签输入的钩子
    tagsHook
  } = handler

  // console.log(handler)
  // 创建组件时，注册Option到父组件Select
  optionsHook.add(props, hook)
  // 组件销毁时，父组件Select停止对Option的管理
  onBeforeUnmount(() => {
    optionsHook.remove(props)
  })

  // 是否为标签
  hook.isTag = !!attrs.isTag

  // 是否被选中
  hook.isSelected = computed(() => {
    if (multiple) {
      return multipleSelectHook.values.value.indexOf(props.value) >= 0
    }
    return singleSelectHook.value.value === props.value
  })

  // 是否显示
  hook.isShow = ref(true)

  // 标签文字
  hook.label = computed(() => {
    return getOptionLabel(props)
  })
  
  // 选中选项
  hook.select = () => {
    if (multiple) {
      // 多选模式
      multipleSelectHook.add(props.value)
      if (attrs.isTag) {
        // 当选项为标签时，标签换新
        tagsHook.unshift()
      }
      // 输入框重置
      filterHook.value.value = ''
      // 重新集中输入框
      filterHook.focus()
      // 重新计算下拉框位置
      dropdownHook.resize()
    }
    else {
      singleSelectHook.value.value = props.value
      // 单选后选项确定后，隐藏下拉框
      dropdownHook.hide()
    }
  }

  // 取消选项
  hook.cancel = () => {
    if (multiple) {
      // 多选模式
      multipleSelectHook.remove(props.value)
      if (attrs.isTag) {
        // 当取消的选项为标签时，立即连同标签与选项一同删除
        tagsHook.remove(props.value)
      }
      // 输入框重置
      filterHook.value.value = ''
      // 重新集中输入框
      filterHook.focus()
      // 重新计算下拉框位置
      dropdownHook.resize()
    }
    else {
      singleSelectHook.value.value = null
    }
  }

  return hook
}