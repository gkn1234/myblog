<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-25 15:05:12
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-25 19:25:50
-->
<template>
  <div class="select" ref="selectEl" @click.stop="toggleDropdown">
    <!-- 单选框 -->
    <div class="select-single" v-if="!mutiple">

    </div>
    <!-- 多选框 -->
    <div class="select-mutiple" v-else>
      <input v-if="inputFilter" />
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
<script src="./Select.js"></script>