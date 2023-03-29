<template>
  <modal-base ref="modalRef" title="" event="user" @opened="setupForm">
    <template #header>
      <img width="150" src="/images/logo.jpg"  alt=""/>
    </template>

    <template #default="{ data, visible, toggle }">
      <div v-if="visible" class="space-y-4 md:space-y-6 pt-5">
        <div>
          <label for="email" class="mb-2 block text-sm font-medium text-gray-900">
            Tên tài khoản đầu tư
          </label>
          <input
              id="email"
              v-model="form.email"
              name="email"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              readonly
          >
        </div>

        <div class="!-mb-3">
          <label for="email" class="mb-2 block text-sm font-medium text-gray-900">
            Phần thưởng
          </label>

          <div class="flex flex-wrap">

            <div
                v-for="(item, index) in prizes"
                :key="index"
                class="radio_item"
            >
              <input v-model="form.prize" type="radio" :id="`radio-${index}`" name="group-radio" :value="index + 1" />
              <label :for="`radio-${index}`" class="text-sm ml-1">
                {{ item }}
              </label>
            </div>

          </div>

        </div>

        <div class="!-mb-3">
          <label for="email" class="mb-2 block text-sm font-medium text-gray-900">
            Trạng thái
          </label>

          <div class="flex flex-wrap">

            <div class="radio_item">
              <input v-model="form.spined" type="radio" id="radio6" name="group-radio1" :value="true" />
              <label for="radio6">
                Đã quay
              </label>
            </div>

            <div class="radio_item">
              <input v-model="form.spined" type="radio" id="radio7" name="group-radio1" :value="false" />
              <label for="radio7">
                Chưa quay
              </label>
            </div>

          </div>

        </div>

        <div class="flex justify-end">
          <button @click="() => toggle()" class="bg-rose-600 text-white text-xs px-3 py-2 rounded-md mr-3">
            Huỷ
          </button>
          <button @click="updateUser" class="bg-primary-600 text-white text-xs px-3 py-2 rounded-md">
            Cập nhật
          </button>
        </div>

      </div>
    </template>

  </modal-base>
</template>

<script lang="ts" setup>
import {PrizeEntity, prizes} from "~/entities/prize.entity"
import {dbSet} from "#imports";
import {ModalBase} from "#components";

const form = ref<Partial<PrizeEntity>>({})

const setupForm = (data: PrizeEntity) => form.value = Object.assign({}, data)

const modalRef = ref<InstanceType<typeof ModalBase>>()
const updateUser = async () => {
  await dbSet(dbRef(getDatabase(), `results/${form.value?.uid}`), form.value)
  modalRef.value?.toggleVisible()
}
</script>

<style>
.radio_item {
  width: 50%;
  margin-bottom: 5px;
}
</style>
