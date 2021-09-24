<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column ">
    <div class="row m-1 ms-5 p-1">
      <Posts v-for="p in posts " :key="p.id" :post="p" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'

export default {
  setup() {
    onMounted(() => {
      postsService.getPosts()
    })
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
