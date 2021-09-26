<template>
  <div v-if="ads.length > 0 " class="component bg-dark p-0">
    <div class="container-fluid shadow p-0 elevated-5">
      <div class="">
        <img :src="ads[0].banner" alt="" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      ads: computed(() => AppState.ads)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
