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

        <div class="flex items-center">
          <div>
            <h3 class="text-lg font-semibold">Phần thưởng</h3>
            <p class="text-sm text-gray-500">
              {{ prizes[history.prize - 1] }}
            </p>
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
import {PrizeEntity, prizes} from "~/entities/prize.entity";
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

  const prize = history.value?.prize || prizes.length
  // devide 360deg to 5 parts and spin to center of part-nth
  const degBase = 360 / prizes.length
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
