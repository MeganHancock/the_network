<template>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Hello, {{ profile.name }}! Update your profile here:
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="container">
                        <section class="row">
                            <div class="col-12">


                                <form @submit.prevent="updateProfile()">
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Display Name</label>
                                        <input v-model="editableProfileData.name" type="text" class="form-control" id="name"
                                            required aria-describedby="emailHelp">
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Biography</label>
                                        <textarea v-model="editableProfileData.bio" type="text" class="form-control"
                                            id="bio" aria-describedby="emailHelp"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <i class="mdi mdi-camera fs-3 me-1"></i>
                                        <label for="exampleInputPassword1" class="form-label">Profile Icon URL</label>
                                        <input v-model="editableProfileData.picture" type="text" class="form-control"
                                            id="picture">
                                    </div>

                                    <div class="mb-3">
                                        <i class="mdi mdi-camera fs-3 me-1"></i>
                                        <label for="exampleInputPassword1" class="form-label">Cover Photo URL</label>
                                        <input v-model="editableProfileData.coverImg" type="text" class="form-control"
                                            id="coverImg">
                                    </div>


                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Share your LinkedIn
                                            link:</label>
                                        <input v-model="editableProfileData.linkedin" type="text" class="form-control"
                                            id="linkedin">
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Share your GitHub
                                            link:</label>
                                        <input v-model="editableProfileData.github" type="text" class="form-control"
                                            id="exampleInputPassword1">
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Share your Resume:</label>
                                        <input v-model="editableProfileData.resume" type="text" class="form-control"
                                            id="exampleInputPassword1">
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">What class are you a
                                            part of?</label>
                                        <input v-model="editableProfileData.class" type="text" class="form-control"
                                            id="exampleInputPassword1">
                                    </div>

                                    <div class="d-flex justify-content-between">
                                        <div class="mb-3 form-check">
                                            <input v-model="editableProfileData.graduated" type="checkbox"
                                                class="form-check-input" id="exampleCheck1">
                                            <label class="form-check-label" for="exampleCheck1">Have you Graduated?</label>
                                        </div>
                                        <div>
                                            <button type="button" class="btn btn-secondary me-1"
                                                data-bs-dismiss="modal">Cancel</button>
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>


                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { Profile } from '../models/Profile.js';
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profileService } from '../services/ProfileService.js';
import { useRoute, useRouter } from 'vue-router';

export default {

    props: {
        profile: { type: Profile, required: true }
    },


    setup() {
        const router = useRouter()

        const profile = computed(() => AppState.account)
        const editableProfileData = ref({})

        watch(profile, () => { editableProfileData.value = { ...profile.value } }, { immediate: true })


        return {
            editableProfileData,
            profile,
            router,
            // profile: computed(() => AppState.account),

            async updateProfile() {
                try {
                    logger.log('submitting form', editableProfileData.value)
                    await profileService.updateProfile(editableProfileData.value)
                    // router.push({ name: 'ProfilePage' })

                } catch (error) {
                    Pop.error(error)
                }

            }
        }
    }
}
</script>


<style lang="scss" scoped></style>