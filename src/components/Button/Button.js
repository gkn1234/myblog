/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-07 08:56:57
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-07 11:02:43
 */
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
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
    }
  },
  setup (props) {
    const buttonClasses = computed(() => {
      const dashed = props.dashed ? 'dashed' : ''
      const noBorder = props.noBorder ? 'no-border' : ''
      const outlined = props.outlined ? 'outlined' : ''
      return [props.size, props.type, props.shape, dashed, noBorder, outlined].join(' ')
    })

    return {
      buttonClasses
    }
  }
})