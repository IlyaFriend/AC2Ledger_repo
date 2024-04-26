<template>
  <div class="p-12">
    <h1 class="text-2xl font-semibold my-4">
      Search for a teacher
    </h1>
    <div>
      <FormKit
        type="form"
        :actions="false"
        @submit="handleFind"
      >
        <div class="flex">
          <FormKit name="firstName" placeholder="First name" inner-class="$remove:rounded border-r-0 rounded-l" />
          <FormKit name="lastName" placeholder="Last name" inner-class="$remove:rounded border-r-0" />
          <FormKit name="username" placeholder="Username" inner-class="$remove:rounded" />
          <FormKit type="submit" input-class="$remove:rounded w-full flex justify-center rounded-r" outer-class=" w-[42px]">
            <MagnifyingGlassIcon class="min-w-4 w-4" />
          </FormKit>
        </div>
      </FormKit>
    </div>
    <div>
      <StackedInfoList
        v-if="users"
        :items-displayed="users.map(user => {
          return {
            id: users._id,
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
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const users: globalThis.Ref<any> = ref(null)

async function handleFind (data) {
  console.log(data)
  users.value = await searchUser(data)
}
</script>
