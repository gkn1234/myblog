<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-07 08:56:30
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-02 16:31:02
-->
<template>
  <button class="btn" :class="buttonClasses" :disabled="disabledState">
    <Loading v-if="loading" class="margin-right-5"></Loading>
    <slot></slot>
  </button>
</template>

<style lang="stylus" src="./Button.styl" scoped></style>
<script setup>

import { defineProps, computed } from 'vue'
import Loading from '../Loading/Loading.vue'

const props = defineProps({
  // 按钮大小，small/medium/large
  size: {
    default: 'medium',
    type: String
  },
  // 按钮类型，default/primary/success/warning/error
  type: {
    default: 'default',
    type: String
  },
  // 边框是否虚线
  dashed: {
    default: false,
    type: Boolean
  },
  // 边框是否透明
  noBorder: {
    default: false,
    type: Boolean
  },
  // 是否镂空
  outlined: {
    default: false,
    type: Boolean
  },
  // 形状，rect方形 / radius 圆角 / round 圆形
  shape: {
    default: 'rect',
    type: String
  },
  // 按钮禁用
  disabled: {
    default: false,
    type: Boolean
  },
  // 加载状态
  loading: {
    default: false,
    type: Boolean
  }
})

// 由于加载状态loading为true时，按钮也处于disabled禁用状态，所以用这个变量真正决定按钮是否禁用
const disabledState = computed(() => {
  return props.disabled || props.loading
})

const buttonClasses = computed(() => {
  const dashed = props.dashed ? 'dashed' : ''
  const noBorder = props.noBorder ? 'no-border' : ''
  const outlined = props.outlined ? 'outlined' : ''
  const disabled = disabledState.value ? 'disabled' : ''
  return [props.size, props.type, props.shape, dashed, noBorder, outlined, disabled].join(' ')
})

</script>