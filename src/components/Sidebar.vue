<template>
  <div class="sidebar d-md-flex flex-column justify-content-between bg-dark d-none d-md-block">
    <div class="top-part">
      <div class="text-white py-3">
        <h3 class="">
          tester
        </h3>
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
