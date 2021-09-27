<template>
  <div class="sidebar d-md-flex flex-column justify-content-between bg-dark d-none d-md-block">
    <div class="top-part">
      <div>
        <PostSearchBar />
      </div>
      <div class="row pt-5 text-center">
        <div class="col-12">
          <div class="text-white py-5">
            <h3>
              {{ user.nickname }}
            </h3>
          </div>
          <div class="row pt-1">
            <div class="col-12 text-light">
              <img
                :src="user.picture"
                alt="Please Log In"
                height="75"
                class="rounded"
              />
            </div>
          </div>
        </div>
        <button v-if="user.isAuthenticated" class="btn btn-success my-5" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
          Create a post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { ProfileModel } from '../models/ProfileModel'
import { profileService } from '../services/ProfileService'
import Pop from '../utils/Pop'
export default {
  props: {
    profile: { type: ProfileModel, required: true }
  },
  setup(profile) {
    return {
      account: computed(() => AppState.computed),
      profiles: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      async getProfile(props) {
        try {
          await profileService.getProfileBy(profile)
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
