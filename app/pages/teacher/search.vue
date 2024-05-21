<template>
  <div class="p-12">
    <h1 class="text-2xl font-semibold my-4 dark:text-gray-50">
      Search for a teacher
    </h1>
    <div>
      <TeacherSearchBar @submit="handleFind" />
    </div>
    <div>
      <StackedInfoList
        v-if="users"
        :items-displayed="users.map(user => {
          return {
            id: user._id,
            title: `${user.firstName} ${user.lastName}`,
            subtitle: user.username,
            link: `/teacher/${user._id}`
          }
        })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const users: globalThis.Ref<any> = ref(null)

const handleFind = useDebounceFn(async (data) => {
  users.value = await searchUser(data)
}, 1000)
</script>
