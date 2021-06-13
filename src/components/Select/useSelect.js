/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-31 11:16:17
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-02 10:31:58
 */
import { reactive, ref, computed, provide, onMounted, onBeforeUnmount, toRaw, watch, nextTick } from 'vue'
import { debounce } from '@/utils'
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

  hook.resize = () => {
    nextTick(() => {
      // 获取select对象位置
      const rect = selectEl.value.getBoundingClientRect()
      // 调整下拉框位置
      hook.style.width = `${rect.width}px`
      hook.style.top = `${rect.top + rect.height + 5}px`
      hook.style.left = `${rect.left}px`  
    }) 
  }

  // 显示下拉框
  hook.show = () => {
    if (!selectEl.value || hook.isShow.value) {
      return    
    }

    hook.resize()

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
    // 这个WeakMap的key是raw对象，为了避免内存泄漏，所以在组件销毁前赋值null
    optionHooks = null
  })
  hook.optionHooks = optionHooks

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
    return option ? getOptionLabel(option) : ''
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
    if (!props.multiple) { return }
    const index = hook.values.value.indexOf(value)
    if (index >= 0) {
      throw new Error('Duplicate values found in selected values!')
    }
    hook.values.value.push(value)
  }

  // 多选时，减少内容
  hook.remove = (value) => {
    if (!props.multiple) { return }
    const index = hook.values.value.indexOf(value)
    if (index >= 0) {
      hook.values.value.splice(index, 1)
    }
  }

  return hook
}

// 输入过滤显示标签
export function useFilter (props, optionsHook) {
  const inputEl = ref(null)

  let hook = {}

  // 标签功能是否可用
  const enabled = computed(() => {
    return props.multiple && props.filter
  })

  // 输入框内容
  hook.value = ref('')

  // 输入框集中焦点
  hook.focus = () => {
    if (inputEl.value) {
      inputEl.value.focus()
    }
  }

  // 根据输入内容，过滤显示所有选项
  hook.filter = (value) => {
    if (!enabled.value) { return }

    optionsHook.options.forEach((option) => {
      const text = typeof option.value === 'string' ? option.value : getOptionLabel(option)
      const optionHook = optionsHook.getHookByOption(option)
      optionHook.isShow.value = text.indexOf(value) >= 0
    })
  }

  return {
    inputEl,
    filterHook: hook
  }
}

// 处理标签输入
export function useTags (props, optionsHook) {
  let count = 0

  let hook = {}

  // 标签功能是否可用
  const enabled = computed(() => {
    return props.multiple && props.filter && props.tags
  })

  // 新建一个标签选项
  hook.create = () => {
    const tag = {
      // 必须有唯一的key，否则由于Vue的dom diff原因，会重复创建删除导致数据错乱
      key: count,
      value: null,
      label: ''
    }
    count++
    return tag
  }

  // 标签列表
  hook.tags = reactive([hook.create()])

  // 正在输入的标签值
  hook.activeValue = computed({
    get () { return hook.tags[0].value },
    set (val) {
      hook.tags[0].value = val
    }
  })

  // 将输入的值与输入标签同步
  hook.sync = (value) => {
    if (!enabled.value) { return }

    // 输入的值不可与已有标签重复
    hook.activeValue.value = (optionsHook.get(value) || value === '') ? null : value
  }

  // 将输入的标签换新，一般在选中正在输入的标签时触发
  hook.unshift = () => {
    if (!enabled.value) { return }
    if (hook.activeValue.value === null) { return }

    // 正在输入的标签向后压
    hook.tags.unshift(hook.create())
  }

  // 给定值，删除对应的标签
  hook.remove = (value) => {
    if (!enabled.value) { return }
    
    const index = hook.tags.findIndex(item => item.value === value)
    if (index > 0) {
      // 至少会留下队首的标签，队首标签记录了正在输入的标签，必须保留
      hook.tags.splice(index, 1)
      // 删除后，会触发对应option的onBeforeUnmount周期，会自动删除options队列中的对应数据
    }
  }

  return hook
}

// 下发操作钩子，与子组件Option建立通信连接
export function connectWithOptions (props, {
  optionsHook,
  singleSelectHook, 
  multipleSelectHook,
  dropdownHook,
  filterHook,
  tagsHook
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
    // 过滤输入框的钩子
    filterHook,
    // 标签输入的钩子
    tagsHook
  }

  provide(SELECT_OPTIONS_KEY, handler)
}
