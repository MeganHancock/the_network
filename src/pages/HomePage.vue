<template>
  <div class="container">
    <section class="row">
      <div v-for="post in posts" class="col-6 border border-secondary m-3 px-3 pt-3 pb-0 rounded-3 shadow">

        <div class="d-flex justify-content-between">

          <div class="d-flex">
            <!-- TODO create router-link to route to profile page -->
            <img :src="post.creator.picture" :alt="post.creator.name" class="creator-picture">
            <div class="ms-3">
              <p class="fs-6 fw-bold pb-0 mb-0">{{ post.creator.name }}</p>
              <p class="fw-lighter">{{ post.timeCreatedAt }} on {{ post.dateCreatedAt }}</p>
            </div>
          </div>
          <!-- TODO  edit post button, only display if ID matches  -->
          <i class="mdi mdi-dots-horizontal fs-3"></i>
        </div>

        <p class="mx-4 mt-2">{{ post.body }}</p>
        <img v-if="post.imgUrl" :src="post.imgUrl" :alt="post.creator.name" class="img-fluid post-img  rounded-3">

        <div class="text-end pb-0 mb-0">
          <!-- TODO hook up likes -->
          <!-- <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i> -->
          <p class="pb-0 mb-1">Likes 23
            <span class="fs-4">
              <i class="mdi mdi-heart"></i>
              <i class="mdi mdi-heart-outline"></i>
            </span>
          </p>
        </div>
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

<style scoped lang="scss">
.creator-picture {
  height: 8vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}

.post-img {
  height: 30vh;
  width: 60vh;
  object-fit: cover;
  position: relative;
}
</style>
