<template>
  <div class="container">

    <!-- NOTE form component section -->
    <section class="row" :class="{ hidden: !account.id }">
      <div class="col-10 border border-secondary m-3 p-3 rounded-3 shadow">
        <section class="row">
          <div class="col-1">
            <img :src="account.picture" :alt="account.name" class="creator-picture me-2">
          </div>

          <div class="col-11">
            <form>
              <div class="form-floating flex-fill">
                <textarea class="form-control w-100 h-100  flex-fill" placeholder="Leave a comment here" id="formImgUrl"
                  style="height: 100px; width: 100vh"></textarea>
                <label for="floatingTextarea2">Comments</label>
              </div>

              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <i class="mdi mdi-camera fs-3 me-1"></i>
                  <input type="url" name="imgUrl" id="formImgUrl" placeholder="Image URL" class="rounded-2">
                </div>
                <!-- TODO make this a POST button -->
                <div class="d-flex align-items-center">
                  <p class="mt-3">Post!
                  </p>
                  <i class="mdi mdi-send fs-3"></i>
                </div>


              </div>
            </form>
          </div>
        </section>
      </div>
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
  components: { PostCard }
}
</script>

<style scoped lang="scss">
.hidden {
  display: none;
}

.creator-picture {
  height: 6vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}

textarea {
  width: 100% !important;
  -webkit-box-sizing: border-box;
  -box-sizing: border-box;
  box-sizing: border-box;
}

#formImgUrl {
  width: 40vw;
}
</style>
