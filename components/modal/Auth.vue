<template>
  <modal-base ref="modalRef" event="auth" title="">

    <template #header>
      <img width="150" src="/images/logo.jpg"  alt=""/>
    </template>

    <template #default>
      <form @submit.prevent="submit" class="space-y-4 md:space-y-6 pt-4">
        <div v-if="!isLogin">
          <label for="name" class="mb-2 block text-sm font-medium">
            Họ và Tên
          </label>
          <input
              id="name"
              v-model="form.name"
              name="email"
              class="w-full focus:outline-0 bg-gray-100 px-5 py-3 rounded-full sm:text-sm"
              placeholder="Nhập họ và tên"
              required=""
          >
        </div>

        <div>
          <label for="password" class="mb-2 block text-sm font-medium">
            Số điện thoại
          </label>
          <input
              id="password"
              v-model="form.password"
              name="password"
              placeholder="Nhập số điện thoại"
              class="w-full focus:outline-0 bg-gray-100 px-5 py-3 rounded-full sm:text-sm"
              required=""
          >
        </div>

        <div>
          <label for="email" class="mb-2 block text-sm font-medium">
            Tên tài khoản đầu tư
          </label>
          <input
              id="email"
              v-model="form.email"
              name="email"
              class="w-full focus:outline-0 bg-gray-100 px-5 py-3 rounded-full sm:text-sm"
              placeholder="Nhập tên tài khoản đầu tư"
              required=""
          >
        </div>

        <p v-if="message" class="text-xs text-center text-rose-500">
          {{ message }}
        </p>

        <button :disabled="loading" type="submit" class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-full px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 transition disabled:opacity-50">
          Xác Nhận
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Bạn {{ isLogin ? 'chưa' : 'đã' }} có tài khoản?
          <a @click.prevent="() => toLogin()" href="javascript:void(0)" target="_blank" class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
            {{ isLogin ? 'Đăng Ký' : 'Đăng Nhập' }}
          </a>
        </p>
      </form>
    </template>

  </modal-base>
</template>

<script lang="ts" setup>

import {FirebaseError} from "@firebase/util";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {ModalBase} from "#components";
import {dbSet} from "#imports";
import {prizes} from "~/entities/prize.entity";

const [isLogin, toLogin] = useToggle(false)

const form = ref({
  name: '',
  email: '',
  password: ''
})

const message = refAutoReset('', 3000)

const modalRef = ref<InstanceType<typeof ModalBase>>()

const errorExtracted =  (_e: FirebaseError) => {
  console.log(_e)
  if (_e.code === AuthErrorCodes.USER_DELETED) {
    message.value = 'Nhà đầu tư không tồn tại'
  } else if (_e.code === AuthErrorCodes.USER_DISABLED) {
    message.value = 'Nhà đầu tư đã bị khóa'
  } else if (_e.code === AuthErrorCodes.INVALID_PASSWORD) {
    message.value = 'Số điện thoại không chính xác'
  } else if (_e.code === AuthErrorCodes.INVALID_EMAIL) {
    message.value = 'Tên đăng nhập là đầu tư không hợp lệ'
  } else {
    message.value = 'Tham gia thất bại'
  }
}

const login = async () => {
  try {
    await signInWithEmailAndPassword(getAuth(), form.value.email + '@gmail.com', form.value.password)
    modalRef.value?.toggleVisible()
  } catch (e) {
    errorExtracted(e as FirebaseError)
  }
}

const register = async () =>
{
  try {
    const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        form.value.email + '@gmail.com',
        form.value.password
    )
    await updateProfile(getAuth().currentUser!, {
      displayName: form.value.name
    })

    await dbSet(dbRef(getDatabase(), `results/${user?.uid}`), {
      uid: user?.uid,
      prize: prizes.length,
      spined: false,
      ...form.value,
      createdAt: Date.now()
    })
    // write init data
    modalRef.value?.toggleVisible()
  } catch (e) {
    console.log(e)
    errorExtracted(e as FirebaseError)
    //
  }
}

const [loading, toggleLoading] = useToggle(false)
const submit = async () => {
  toggleLoading()
  if (isLogin.value) {
    await login()
  } else {
    await register()
  }
  toggleLoading()
}
</script>

<style scoped></style>
