<template>
  <div class="container">
    <section class="row">
      <div v-for="post in posts" class="col-12 border border-secondary m-3 p-3 rounded-3 shadow">

        {{ post }}

      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { AppState } from "../AppState.js"

export default {
  setup() {

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      // logger.log('home page mounted')
      getPosts()
    })

    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss"></style>
