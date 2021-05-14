/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 11:12:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-13 11:04:17
 */
import { defineComponent, ref, onMounted, inject } from 'vue'
import { transparentHeaderPage } from '@/mixins/index'
import { tcbReady } from '@/plugins/tcb'

import { IndexSection, Button } from '@/components/index'

import bannerUrl1 from '/img/banner.png'
import bannerUrl2 from '/img/banner3.png'

export default defineComponent({
  name: 'Index',
  emits: ['header-normal', 'header-transparent'],
  components: {
    IndexSection,
    Button
  },
  setup (props, { emit }) {
    // 使标题栏能够响应透明化
    transparentHeaderPage(emit)

    tcbReady(['auth', 'db'], ({ auth, db }) => {
      console.log(auth, db)
      
      auth.anonymousAuthProvider().signIn().then(() => {
        auth.getLoginState().then((state) => {
          console.log(state)
          state.user.update({
            nickName: 'Tony'
          }).then(() => {
  
          })
          /*auth.currentUser.update({
            nickName: 'Tony'
          }).then(() => {
  
          })*/
        })
      })
    })

    /*
    onMounted(() => {
      const tcb = inject('$tcb')
      tcb.auth.anonymousAuthProvider().signIn().then(() => {
        console.log(tcb.auth.hasLoginState())
        console.log(tcb)
        tcb.db.collection('test').get().then((res) => {
          console.log(res)
        })
        tcb.auth.currentUser.update({
          nickName: 'Tony'
        }).then(() => {
          console.log(tcb.auth.currentUser)
        })
      })
      //console.log(tcb)
      //console.log(tcb.auth.hasLoginState())      
    })
    */

    return {
      bannerUrl1, bannerUrl2
    }
  }
})
