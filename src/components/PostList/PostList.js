/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 10:58:05
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-06 14:10:29
 */
import { defineComponent } from 'vue'

import Poster from '../Poster/Poster.vue'
import PostCard from '../PostCard/PostCard.vue'

export default defineComponent({
  name: 'PostList',
  components: {
    Poster,
    PostCard
  },
  setup () {
    const postLists = [{}]

    return {
      postLists
    }
  }
})