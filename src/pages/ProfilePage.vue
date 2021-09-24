<template>
  <div class="container-fluid">
    <div class="row m-0 p-0">
      <img :src="profile.coverImg" height="300" alt="">
    </div>
    <div class="row">
      <h4>{{ profile.name }}</h4>
    </div>
    <div class="row" v-if="posts.length > 0">
      <Posts v-for="p in posts " :key="p.id" :post="p" />
    </div>
    <div class="row" v-else>
      <h3>No Posts Under This User</h3>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { profileService } from '../services/ProfileService'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    async function getposts() {
      try {
        await postsService.getPosts({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'error')
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await profileService.getProfileById(route.params.id)
        getposts()
      }
    })
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>
