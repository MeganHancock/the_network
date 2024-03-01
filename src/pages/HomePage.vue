<template></template>

<script>
import { onMounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

export default {
  setup() {

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      logger.log('home page mounted')
      getPosts()
    })

    return {}
  }
}
</script>

<style scoped lang="scss"></style>
