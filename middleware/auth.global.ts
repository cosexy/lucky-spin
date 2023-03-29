export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const path = to.path

  if(/^\/admin/.test(path)) {
    if (path === '/admin' && authStore.token) {
      return navigateTo('/admin/users')
    }

    if (!authStore.token && path !== '/admin') {
        return navigateTo('/admin')
    }

  }
})
