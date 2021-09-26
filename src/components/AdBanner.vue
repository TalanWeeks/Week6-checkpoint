<template>
  <div v-if="ads.length > 0 " class="bg-dark m-0 text-center">
    <div class="container-fluid shadow p-0 elevated-5">
      <div class="">
        <img :src="ads[1].banner" alt="" class="img-custom img-fluid">
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
.img-custom{
  height: 150px;
  width: 85vw;
}

</style>
