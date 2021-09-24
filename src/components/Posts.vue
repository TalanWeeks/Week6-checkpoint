<template>
  <div class="col-md-3 m-2">
    <div class="card shadow border elevatated-5">
      <div class="card-title">
        <div class="on-hover position-absolute" style="right: 1rem; top: 1rem" v-if="account.id == post.creatorId">
          <i class="mdi mdi-close text-danger f-20 selectable" @click="deleteProject()"></i>
        </div>
        <img :src="post.imgUrl" class="card-img-top" alt="...">
      </div>
      <div class="card-body">
        <h5 class="text-clip">
          {{ post.body }}
        </h5>
      </div>
      <div class="card-foot">
        <div class="row d-flex justify-space-around">
          <div class="col-4">
            <router-link :to="{name: 'Profile', params: {id: post.creatorId}}" class="selectable">
              <img :src="post.creator.picture" width="50" alt="">
            </router-link>
          </div>
          <div class="col-4">
            <h6>Creator Name:</h6> {{ post.creator.name }}
          </div>
          <div class="col-4">
            <h6>Graduated:</h6> {{ post.creator.graduated }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { PostModel } from '../models/PostModel'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    post: { type: PostModel, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      async getPosts(props) {
        try {
          await postsService.getPosts()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>
