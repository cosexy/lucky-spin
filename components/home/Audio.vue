<template>
  <div ref="refEl"></div>
</template>

<script lang="ts" setup>
const audio = ref<HTMLAudioElement>()

const refEl = ref<HTMLElement>()

onMounted(() => nextTick(() => {
  audio.value = new Audio('/audio/audio.mp3')
  // if (audio.value) {
  //   audio.value.loop = true
  //   document.addEventListener('click', () => {
  //     audio.value?.play()
  //   })
  // }
}))
</script>

<style scoped></style>
