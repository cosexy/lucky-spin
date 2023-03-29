<template>
  <div
      class="z-50 fixed inset-0 flex justify-center items-center transition"
      :class="{
        'opacity-0 pointer-events-none invisible': !_visible
      }"
  >

    <a href="javascript:void(0)" class="absolute inset-0 bg-[#00000030]" @click="() => toggleVisible()"></a>

    <div class="max-w-[24rem] w-full px-4 shadow-primary bg-white py-3 z-10 border-t-4 border-primary-600 relative">

      <div class="flex justify-between text-gray-900">
        <div class="_title font-semibold text-[18px]">
          {{ title }}
          <slot name="header"></slot>
        </div>
        <button class="text-[20px]" @click="() => toggleVisible()">
          <Icon name="ic:round-close" />
        </button>
      </div>

      <slot :data="data" :visible="_visible" :toggle="toggleVisible"></slot>

    </div>

  </div>
</template>

<script lang="ts" setup>
import {ModalEntity} from "~/entities/modal.entity";

const props = withDefaults(defineProps<{
  visible?: boolean
  title: string
  event: string
}>(), {
  visible: false
})

const data = ref()

const [_visible, toggleVisible] = useToggle(props.visible)

const bus = useEventBus<string|ModalEntity>('modal')

// define emits
const edmits = defineEmits<{
  (event: 'opened', data?: any): void
  (event: 'closed'): void
}>()

watch(_visible, (value) => {
  if (value) {
    edmits('opened', data.value)
  } else {
    edmits('closed')
  }
})

const listener = (event: string|ModalEntity) => {

  if (typeof event === 'string') {
    if (event === props.event) {
      toggleVisible()
    }
  } else {
    if (event.name === props.event) {
      data.value = event.data
      toggleVisible()
    }
  }
}
bus.on(listener)

defineExpose({
  toggleVisible
})
</script>

<style scoped></style>
