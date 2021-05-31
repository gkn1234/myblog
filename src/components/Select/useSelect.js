/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-31 11:16:17
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-31 21:09:44
 */
import { reactive, ref, computed, provide, onMounted, onBeforeUnmount, toRaw } from 'vue'
import { getOptionLabel, SELECT_OPTIONS_KEY } from './useOptions'

// 下拉框管理
export function useDropdown () {
  // 对象的dom
  const selectEl = ref(null)
  const dropdownEl = ref(null)

  // 开始定义操作钩子
  let hook = {}
  // 下拉框的定位样式
  hook.style = reactive({})
  // 下拉框的是否显示
  hook.isShow = ref(false)

  // 显示下拉框
  hook.show = () => {
    if (!selectEl.value || hook.isShow.value) {
      return    
    }

    // 获取select对象位置
    const rect = selectEl.value.getBoundingClientRect()
    // 调整下拉框位置
    hook.style.width = `${rect.width}px`
    hook.style.top = `${rect.top + rect.height + 5}px`
    hook.style.left = `${rect.left}px`  

    hook.isShow.value = true
  }

  // 隐藏下拉框
  hook.hide = () => {
    hook.isShow.value = false
  }

  // 触发下拉框
  hook.toggle = () => {
    if (hook.isShow.value) {
      hook.hide()
    }
    else {
      hook.show()
    }
  }

  // 点击外部区域隐藏下拉框
  function clickOutterHandler (e) {
    // 下拉框本身状态为隐藏时，不处理
    if (!hook.isShow.value) { return }
    // 点击下拉框内部不会隐藏
    if (dropdownEl.value.contains(e.target)) { return }
    hook.hide()
  }
  onMounted(() => {
    document.addEventListener('click', clickOutterHandler)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutterHandler)
  })

  return {
    selectEl, dropdownEl, 
    dropdownHook: hook
  }
}

// Select组件管理选项options数据列表的方法
export function useOptions () {
  let hook = {}

  /**
   * 选项队列，每个选项结构如下
   * @param {*} value 选项对应的值，具有唯一性，在列表中不可重复
   * @param {String} label 选项在界面中显示的内容
   */
  hook.options = reactive([])

  // 选项操作钩子
  let optionHooks = new WeakMap()
  onBeforeUnmount(() => {
    optionHooks = null
  })

  // 添加选项
  hook.add = (option, optionHook) => {
    // 将选项对象加入列表，加入前要先确保value没有重复
    const sign = hook.options.find(item => item.value === option.value)
    if (sign) {
      throw new Error('Duplicate values found in options!')
    }
    hook.options.push(option)

    const raw = toRaw(option)
    optionHooks.set(raw, optionHook)
  }

  // 移除选项
  hook.remove = (option) => {
    const index = hook.options.findIndex(item => item.value === option.value)
    if (index >= 0) {
      hook.options.splice(index, 1)

      // 删除钩子
      const raw = toRaw(option)
      optionHooks.delete(raw, hook)
    }
  }

  // 根据value，从options队列中获取选项
  hook.get = (value) => {
    return hook.options.find(item => item.value === value)
  }

  // 根据option，获取对应的操作钩子
  hook.getHookByOption = (option) => {
    const raw = toRaw(option)
    return optionHooks.get(raw)   
  }

  // 根据value，获取对应option的钩子
  hook.getHook = (value) => {
    const option = hook.get(value)
    if (option) {
      return hook.getHookByOption(option)    
    }
  }

  return hook
}


export function useSingleSelect (props, emit, optionsHook) {
  let hook = {}

  // 单选内容
  hook.value = computed({
    get () {
      return props.value
    },
    set (val) {
      emit('update:value', val)
    }
  })

  // 单选标签
  hook.label = computed(() => {
    const option = optionsHook.get(hook.value.value)
    return !!option ? getOptionLabel(option) : ''
  })

  return hook
}

export function useMultipleSelect (props, emit, optionsHook) {
  let hook = {}

  // 多选内容
  hook.values = computed({
    get () {
      return props.values
    },
    set (val) {
      emit('update:values', val)
    }
  })

  // 多选标签列表
  hook.labels = computed(() => {
    const options = hook.values.value.map(value => optionsHook.get(value))
    return options.map(option => getOptionLabel(option))
  })

  // 多选时，增加内容
  hook.add = (value) => {
    const index = hook.values.value.indexOf(value)
    if (index >= 0) {
      throw new Error('Duplicate values found in selected values!')
    }
    hook.values.value.push(value)
  }

  // 多选时，减少内容
  hook.remove = (value) => {
    const index = hook.values.value.indexOf(value)
    if (index >= 0) {
      hook.values.value.splice(index, 1)
    }
  }

  return hook
}

// 下发操作钩子，与子组件Option建立通信连接
export function connectWithOptions (props, {
  optionsHook,
  singleSelectHook, 
  multipleSelectHook,
  dropdownHook
}) {
  const handler = {
    // 是否为多选模式
    multiple: props.multiple,
    // 选项管理钩子
    optionsHook,
    // 单选操作钩子
    singleSelectHook,
    // 多选操作钩子
    multipleSelectHook,
    // 下拉框钩子
    dropdownHook,
  }

  provide(SELECT_OPTIONS_KEY, handler)
}

/**
 * Select组件管理选中项目的方法
 * @param {Reactive} props
 * @param {Function} emit
 * @param {useOptions} optionsHook 
 * @returns 
 */
export function useOptionsSelected (props, emit, optionsHook) {
  // 单选内容
  let selectedValue = computed({
    get () {
      return props.value
    },
    set (val) {
      emit('update:value', val)
    }
  })
  // 单选标签
  let selectedLabel = computed(() => {
    const option = optionsHook.get(selectedValue.value)
    return !!option ? getOptionLabel(option) : ''
  })

  // 多选内容
  let selectedValues = computed({
    get () {
      return props.values
    },
    set (val) {
      emit('update:values', val)
    }
  })

  // 多选标签列表
  let selectedLabels = computed(() => {
    const options = selectedValues.value.map(value => optionsHook.get(value))
    return options.map(option => getOptionLabel(option))
  })

  // 多选时，增加内容
  function addValue (value) {
    const index = selectedValues.value.indexOf(value)
    if (index >= 0) {
      throw new Error('Duplicate value found!')
    }
    selectedValues.value.push(value)
  }

  // 多选时，减少内容
  function removeValue (value) {
    const index = selectedValues.value.indexOf(value)
    if (index >= 0) {
      selectedValues.value.splice(index, 1)
    }
  }

  return { 
    selectedValue, selectedLabel, 
    selectedValues, selectedLabels,
    addValue, removeValue
  }
}

/**
 * Select组件与子选项组件通信
 * @param {Reactive} props
 * @param {useOptions} optionsHook 
 * @param {useOptionsSelected} selectedHook
 * @param {useDropdown} dropdownHook
 */
export function useOptionsHandler (props, optionsHook, selectedHook, dropdownHook) {
  let { selectedValue } = selectedHook
  // 传递给子选项的数据，子选项用以与父组件Selector通信
  const handler = {
    // 是否为多选模式
    multiple: props.multiple,
    // 单选模式下，当前选中的内容
    selectedValue: selectedHook.selectedValue,
    // 多选模式下，当前选中的内容
    selectedValues: selectedHook.selectedValues,
    // 新的选项创建时
    onOptionCreated (option, selector) {
      optionsHook.add(option, selector)
    },
    // 新的选项销毁时
    onOptionDestroy (option) {
      optionsHook.remove(option)
    },
    // 选中选项
    onOptionSelect (option) {
      if (props.multiple) {
        // 多选
        selectedHook.addValue(option.value)
      }
      else {
        const selectedOption = optionsHook.get(selectedValue.value)
        optionsHook.cancel(selectedOption)
        selectedValue.value = option.value
        // 单选后选项确定后，隐藏下拉框
        dropdownHook.hideDropdown()
      }
    },
    // 取消选项
    onOptionCancel (option) {
      if (props.multiple) {
        selectedHook.removeValue(option.value)
      }
      else {
        selectedValue.value = null
      }
    }
  }

  provide(SELECT_OPTIONS_KEY, handler)

  return { handler }
}

// 处理下拉选项框逻辑
/*
export function useDropdown () {
  // 对象的dom
  const selectEl = ref(null)
  const dropdownEl = ref(null)
  // 下拉框的定位样式
  let dropdownStyle = reactive({})
  // 下拉框的是否显示
  let isDropdownShow = ref(false)

  // 触发下拉框
  function toggle () {
    if (isDropdownShow.value) {
      hideDropdown()
    }
    else {
      showDropdown()
    }
  }

  // 显示下拉框的回调
  function showDropdown () {
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
    isDropdownShow.value = false
  }

  // 点击外部区域隐藏下拉框
  function clickOutterHandler (e) {
    // 下拉框本身状态为隐藏时，不处理
    if (!isDropdownShow.value) { return }
    // 点击下拉框内部不会隐藏
    if (dropdownEl.value.contains(e.target)) { return }
    hideDropdown()
  }
  onMounted(() => {
    document.addEventListener('click', clickOutterHandler)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutterHandler)
  })

  return {
    isDropdownShow,
    selectEl, dropdownEl, 
    dropdownStyle, 
    showDropdown, hideDropdown, toggleDropdown 
  }
}
*/