<template>
  <header>
    <Navbar class="bg-grey" />
  </header>
  <main class="container-fluid ">
    <div class="row">
      <Sidebar class="col-md-2 bg-grey" />
      <div class="col-md-10 p-0 viewport bg-dark">
        <AdBanner class="row" />
        <router-view />
        <ArrowNextPage />
        <Ads />
      </div>
    </div>
  </main>
  <footer>
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
