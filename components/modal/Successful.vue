<template>
  <modal-base title="" event="successful" @opened="fireParty">
    <template #header>
      <img width="150" src="/images/logo.jpg"  alt=""/>
    </template>

    <template #default="{ data }">
      <div class="font-semibold mt-4 text-center border-b border-gray-200 pb-4">Chúc mừng bạn đã phận được</div>

      <div class="flex items-center mt-4 flex-col pb-5">

        <template v-if="data === 1">
          <div class="font-semibold">Giải Nhất</div>
          <div class="mt-3 font-semibold">
            80.000.000 VNĐ
          </div>
        </template>

        <template v-else-if="data === 2">
          <div class="font-semibold">Giải Nhì</div>
          <div class="mt-3 font-semibold">
            50.000.000 VNĐ
          </div>
        </template>

        <template v-else-if="data === 3">
          <img width="100" src="/images/iphone.png"  alt=""/>

          <div class="mt-3 font-semibold">iPhone 14 Pro Max</div>
        </template>

        <template v-else-if="data === 4">
          <img width="100" src="/images/cooker.png"  alt=""/>

          <div class="mt-3 font-semibold">Nồi cơm điện</div>
        </template>

        <template v-else>
          <div class="font-semibold">
            Giải May Mắn
          </div>
        </template>

        <p class="text-center text-sm mt-4 text-gray-500">
          Bạn vui lòng chụp lại phần quà và liên hệ với người hướng dẫn nhận thưởng
        </p>

      </div>

    </template>

  </modal-base>
</template>

<script lang="ts" setup>
import party from "party-js"

const fireParty = (data: number) => {
  party.confetti(party.Rect.fromScreen(), {
    count: party.variation.range(100, 120)
  })

  console.log(data)
}
</script>

<style scoped></style>
