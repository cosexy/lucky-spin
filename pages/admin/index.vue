<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <a href="#" class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="mr-2 h-8 w-8" src="/images/logo.png" alt="logo">
        Receiptor
      </a>
      <div class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Đăng nhập vào tài khoản của bạn
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
            <div>
              <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Email ID
              </label>
              <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                  required=""
              >
            </div>
            <div>
              <label for="password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Mật khẩu
              </label>
              <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
              >
            </div>
            <div class="flex items-center justify-center">
              <a href="https://www.facebook.com/guen.dev/" target="_blank" class="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline">Forgot password?</a>
            </div>
            <button type="submit" class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4">
              Đăng Nhập
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Bạn chưa có tài khoản?
              <a href="https://www.facebook.com/guen.dev/" target="_blank" class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
                Đăng ký
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const form = ref({
  email: '',
  password: ''
})
const submitForm = async () => {
  try {
    //
    if (form.value.email === 'admin@guen.dev' && form.value.password === 'admin') {
      await $fetch('/api/auth', {
        method: 'POST',
        body: {
          token: '_admin_ok'
        }
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      window.alert('Tài khoản hoặc mật khẩu không chính xác')
    }
  } catch (error) {
    window.alert('Đăng nhập thất bại')
  }
}
</script>

<style scoped></style>
