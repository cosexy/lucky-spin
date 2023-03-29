<template>
  <modal-base title="" event="successful" @opened="fireParty">
    <template #header>
      <img width="150" src="/images/logo.jpg"  alt=""/>
    </template>

    <template #default="{ data }">
      <div class="font-semibold mt-4 text-center border-b border-gray-200 pb-4">Chúc mừng bạn đã phận được</div>

      <div class="flex items-center mt-4 flex-col pb-5">

        <div class="font-semibold">
          {{ prizes[data - 1] }}
        </div>

        <p class="text-center text-sm mt-4 text-gray-500">
          Bạn vui lòng chụp lại phần quà và liên hệ với người hướng dẫn nhận thưởng
        </p>

      </div>

    </template>

  </modal-base>
</template>

<script lang="ts" setup>
import party from "party-js"
import {prizes} from "../../entities/prize.entity";

const fireParty = (data: number) => {
  party.confetti(party.Rect.fromScreen(), {
    count: party.variation.range(100, 120)
  })

  console.log(data)
}
</script>

<style scoped></style>
