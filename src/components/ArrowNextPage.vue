<template>
  <div class="component">
    <div class="row py-3 d-felx justify-content-between text-center">
      <div class="col-md-2 arrow-img-left">
        <img src="https://th.bing.com/th/id/OIP.nDig1rhLE9NJy9LOneW0rwHaHa?pid=ImgDet&rs=1"
             class="selectable"
             width="100"
             alt=""
             @click="getNextPage()"
        >
      </div>
      <div class="col-md-2 ">
        <img src="https://th.bing.com/th/id/OIP.nDig1rhLE9NJy9LOneW0rwHaHa?pid=ImgDet&rs=1"
             width="100"
             alt=""
             class="selectable"
             @click="getPreviousPage()"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { PostModel } from '../models/PostModel'
export default {
  props: {
    post: { type: PostModel, required: true }
  },
  setup(props) {
    return {
      posts: computed(() => AppState.posts),
      async getNextPage(props) {
        try {
          await postsService.getNextPage()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async getPreviousPage(props) {
        try {
          await postsService.getPreviousPage()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped >
.arrow-img-left { transform: rotate(180deg) }
        </style>
