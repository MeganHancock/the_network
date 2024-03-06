<template>
  <div class="container">

    <!-- NOTE form component section -->
    <section class="row" :class="{ hidden: !account.id }">

      <PostForm :account="account" />

    </section>

    <!-- NOTE post card component section -->
    <section class="row justify-content-between p-3">

      <div class="col-md-8 ms-md-4">
        <section v-for=" post  in  posts " :key="post.id" class="row">
          <div class="col-12 border border-secondary px-3 pt-3 pb-0 rounded-3 shadow mb-4">
            <PostCard :post="post" />

          </div>
        </section>
      </div>

      <div class="col-md-3 d-md-block d-none d-flex justify-content-center">
        <section class="row justify-content-center">
          <div v-for="ad in ads" :key="ad.id" class="col-12 mb-4">
            <AdComponent :ad="ad" />
            <!-- <img :src="ad.tall" :alt="ad.title" class="img-fluid rounded-3 shadow border border-secondary w-100"> -->
          </div>

        </section>
      </div>




    </section>

  <section class="row text-center ">
    <div class="col-12">
      <button :disabled="currentPage == 1" class="me-2 border-0" @click="changePage(currentPage - 1)" ><i class="mdi mdi-arrow-left"></i> Previous Page</button>
      <button :disabled="currentPage == totalPages"  class="border-0" @click="changePage(currentPage + 1)" >Next Page<i class="mdi mdi-arrow-right"></i> </button>
    </div>
  </section>

  <!-- <RouterLink :to="{query: {page: currentPage - 1}}" :class="{disabled: currentPage == 1}">
    <button class="" :disabled="currentPage == 1">
      <i class="mdi mdi-arrow-left">Previous Page</i>
    </button>
  </RouterLink>

    <RouterLink :to="{query: {page: currentPage + 1}}" :class="{disabled: currentPage == totalPages}">
    <button class="" :disabled="currentPage == totalPages">
        Next Page<i class="mdi mdi-arrow-right"></i>
    </button>
  </RouterLink> -->
</div>


</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { AppState } from "../AppState.js"
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';
import AdComponent from '../components/AdComponent.vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

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

      // const route = useRoute()

      // watch(route, ()=>{
      //   const pageNumber = route.query.page
      //   logger.log('route changed!', pageNumber)
      //   if(!pageNumber){
      //     getPosts()
      //   } else {
      //     changePage(pageNumber)
      //   }
      // },
      // {immediate: true})

      



    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),


      searchQuery: computed(()=> AppState.searchQuery),
      currentPage: computed(() => AppState.currentPage),
      totalPages: computed(() => AppState.totalPages),

// changePage
async changePage(pageNumber){
        try {
          logger.log('changing page')
          await postsService.changePage(pageNumber)
          } catch (error) {
          Pop.error(error)
        }
      }

      

    };
  },
  components: { PostCard },
  components: { AdComponent },
  components: { PostForm, RouterLink }
}
</script>

<style scoped lang="scss">
.hidden {
  display: none;
}
</style>
