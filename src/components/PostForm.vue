
<template>
  <form @submit.prevent="createPost()">
    <div class="form-group">
      <label for="body">Title</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="Title...."
             v-model="editable.body"
             required
      >
    </div>
    <div class="form-group">
      <label for="title">Img Url</label>
      <input type="text"
             class="form-control bg-light"
             name="imgUrl"
             placeholder="Img Url...."
             v-model="editable.imgUrl"
             required
      >
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Create Post
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({ posts: [] })
    return {
      editable,
      async createPost() {
        try {
          await postsService.createPost(editable.value)
          editable.value = { posts: [] }
          Pop.toast(' Cool cool cool', 'success')

          const modal = Modal.getinstance(document.getElementById('post-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
