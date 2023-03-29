<template>
  <div>

    <admin-sidebar />

    <div class="p-4 sm:ml-64 bg-gray-600 min-h-screen">
      <client-only>
        <nuxt-page />
      </client-only>
    </div>

  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped></style>
