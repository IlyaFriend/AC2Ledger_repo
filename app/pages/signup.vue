<template>
  <div class="flex items-center justify-center h-screen">
    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md" @submit.prevent="signup">
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="username">
          Username
        </label>
        <input id="username" v-model="username" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Username">
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
          Password
        </label>
        <input id="password" v-model="password" class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="password" placeholder="Password">
      </div>
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
          First name
        </label>
        <input id="firstName" v-model="firstName" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="First Name">
      </div>
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
          Last name
        </label>
        <input id="lastName" v-model="lastName" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Last Name">
      </div>
      <div class="flex items-center justify-between">
        <button class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
definePageMeta({
  auth: false
})

const username = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')

async function signup () {
  const res = await $fetch('/api/users/', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  })
  console.log('signup response:', res)
}
</script>
