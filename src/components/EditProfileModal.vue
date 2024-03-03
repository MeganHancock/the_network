<template>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="container">
                        <section class="row">
                            <div class="col-12">
                                <!-- <form @submit.prevent="updateProfile()"> -->
                                <!-- v-model="editableProfileData.name" -->
                                <form>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Display Name</label>
                                        <input type="text" class="form-control" id="profileName"
                                            aria-describedby="emailHelp">
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Biography</label>
                                        <textarea type="text" class="form-control" id="profileName"
                                            aria-describedby="emailHelp"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <i class="mdi mdi-camera fs-3 me-1"></i>
                                        <label for="exampleInputPassword1" class="form-label">Profile Icon URL</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1">
                                    </div>

                                    <div class="mb-3">
                                        <i class="mdi mdi-camera fs-3 me-1"></i>
                                        <label for="exampleInputPassword1" class="form-label">Cover Photo URL</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1">
                                    </div>


                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Share your LinkedIn
                                            link:</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1">
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Share your GitHub
                                            link:</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1">
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Share your Resume:</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1">
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">What class are/ were you a
                                            part of?</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1">
                                    </div>

                                    <div class="d-flex justify-content-between">
                                        <div class="mb-3 form-check">
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                            <label class="form-check-label" for="exampleCheck1">Have you Graduated?</label>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>

                    props: {
                    blog: { type: Blog, required: true }
                    },









                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { Profile } from '../models/Profile.js';
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
    props: {
        profile: { type: Profile, required: true }
    },
    setup() {
        return {
            profile: computed(() => AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped></style>