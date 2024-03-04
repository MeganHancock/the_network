<template>
  <header>
    <Navbar />
    
<!-- <form @submit.prevent="searchPosts()" class="w-75 text-center">
          <div class="input-group m-3">
            <input v-model="postSearchQuery" type="text" class="form-control" placeholder="Find a post..." aria-label="Search"
              aria-describedby="button-addon2">
              <button class="btn btn-outline-secondary" type="submit" id="button-addon2"> <i class="mdi mdi-magnify"></i> </button>
          </div>
        </form> -->

  </header>
  <main>
    <router-view />
  </main>
  <footer class="">




  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),

    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
