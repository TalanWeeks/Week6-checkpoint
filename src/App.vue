<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row">
      <Sidebar class="col-md-2" />
      <div class="col-md-10 viewport">
        <router-view />
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
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
