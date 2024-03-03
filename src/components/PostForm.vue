<template>
    <div class="col-12 border border-secondary m-3 py-3 ps-0 rounded-3 shadow">
        <section class="row">
            <div class="col-1">
                <img :src="account.picture" :alt="account.name" class="creator-picture m-2 me-2 d-md-block d-none">
            </div>

            <div class="col-md-10 ms-1">
                <form @submit.prevent="postNewPost()">
                    <div class="form-floating flex-fill">
                        <textarea v-model="formData.body" class="form-control w-100 h-100  flex-fill ms-1"
                            placeholder="What's on your mind?" id="formImgUrl"
                            style="height: 100px; width: 100vh"></textarea>
                        <label for="floatingTextarea2"></label>
                    </div>

                    <div class="d-flex justify-content-between ms-0 ">
                        <div class="d-flex align-items-center">
                            <i class="mdi mdi-camera fs-3 me-1"></i>
                            <input v-model="formData.imgUrl" type="url" name="imgUrl" id="formImgUrl"
                                placeholder="Image URL" class="rounded-2">
                        </div>
                        <!-- TODO make this a POST button -->
                        <button type="submit" role="button" class="d-flex align-items-center border-0">
                            <p class="mt-3 me-1">Post!
                            </p>
                            <i class="mdi mdi-send fs-3"></i>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>


<script>
import { computed, ref } from 'vue';
import { Account } from '../models/Account.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';

export default {
    props: {
        account: { type: Account, required: true }
    },

    setup() {
        const formData = ref({})


        return {
            formData,
            account: computed(() => AppState.account),

            async postNewPost() {
                try {
                    logger.log('postNewPost', formData.value)
                    await postsService.postNewPost(formData.value)
                    formData.value = {}
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
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