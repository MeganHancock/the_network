<template>
    <div class="container ">
        <section v-if="profile && !searchQuery" :key="profile.id" class="row ">
            <div class="col-12 border border-secondary me-1 m-3 px-0 pt-0 pb-0 rounded-3 shadow">
                <img :src="profile.coverImg" alt="" class="cover-img w-100 rounded-top-3">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <img :src="profile.picture" :alt="profile.name" class=" ms-5 profile-picture">
                        <div class="d-flex align-items-center">
                            <i v-if="profile.graduated" class="mdi mdi-school display-5 m-2"></i>
                            <p v-if="profile.class" class="m-1 fw-bold">Class of {{ profile.class }}</p>
                        </div>
                    </div>
                    <div class="m-2 display-5">
                        <!-- TODO make these buttons -->
                        <a :href="profile.linkedin" v-if="profile.linkedin" class="mdi  mdi-linkedin me-2"></a>
                        <a :href="profile.github" v-if="profile.github" class="mdi  mdi-github me-2"></a>
                        <a :href="profile.resume" v-if="profile.resume" class="mdi  mdi-file-document-outline"></a>
                    </div>

                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="ms-3">
                        <h1 class="mt-2">{{ profile.name }}</h1>
                        <p class="lighter">Member since {{ profile.memberSince }}</p>
                        <p>{{ profile.bio }}</p>
                    </div>



                    <!-- TODO make this an edit profile button -->

                    <button v-if="account.id && account.id == profile.id" type="button" class="border-0 m-1"
                        data-bs-toggle="modal" data-bs-target="#modal">
                        <i class="mdi mdi-account-edit display-3" title="Edit Your Profile" role="button"></i>
                    </button>

                    <EditProfileModal :account="account.id" />

                </div>

            </div>

        </section>




        <section class="row justify-content-between p-3">

            <!-- <div v-for="post in posts" :key="post.id"
                class="col-md-8 border border-secondary m-3 px-3 pt-3 pb-0 rounded-3 shadow">
                <PostCard :post="post" />
            </div> -->

            <div class="col-md-8 ms-md-4">
                <section v-for=" post  in  posts "  class="row">
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

    

    <!-- <RouterLink :to="{query: {page: currentPage - 1}}" :class="{disabled: currentPage == 1}">
    <button class="" :disabled="currentPage == 1">
      <i class="mdi mdi-arrow-left">Previous Page</i>
    </button>
  </RouterLink> -->

    <!-- <RouterLink :to="{query: {page: currentPage + 1}}" :class="{disabled: currentPage == totalPages}">
    <button class="" :disabled="currentPage == totalPages">
        Next Page<i class="mdi mdi-arrow-right"></i>
    </button>
  </RouterLink> -->


  <section class="row text-center ">
    <div class="col-12">
      <button :disabled="currentPage == 1" class="me-2" @click="changePage(currentPage - 1, profile.id)" ><i class="mdi mdi-arrow-left"></i> Previous Page</button>
      <button :disabled="currentPage == totalPages" @click="changePage(currentPage + 1, profile.id)" >Next Page<i class="mdi mdi-arrow-right"></i> </button>
    </div>
  </section>
</div>
</template>


<script>
import { RouterLink, useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted, watch } from 'vue';
import { profileService } from '../services/ProfileService.js';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService.js';
import EditProfileModal from '../components/EditProfileModal.vue';
import AdComponent from '../components/AdComponent.vue';
import { adsService } from '../services/AdsService.js';

export default {
    setup() {
        const route = useRoute();


        async function getProfileById() {
            try {
                const profileId = route.params.profileId;
                // logger.log('id frm route param', profileId)
                await profileService.getProfileById(profileId);
            }
            catch (error) {
                Pop.error(error);
            }
        }

        async function getPostsByCreatorId() {
            try {
                const profileId = route.params.profileId;
                await postsService.getPostsByCreatorId(profileId)
            } catch (error) {
                Pop.error(error)
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
            profileService.clearAppState()
            getProfileById();
            getPostsByCreatorId();
            getAds();
        });
        return {
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account),
            profile: computed(() => AppState.activeProfile),
            ads: computed(() => AppState.ads),
            searchQuery: computed(()=> AppState.searchQuery),
            currentPage: computed(() => AppState.currentPage),
            totalPages: computed(() => AppState.totalPages),
            
            async changePage(pageNumber, profileId){
        try{
                logger.log(pageNumber, profileId) 
            await postsService.changePageOnProfile(pageNumber, profileId)
            } catch (error) {
            Pop.error(error)
          }
        }


        };
    },
    components: { PostCard, EditProfileModal, AdComponent, RouterLink }
}
</script>
<style lang="scss" scoped>
.cover-img {
    height: 30vh;
    width: 60vh;
    object-fit: cover;
    position: relative;
}

.profile-picture {

    height: 15vh;
    width: 15vh;
    object-fit: cover;
    border-radius: 50%;
    // position: absolute;
    transform: translateY(-8vh);
    margin-bottom: -8vh;
}

.disabled{
  cursor: not-allowed;
  pointer-events: none;
}
</style>