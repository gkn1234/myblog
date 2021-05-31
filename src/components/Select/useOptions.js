/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-31 11:56:21
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-31 21:06:44
 */
import { computed, inject, onBeforeUnmount } from 'vue'

// Select组件与子组件通信的key
export const SELECT_OPTIONS_KEY = '___selectOptionHandler__'

// 给定一个option选项对象，获取label显示文字，label为空时，将于value相等
export function getOptionLabel (option) {
  return option.label === '' ? String(option.value) : option.label
}

export function useOption (props) {
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
  } = handler

  console.log(handler)
  // 创建组件时，注册Option到父组件Select
  optionsHook.add(props, hook)
  // 组件销毁时，父组件Select停止对Option的管理
  onBeforeUnmount(() => {
    optionsHook.remove(props)
  })

  // 是否被选中
  hook.isSelected = computed(() => {
    if (multiple) {
      return multipleSelectHook.values.value.indexOf(props.value) >= 0
    }
    return singleSelectHook.value.value === props.value
  })

  // 标签文字
  hook.label = computed(() => {
    return getOptionLabel(props)
  })
  
  // 选中选项
  hook.select = () => {
    if (multiple) {
      // 多选模式
      multipleSelectHook.add(props.value)
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
    }
    else {
      singleSelectHook.value.value = null
    }
  }

  return hook
}

// 控制选项是否选中
/*
export function useSelector () {
  let selected = ref(false)
  function select () {
    selected.value = true
  }
  function cancel () {
    selected.value = false
  }
  function toggle () {
    selected.value = !selected.value
  }
  return { selected, select, cancel, toggle }
}
*/

/**
 * 处理Option与父组件Select的通信
 * @param {Reactive} props 
 * @param {useSelector} selectorHook 选项控制
 * @returns 
 */
/*
export function useOptionHandler (props, selectorHook) {
  const handler = inject(SELECT_OPTIONS_KEY)
  if (!handler) {
    return
  }

  const { selected } = selectorHook

  handler.onOptionCreated(props, selectorHook)
  onBeforeUnmount(() => {
    handler.onOptionDestroy(props)
  })

  // 点选选项回调
  function selectHandler () {
    handler.multiple ? _multipleSelectHandler() : _singleSelectHandler()
  }

  // 多选回调
  function _multipleSelectHandler () {
    // 多选时，点已选中的，变为取消，点未选中的，变为选中
    if (selected.value) {
      selected.value = false
      handler.onOptionCancel(props)
    }
    else {
      selected.value = true
      handler.onOptionSelect(props)
    }
  }

  // 单选回调
  function _singleSelectHandler () {
    // 单选时，点已选中的，无变化，点未选中的，变为选中
    if (!selected.value) {
      selected.value = true
      handler.onOptionSelect(props)
    }
  }

  return { selectHandler }
}
*/