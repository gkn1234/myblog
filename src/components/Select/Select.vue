<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-25 15:05:12
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-31 21:11:05
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
      <input type="text" v-if="inputFilter" />
    </div>

    <!-- 下拉图标 -->
    <svg class="icon select-item" aria-hidden="true">
      <use xlink:href="#icondown"></use>
    </svg>

    <teleport to="body">
      <div class="select-dropdown-wrapper">
        <div class="select-dropdown" ref="dropdownEl" v-show="isDropdownShow" :style="dropdownStyle">
          <slot></slot>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="stylus" src="./Select.styl" scoped></style>

<script setup>

import { defineProps, defineEmit } from 'vue'
import {
  useDropdown,
  useOptions, 
  useSingleSelect,
  useMultipleSelect,
  connectWithOptions,
} from './useSelect'

const props = defineProps({
  // 是否支持多选，多选的内容将会以标签的形式展示在输入框中
  multiple: {
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
// 与Option建立通信
connectWithOptions(props, {
  optionsHook,
  singleSelectHook,
  multipleSelectHook,
  dropdownHook
})

// 点击多选标签的关闭按钮触发
function removeValueHandler (index) {
  const optionHook = optionsHook.getHook(multipleSelectHook.values.value[index])
  optionHook.cancel()
}

</script>