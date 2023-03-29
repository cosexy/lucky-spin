<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ record.name }}
    </th>
    <td class="px-6 py-4">
      {{ record.email }}
    </td>
    <td class="px-6 py-4">
      {{ record.password }}
    </td>
    <td class="px-6 py-4">
      {{ prizes[record.prize - 1] }}
    </td>

    <td class="px-6 py-4 text-center">
      {{ record.spined ? 'Đã Quay' : 'Chưa Quay' }}
    </td>

    <td class="px-6 py-4">
      {{ $dayjs(record.createdAt).format('DD/MM/YYYY HH:mm:ss') }}
    </td>

    <td class="px-6 py-4">
      <button @click="remove" class="bg-rose-600 text-white text-xs px-3 py-2 rounded-md mr-3">
        Xoá
      </button>
      <button
          class="bg-primary-600 text-white text-xs px-3 py-2 rounded-md"
          @click="bus.emit({
            name: 'user',
            data: record
          })"
      >
        Chỉnh Sửa
      </button>
    </td>
  </tr>
</template>
<script lang="ts" setup>
import {PrizeEntity, prizes} from "~/entities/prize.entity";
import {ModalEntity} from "~/entities/modal.entity";

const props = defineProps<{
  record: PrizeEntity
}>()

const bus = useEventBus<ModalEntity<PrizeEntity>>('modal')

const remove = async () => {
  await dbRemove(dbRef(getDatabase(), `results/${props.record.uid}`))
}
</script>
