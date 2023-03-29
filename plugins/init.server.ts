import { getCookie } from 'h3'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()

  const token = getCookie(useRequestEvent(), '_token')

  if (token && process.server) {
    authStore.token = token
  }

  nuxtApp.hooks.hook('app:created', async () => {
    //
  })
})
