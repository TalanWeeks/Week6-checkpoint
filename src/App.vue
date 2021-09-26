<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row">
      <Sidebar class="col-md-2" />
      <div class="col-md-10 p-0 viewport">
        <AdBanner class="row" />
        <router-view />
        <ArrowNextPage />
        <Ads />
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4 m-0">
      Made with 💖 by CodeWorks
    </div>
  </footer>

  <Modal id="post-form">
    <template #modal-title>
      <h4>Post Form</h4>
    </template>
    <template #modal-body>
      <PostForm />
    </template>
  </Modal>
</template>

<script>
import { onMounted, computed } from 'vue'
import { AppState } from './AppState'
import { adsService } from './services/AdsService'
export default {
  name: 'App',
  setup() {
    onMounted(() => { adsService.getAds() })
    return {
      appState: computed(() => AppState)

    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
