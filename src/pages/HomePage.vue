<template>
  <div class="container">

    <!-- NOTE form component section -->
    <section class="row" :class="{ hidden: !account.id }">

      <PostForm :account="account" />

    </section>

    <!-- NOTE post card component section -->
    <section class="row justify-content-between">

      <div class="col-md-8 me-1">
        <section v-for=" post  in  posts " class="row">
          <div class="col-12 border border-secondary m-3 px-3 pt-3 pb-0 rounded-3 shadow">
            <PostCard :post="post" />

          </div>
        </section>
      </div>

      <div class="col-md-3 d-md-block d-none d-flex justify-content-center">
        <section class="row justify-content-center">
          <div v-for="ad in ads" class="col-12  m-3 px-3 pt-3 pb-0 ">
            <img :src="ad.tall" :alt="ad.title" class="img-fluid rounded-3">
          </div>

        </section>
      </div>




    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';
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

    async function getAds() {
      try {
        await adsService.getAds();
      }
      catch (error) {
        Pop.error(error);
      }
    }



    onMounted(() => {
      // logger.log('home page mounted')
      getPosts();
      getAds();
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads)
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
