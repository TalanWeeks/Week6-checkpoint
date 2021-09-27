
<template>
  <form @submit.prevent="editProfile()">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text"
             class="form-control bg-light"
             name="name"
             placeholder="Name...."
             v-model="editable.name"
      >
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text"
               class="form-control bg-light"
               name="email"
               placeholder="Email...."
               v-model="editable.email"
        >
        <div class="form-group">
          <label for="picture">Picture</label>
          <input type="text"
                 class="form-control bg-light"
                 name="picture"
                 placeholder="Picture...."
                 v-model="editable.picture"
          >
          <div class="form-group">
            <label for="bio">Bio</label>
            <input type="text"
                   class="form-control bg-light"
                   name="bio"
                   placeholder="Bio...."
                   v-model="editable.bio"
            >
          </div>
          <div class="form-group">
            <label for="coverImg">Cover Img</label>
            <input type="text"
                   class="form-control bg-light"
                   name="coverImg"
                   placeholder="Img Url...."
                   v-model="editable.coverImg"
            >
          </div>
          <div class="form-group">
            <label for="github">GitHub</label>
            <input type="text"
                   class="form-control bg-light"
                   name="github"
                   placeholder="GitHub url...."
                   v-model="editable.github"
            >
          </div>
          <div class="form-group">
            <label for="linkedin">LinkedIn</label>
            <input type="text"
                   class="form-control bg-light"
                   name="linkedin"
                   placeholder="LinkedIn Url...."
                   v-model="editable.linkedin"
            >
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success mt-2">
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { profileService } from '../services/ProfileService'
export default {
  setup() {
    const editable = ref({ profile: [] })
    return {
      editable,
      async editProfile() {
        try {
          const yes = await Pop.confirm('Are you sure you want to Update?')
          if (!yes) { return }
          await profileService.editProfile(editable.value)
          const modal = Modal.getInstance(document.getElementById('profile-form'))
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
