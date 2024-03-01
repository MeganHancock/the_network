<template>
  <div class="container">
    <section class="row">
      <div v-for="post in posts" class="col-6 border border-secondary m-3 px-3 pt-3 pb-0 rounded-3 shadow">

        <PostCard :post="post" />

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
import PostCard from '../components/PostCard.vue';

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      // logger.log('home page mounted')
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss"></style>
