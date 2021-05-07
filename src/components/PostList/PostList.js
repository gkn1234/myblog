/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 10:58:05
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-07 17:09:46
 */
import { defineComponent, ref } from 'vue'

import Poster from '../Poster/Poster.vue'
import PostCard from '../PostCard/PostCard.vue'

export default defineComponent({
  name: 'PostList',
  components: {
    Poster,
    PostCard
  },
  setup () {
    const postLists = [{ id: '1', poster: '123', floor: '1' }]

    const { curReplyPostId, replyHandler } = useReply()

    return {
      postLists,
      curReplyPostId, replyHandler
    }
  }
})

// 回复逻辑处理
function useReply () {
  // 当前弹出的回复框属于哪一个回复卡片
  const curReplyPostId = ref('')

  /**
   * 处理留言卡片关于回复的响应
   * @param {*} id 发生响应的留言卡片id
   * @param {*} isReplyShow 是否要展开卡片的回复框，true为展开，false为收起
   */
  function replyHandler (id, isReplyShow) {
    if (isReplyShow) {
      curReplyPostId.value = id
    }
    else {
      curReplyPostId.value = ''
    }
  }

  return { curReplyPostId, replyHandler }
}