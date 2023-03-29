<template>
  <div>

    <input class="bg-gray-800 px-3 py-2 text-sm w-[300px] focus:outline-0 text-white" type="text" v-model="keyword" placeholder="Nhập tên đăng nhập để tìm kiếm..." />

    <div class="relative overflow-x-auto mt-3">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Tên nhà đầu tư
          </th>
          <th scope="col" class="px-6 py-3">
            Tên đăng nhập
          </th>
          <th scope="col" class="px-6 py-3">
            Số điện thoại
          </th>
          <th scope="col" class="px-6 py-3">
            Giải thưởng
          </th>
          <th scope="col" class="px-6 py-3">
            Trạng thái
          </th>
          <th scope="col" class="px-6 py-3">
            Ngày đăng ký
          </th>
          <th scope="col" class="px-6 py-3">
            Hành Động
          </th>
        </tr>
        </thead>
        <tbody>
        <admin-users-item
            v-for="record in users"
            :key="record.uid"
            :record="record"
        />
        </tbody>
      </table>
    </div>

    <modal-user />

  </div>
</template>

<script lang="ts" setup>
import {PrizeEntity} from "~/entities/prize.entity";

definePageMeta({
  layout: 'admin'
})

const history = useRTDB<PrizeEntity[]>(dbRef(getDatabase(),  `results`))

const keyword = ref('')

const users = computed<PrizeEntity[]>(
    () => Object.values(history.value || {})
        // filter by keyword
        .filter(record => record.email.toLowerCase().includes(keyword.value.toLowerCase()))
        .sort((a, b) => b.createdAt - a.createdAt)
        // get 100 latest records
        .slice(0, 100)
)

</script>

