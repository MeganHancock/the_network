<template>
    <img :src="ad.tall" :alt="ad.title" class="img-fluid rounded-3 shadow border border-secondary w-100">
</template>


<script>
import { onMounted, computed } from 'vue';
import { Ad } from '../models/Ad.js';
import { adsService } from '../services/AdsService.js';

export default {
    props: {
        ad: { type: Ad, required: true }
    },


    setup() {
        async function getAds() {
            try {
                await adsService.getAds();
            }
            catch (error) {
                Pop.error(error);
            }
        }

        onMounted(() => {
            getAds()
        })
        return {
            ads: computed(() => AppState.ads)


        }
    }
}
</script>


<style lang="scss" scoped></style>