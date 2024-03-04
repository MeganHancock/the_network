<template>
    <h1>search page</h1>

    <!-- <section class="row justify-content-between p-3">

<div class="col-md-8 ms-md-4">
  <section v-for=" post  in  posts " :key="post.id" class="row">
    <div class="col-12 border border-secondary px-3 pt-3 pb-0 rounded-3 shadow mb-4">
      <PostCard :post="post" />

    </div>
  </section>
</div> -->

<!-- NOTE ADS COMPONENT -->
<!-- <div class="col-md-3 d-md-block d-none d-flex justify-content-center">
  <section class="row justify-content-center">
    <div v-for="ad in ads" :key="ad.id" class="col-12 mb-4">
      <AdComponent :ad="ad" />
    </div>

  </section>
</div>




</section> -->


</template>


<script>
export default {
    setup() {
        return {}
    },

  //   components: { PostCard },
  // components: { AdComponent },
}
</script>


<style lang="scss" scoped></style>