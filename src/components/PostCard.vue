<template>
    <div class=" d-flex justify-content-between">

        <div class="d-flex align-items-center">
            <!-- TODO create router-link to route to profile page -->
            <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                <img :src="post.creator.picture" :alt="post.creator.name" class="creator-picture">
            </router-link>
            <div class="ms-3">
                <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                    <p class="text-dark fs-6 fw-bold pb-0 mb-0">{{ post.creator.name }}</p>
                </router-link>
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
</template>


<script>
import { computed } from 'vue';
import { Account } from '../models/Account.js';
import { Post } from '../models/Post.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';

export default {
    props: {
        post: { type: Post, required: true }

    },
    setup() {
        return {
            account: computed(() => AppState.account)

        }
    }
}
</script>


<style lang="scss" scoped>
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
