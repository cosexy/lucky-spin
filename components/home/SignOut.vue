<template>
  <button v-if="isAuthenticated" @click="signOutHandle" class="absolute top-4 right-4">
    <Icon name="ic:round-arrow-forward" />
  </button>
</template>

<script lang="ts" setup>
import { getAuth, signOut } from "firebase/auth"
import {getApp} from "@firebase/app";

const { isAuthenticated } = useAuth(getAuth())

const signOutHandle = () => {
  signOut(getAuth(getApp()))
}
</script>

<style scoped></style>
