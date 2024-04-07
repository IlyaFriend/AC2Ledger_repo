<template>
  <div class="p-8 border rounded">
    <button @click="signup">
      sign up
    </button>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
definePageMeta({
  auth: false
})

async function signup () {
  const res = await $fetch('/api/users/', {
    method: 'POST',
    body: {
      username: 'testuser1',
      password: '11111111',
      firstName: 'John',
      lastName: 'Doe'
    }
  })
  console.log('signup response:', res)
}
</script>
