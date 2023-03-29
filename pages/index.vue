<template>
  <div id="home" class="h-screen bg-primary-50">

    <div id="content" class="w-full max-w-md h-full overflow-y-auto shadow-primary mx-auto bg-white pt-12 relative">

      <client-only>
        <home-sign-out />
      </client-only>


      <div class="px-14">
        <img src="/images/banner.png" alt="" />
      </div>

      <client-only>
        <home-spin />
      </client-only>
    </div>


    <client-only>
      <modal-auth />
      <modal-successful />
    </client-only>

    <home-audio />


  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
#home {
  background-image: url("/images/content.jpg");
  background-size: cover;
  background-position: center;
}

#content {
  background: url(/images/bg.jpg) center;
  background-size: cover;
}
</style>
