/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-25 19:01:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-03 11:53:17
 */
import { computed } from 'vue'

// v-model简写
export function useVModel (props, emit, modelName) {
  let model = computed({
    get () { return props[modelName] },
    set (val) {
      emit(`update:${modelName}`, val)
    }
  })

  return model
}