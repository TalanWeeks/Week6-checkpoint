<template>
  <div class="container-fluid">
    <div class="row m-0 mt-2 p-0 cover-profile-img" :style="{backgroundImage: `url(${profile.coverImg})`}">
      <div class="col-4 mt-4">
        <div class="card m-4  container-fluid">
          <div class="card-title m-0 p-0">
            <div class=" mt-5 position-absolute" style="right: 1rem; top: 1rem" v-if="account.id == profile.id">
              <div class="dropdown">
                <a class="btn btn-secondary p-1 dropdown-toggle"
                   href="#"
                   role="button"
                   id="dropdownMenuLink"
                   data-bs-toggle="dropdown"
                   aria-expanded="false"
                >
                  ...
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a class="dropdown-item selectable" data-bs-toggle="modal" data-bs-target="#post-form">Edit Profile</a></li>
                </ul>
              </div>
            </div>
            <h2 class="m-0 p-0">
              {{ profile.name }}
            </h2>
          </div>
          <div class="card-body">
            <img :src="profile.picture" width="200" class="img-fluid m-auto" alt="">
          </div>
          <div class="card-footer">
            <span class="my-1"><h6>Bio:</h6> {{ profile.bio }}</span>
            <span class="my-1"><h6>Contact:</h6> {{ profile.email }}</span>
            <h6>Profiles:</h6>
            <h6>GitHub: </h6>
            <span>{{ profile.github }}</span>
            <h6>LinkedIn: </h6>
            <span>{{ profile.linkedin }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 text-center">
      <h2>Posts By: {{ profile.name }}</h2>
    </div>
    <div class="row mt-5" v-if="posts.length > 0">
      <Posts v-for="p in posts " :key="p.id" :post="p" />
    </div>
    <div class="row mt-5" v-else>
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

    async function editProfile() {
      try {
        await profileService.editProfile()
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
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts)
    }
  }

}
</script>

<style lang="scss" scoped>

.cover-profile-img{
  height: 60vh;
  background-position: center center;
  size: cover;
}

</style>
