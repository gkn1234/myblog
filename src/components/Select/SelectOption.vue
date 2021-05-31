<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-25 15:15:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-31 20:57:39
-->
<template>
  <div class="select-option" :class="{ selected: isSelected }" @click="optionClickHandler">
    <div class="select-label">{{ label }}</div>
    <!-- 选中图标 -->
    <svg class="icon select-icon" aria-hidden="true" :class="{ 'no-selected': !isSelected }">
      <use xlink:href="#iconcheck"></use>
    </svg>
  </div>
</template>

<style lang="stylus" src="./SelectOption.styl" scoped></style>

<script setup>

import { defineProps } from 'vue'
import { useOption } from './useOptions'

const props = defineProps({
  // 关键值，具有唯一性，每一组选项中所有Option的value值不能重复
  value: {
    required: true,
    validator (val) {
      return !!val
    }
  },
  // 显示的内容，默认与value相等
  label: {
    type: String,
    default: ''
  }
})

const optionHook = useOption(props)
const { label, isSelected } = optionHook

// 点击选项触发
function optionClickHandler () {
  if (optionHook.handler.multiple) {
    // 多选时，点已选中的，变为取消，点未选中的，变为选中
    if (optionHook.isSelected.value) {
      optionHook.cancel()
    }
    else {
      optionHook.select()
    }
  }
  else {
    // 单选时，点已选中的，无变化，点未选中的，变为选中
    if (!optionHook.isSelected.value) {
      optionHook.select()
    }
  }
}

</script>