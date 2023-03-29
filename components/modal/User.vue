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

            <div class="radio_item">
              <input v-model="form.prize" type="radio" id="radio1" name="group-radio" :value="1" />
              <label for="radio1">
                Giải nhất
              </label>
            </div>


            <div class="radio_item">
              <input v-model="form.prize" type="radio" id="radio2" name="group-radio" :value="2" />
              <label for="radio2">
                Giải nhì
              </label>
            </div>


            <div class="radio_item">
              <input v-model="form.prize" type="radio" id="radio3" name="group-radio" :value="3" />
              <label for="radio3">
                iPhone 14
              </label>
            </div>

            <div class="radio_item">
              <input v-model="form.prize" type="radio" id="radio4" name="group-radio" :value="4" />
              <label for="radio4">
                Nồi cơm
              </label>
            </div>

            <div class="radio_item">
              <input v-model="form.prize" type="radio" id="radio5" name="group-radio" :value="5" />
              <label for="radio5">
                May mắn
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
              <input v-model="form.spined" type="radio" id="radio6" name="group-radio" :value="true" />
              <label for="radio6">
                Đã quay
              </label>
            </div>

            <div class="radio_item">
              <input v-model="form.spined" type="radio" id="radio7" name="group-radio" :value="false" />
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
import {PrizeEntity} from "~/entities/prize.entity"
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
  width: 33.333333%;
  margin-bottom: 5px;
}
</style>
