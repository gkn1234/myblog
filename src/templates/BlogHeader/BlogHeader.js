/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 15:34:42
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-18 14:49:55
 */
import { defineComponent, computed, onMounted } from 'vue'

// 博客顶部导航
export default defineComponent({
  name: 'BlogHeader',
  props: {
    // 博客的子项目
    links: {
      type: Array,
      default: () => []
    },
    // 被激活的子项目
    activeIndex: {
      type: Number,
      default: 0
    },
    // 是否透明主题，true为透明反色样式，false为标准样式
    isTransparent: {
      type: Boolean,
      default: false
    },
    // LOGO图片资源
    logoSrc: {
      type: String,
      default: null
    },
    // LOGO透明主题图片资源
    logoTransparentSrc: {
      type: String,
      default: null
    }
  },
  setup (props) {
    // 控制LOGO图标是否显示
    const isLogoImgShow = computed(() => {
      return typeof props.logoSrc === 'string' && props.logoSrc !== ''
    })
    // 根据当前主题，实际显示的图片资源
    const logoImgSrc = computed(() => {
      return props.isTransparent ? props.logoTransparentSrc : props.logoSrc
    })

    function m (e) {
      console.log(e)
    }

    return {
      isLogoImgShow, logoImgSrc,
      m
    }
  }
})

// 媒体查询，根据屏幕宽度判断links是否收起
function useMediaQuery () {

}