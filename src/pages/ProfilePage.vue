<template>
    <div class="container ">
        <section v-if="profile" class="row ">
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
                        <p>{{ profile.bio }}</p>
                    </div>



                    <!-- TODO make this an edit profile button -->
                    <button v-if="account.id && account.id == profile.id" type="button" data-bs-toggle="modal"
                        data-bs-target="#modal" class="border-0 m-1">
                        <i class="mdi mdi-account-edit display-3" title="Edit Your Profile" role="button"></i>
                    </button>





                </div>

            </div>

        </section>

        <section class="row ">
            <div v-for="post in posts" :key="post.id"
                class="col-md-8 border border-secondary m-3 px-3 pt-3 pb-0 rounded-3 shadow">
                <PostCard :post="post" />
            </div>
        </section>

    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { profileService } from '../services/ProfileService.js';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService.js';

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



        onMounted(() => {
            profileService.clearAppState()
            getProfileById();
            getPostsByCreatorId();
        });
        return {
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account)
        };
    },
    components: { PostCard }
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
</style>