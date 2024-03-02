<template>
  <div class="container">

    <!-- NOTE form component section -->
    <section class="row" :class="{ hidden: !account.id }">

      <PostForm :account="account" />

    </section>

    <!-- NOTE post card component section -->
    <section class="row">
      <div v-for=" post  in  posts " class="col-md-6 border border-secondary m-3 px-3 pt-3 pb-0 rounded-3 shadow">
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
import PostForm from '../components/PostForm.vue';

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
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
    };
  },
  components: { PostCard },
  components: { PostForm }
}
</script>

<style scoped lang="scss">
.hidden {
  display: none;
}
</style>
