<template>
  <div v-if="history">
    <button
        v-if="spinAble"
        :disabled="spinning"
        @click="rotateWheel"
        class="transition text-sm font-semibold disabled:opacity-50 block py-3 bg-primary-500 text-white block w-full mt-8 rounded-full shadow-primary shadow-primary-300"
    >
      Xoay Ngay
    </button>

    <div v-else class="flex flex-col items-center mt-3">
      <div class="text-center">
        <p class="text-sm text-gray-500">Bạn đã quay và nhận được phần thưởng</p>
      </div>
      <div class="flex flex-col items-center mt-4">

        <div v-if="history.prize === 1" class="flex items-center">
          <div>
            <h3 class="text-lg font-semibold">Giải Nhất</h3>
            <p class="text-sm text-gray-500">
              80.000.000 VNĐ
            </p>
          </div>
        </div>

        <div v-else-if="history.prize === 2" class="flex items-center">
          <div>
            <h3 class="text-lg font-semibold">Giải Nhì</h3>
            <p class="text-sm text-gray-500">
              50.000.000 VNĐ
            </p>
          </div>
        </div>


        <div v-else-if="history.prize === 3" class="flex items-center">
          <img width="50" src="/images/iphone.png"  alt=""/>
          <div class="ml-5">
            <h3 class="text-lg font-semibold">Phần thưởng</h3>
            <p class="text-sm text-gray-500">iPhone 14 Pro Max</p>
          </div>
        </div>

        <div v-else-if="history.prize === 4" class="flex items-center">
          <img width="50" src="/images/cooker.png"  alt=""/>
          <div class="ml-5">
            <h3 class="text-lg font-semibold">Phần thưởng</h3>
            <p class="text-sm text-gray-500">Nồi cơm điện</p>
          </div>
        </div>

        <div v-else class="flex items-center">
          <div>
            <h3 class="text-lg font-semibold">Phần thưởng</h3>
            <p class="text-sm text-gray-500">Giải may mắn</p>
          </div>
        </div>


      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import anime from "animejs"
import {getAuth} from "firebase/auth"
import {dbSet} from "#imports";
import {ModalEntity} from "~/entities/modal.entity";
import {PrizeEntity} from "~/entities/prize.entity";
const { user } = useAuth(getAuth())

const history = useRTDB<PrizeEntity>(dbRef(getDatabase(),  `results/${user.value?.uid}`))
const spinAble = computed(() => !history.value?.spined)

const [spinning, setSpinning] = useToggle(false)
const bus = useEventBus<ModalEntity<number>>('modal')

/**
 * Rotate the wheel
 * rotate 360deg*n + 324deg
 * n is interger and between 4 and 7
 */
const rotateWheel = () => {
  setSpinning(true)

  const wheel = document.querySelector('.wheel');
  const n = Math.floor(Math.random() * 4) + 4

  const prize = history.value?.prize || 5
  // devide 360deg to 5 parts and spin to center of part-nth
  const degBase = 360 / 5
  const deg = degBase * prize - degBase / 2

  const afterSpin = async () => {
    setSpinning(false)
    await dbSet(dbRef(getDatabase(), `results/${user.value?.uid}/spined`), true)
    bus.emit({
      name: 'successful',
      data: prize
    })
  }

  anime({
    targets: wheel,
    rotate: [0, 360 * n + deg],
    duration: 3000,
    easing: 'easeOutExpo',
    complete: () => afterSpin()
  })
}
</script>

<style scoped></style>
