<template>
  <nav class="navbar navbar-expand-sm  px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <!-- <img alt="logo" src="../assets/img/cw-logo.png" height="45" /> -->
        <i class="mdi mdi-home"></i>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>

<form @submit.prevent="searchPostsAndUsers()">
          <div class="input-group m-3">
            <input v-model="editableSearchQuery" type="text" class="form-control" placeholder="Find a user or post..." aria-label="Search"
              aria-describedby="button-addon2">
              <button class="btn btn-outline-secondary" type="submit" id="button-addon2"> <i class="mdi mdi-magnify"></i> </button>
          </div>
        </form>


          <!-- <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link> -->
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div>
        <button class="btn text-light" @click="toggleTheme">
          <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
        </button>
      </div>
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import { searchService } from '../services/SearchServices.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {

    const editableSearchQuery = ref('')

        const theme = ref(loadState('theme') || 'light')

    onMounted(() => {
      document.documentElement.setAttribute('data-bs-theme', theme.value)
    })

    return {
      editableSearchQuery,
      savedSearch: computed(()=> AppState.searchQuery),

async searchPostsAndUsers(){
  try {
    logger.log('searching for', editableSearchQuery.value)
    await searchService(editableSearchQuery.value)
      } catch (error) {
    Pop.error(error)
  }
},

      theme,
      toggleTheme() {
        theme.value = theme.value == 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', theme.value)
        saveState('theme', theme.value)
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
