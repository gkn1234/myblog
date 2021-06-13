<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 14:26:44
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-02 18:28:25
-->
<template>
  <teleport to="body" v-if="realShow">
    <div class="popup popup-animation" :class="[maskAnimation]" :style="aniDurationStyle"
      @click.self="maskClickHandler">
      <div class="popup-card popup-animation" :class="[popupAnimation, position, popupClass]" :style="aniDurationStyle">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<style lang="stylus" src="./Popup.styl" scoped></style>

<script setup>

import { defineProps, defineEmit, watchEffect } from 'vue'
import {
  useShow,
  usePopup
} from './usePopup'

const props = defineProps({
  // 浮动窗口位置
  position: {
    default: 'center',
    type: String
  },
  isShow: {
    default: false,
    type: Boolean
  },
  // 动画持续时间，单位为毫秒
  animationTime: {
    default: 200,
    type: Number
  },
  // 弹框容器的样式类
  popupClass: {
    default: '',
    type: String
  },
  // 点击遮罩是否关闭
  maskClosable: {
    default: true,
    type: Boolean
  }
})

const emit = defineEmit([
  // 双向绑定isShow
  'update:isShow'
])

// 初始化双向绑定处理，并解构出手动控制隐藏与显示的方法
const showHook = useShow(props, emit)
const { show, hide } = showHook
// 初始化Popup核心逻辑
const popupHook = usePopup(props)
const { realShow, popupAnimation, maskAnimation, aniDurationStyle } = popupHook

// 监听isShow，控制显隐
watchEffect(() => {
  // 稳定状态下，不会被触发
  if (realShow.value === props.isShow && !popupHook.isAnimating) { return }
  
  popupHook.play(props.isShow)
})

// 点击遮罩隐藏触发
function maskClickHandler () {
  if (props.maskClosable && !popupHook.isAnimating) {
    hide()
  }
}

</script>