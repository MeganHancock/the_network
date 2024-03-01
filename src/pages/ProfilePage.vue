<template>
    <div class="container">
        <section v-if="profile" class="row">
            <div class="col-12 border border-secondary m-3 px-3 pt-3 pb-0 rounded-3 shadow">
                <img :src="profile.coverImg" alt="" class="cover-img w-100">
                <img :src="profile.picture" :alt="profile.name" class=" ms-5 profile-picture">
                <h1 class="mt-2">{{ profile.name }}</h1>
                <p>{{ profile.bio }}</p>
            </div>

        </section>

        <section class="row ">
            <div class="col-md-8 border border-secondary m-3 px-3 pt-3 pb-0 rounded-3 shadow">
                <div v-for="post in posts" :key="post.id">
                    <PostCard :post="post" />
                </div>
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
            getProfileById();
            getPostsByCreatorId();
        });
        return {
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts)
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