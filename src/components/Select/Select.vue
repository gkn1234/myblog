<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-25 15:05:12
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-02 10:26:24
-->
<template>
  <div class="select" ref="selectEl" @click.stop="dropdownHook.toggle">
    <!-- 单选框 -->
    <div class="select-single" v-if="!multiple">{{ singleLabel }}</div>
    <!-- 多选框 -->
    <div class="select-multiple" v-else>
      <div class="select-multiple-item" v-for="(item, index) in multipleLabels" :key="index">
        <span class="select-multiple-item-label">{{ item }}</span>
        <span class="select-multiple-item-close" @click.stop="removeValueHandler(index)">×</span>
      </div>
      <input v-if="filter" ref="inputEl" type="text"
        v-model="inputFilterValue" />
    </div>

    <!-- 下拉图标 -->
    <svg class="icon select-item" aria-hidden="true">
      <use xlink:href="#icondown"></use>
    </svg>

    <teleport to="body">
      <div class="select-dropdown-wrapper">
        <div class="select-dropdown" ref="dropdownEl" v-show="isDropdownShow" :style="dropdownStyle">
          <template v-for="item in tags" :key="item.key">
            <SelectOption v-if="item.value !== null" :value="item.value" :label="item.label" :isTag="true"></SelectOption>
          </template>
          <slot></slot>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="stylus" src="./Select.styl" scoped></style>

<script setup>

import { defineProps, defineEmit, watch, nextTick } from 'vue'
import { debounce } from '@/utils'
import {
  useDropdown,
  useOptions, 
  useSingleSelect,
  useMultipleSelect,
  useFilter,
  useTags,
  connectWithOptions,
} from './useSelect'
import SelectOption from './SelectOption.vue'

const props = defineProps({
  // 是否支持多选，多选的内容将会以标签的形式展示在输入框中
  multiple: {
    type: Boolean,
    default: false
  },
  // 是否根据输入内容过滤选项，根据选项的value键值进行过滤，multiple必须为true
  filter: {
    type: Boolean,
    default: false
  },
  // 支持随意输入，按下回车后就会形成标签，inputFilter以及mutiple必须为true，此选项才有效
  tags: {
    type: Boolean,
    default: false
  },
  // 单选Select的值
  value: {
    default: null
  },
  // 多选Select的值
  values: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmit([
  // 单选模式绑定事件
  'update:value',
  // 多选模式绑定事件
  'update:values'
])

// 下拉框初始化
const { selectEl, dropdownEl, dropdownHook } = useDropdown()
const { 
  isShow: isDropdownShow,
  style: dropdownStyle,
} = dropdownHook

// 选项列表初始化
const optionsHook = useOptions()

// 单选多选初始化
const singleSelectHook = useSingleSelect(props, emit, optionsHook)
const multipleSelectHook = useMultipleSelect(props, emit, optionsHook)
const { label: singleLabel } = singleSelectHook
const { labels: multipleLabels } = multipleSelectHook

// 多选时过滤输入初始化
const { inputEl, filterHook } = useFilter(props, optionsHook)
const { value: inputFilterValue, inputOptions } = filterHook

// 标签输入功能初始化
const tagsHook = useTags(props, optionsHook)
const { tags } = tagsHook

// 与Option建立通信
connectWithOptions(props, {
  optionsHook,
  singleSelectHook,
  multipleSelectHook,
  dropdownHook,
  filterHook,
  tagsHook
})

// 点击多选标签的关闭按钮触发
function removeValueHandler (index) {
  const value = multipleSelectHook.values.value[index]
  const optionHook = optionsHook.getHook(value)
  optionHook.cancel()
}

// 监听输入框的值
watch(inputFilterValue, debounce((value) => {
  dropdownHook.show()
  // 输入标签同步
  tagsHook.sync(value)
  nextTick(() => {
    // 过滤显示标签
    filterHook.filter(value)
  })
}, 100))

</script>