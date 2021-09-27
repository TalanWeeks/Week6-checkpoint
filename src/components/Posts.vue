<template>
  <div class="col-md-3 m-2">
    <div class="card shadow border elevatated-5">
      <div class="card-title">
        <div class="on-hover position-absolute" style="right: 1rem; top: 1rem" v-if="account.id == post.creatorId">
          <i class="mdi mdi-delete-forever text-danger f-20 selectable" @click="deletePost()"></i>
        </div>
        <img :src="post.imgUrl" class="card-img-top" alt="...">
      </div>
      <div class="card-body">
        <h5 class="text-clip">
          {{ post.body }}
        </h5>
      </div>
      <div class="card-foot">
        <div class="row d-flex justify-content-between mb-1">
          <div class="col-3 ms-1" v-if="user.isAuthenticated">
            <img src="https://cdn.imgbin.com/21/22/10/imgbin-coloring-book-emoji-heart-drawing-the-heart-icon-nF2YRNtAqH7rWYR4F44MvvaYd.jpg"
                 class="selectable"
                 width="50"
                 alt=""
                 v-if="user.isAuthenticated"
                 @click="likePost()"
            >
            <img src="https://th.bing.com/th/id/OIP.M10KEQ5DMiYOh9dUAtsAnQHaHa?pid=ImgDet&rs=1"
                 alt=""
                 width="50"
                 v-else
            >
            <h6>total likes:</h6> {{ post.likeIds.length }}
          </div>

          <div class="col-3">
            <h6>Creator Name:</h6> {{ post.creator.name }}
          </div>

          <div class="col-3">
            <router-link :to="{name: 'Profile', params: {id: post.creatorId}}" class="selectable">
              <img :src="post.creator.picture" width="50" alt="">
            </router-link>
            <h6>Posted:</h6>
            <span>{{ new Date(post.creator.createdAt).toDateString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { adsService } from '../services/AdsService'
import { computed } from '@vue/runtime-core'
import { PostModel } from '../models/PostModel'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    post: { type: PostModel, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      likeIds: computed(() => AppState.likeIds),
      async getPosts(props) {
        try {
          await postsService.getPosts()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async getAds() {
        try {
          await adsService.getAds()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deletePost() {
        try {
          await postsService.deletePost(props.post.id)
          Pop.toast('Deleted Forever!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async likePost() {
        try {
          await postsService.likePost(props.post.id)
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
