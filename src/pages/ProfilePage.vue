<template>
    <h1>Profile page</h1>
</template>


<script>
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { onMounted } from 'vue';
import { profileService } from '../services/ProfileService.js';

export default {
    setup() {
        const route = useRoute()

        async function getProfileById() {
            try {
                const profileId = route.params.profileId
                // logger.log('id frm route param', profileId)
                await profileService.getProfileById(profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        onMounted(() => {
            getProfileById()
        })

        return {

        }
    }
}
</script>
<style lang="scss" scoped></style>