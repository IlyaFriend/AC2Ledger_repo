<template>
  <div class="p-12">
    <h1 class="text-2xl font-semibold my-4">
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
const users: globalThis.Ref<any> = ref(null)

async function handleFind (data) {
  users.value = await searchUser(data)
}
</script>
