<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <div class="relative mt-12 sm:mt-16">
        <h1 class="text-2xl font-medium tracking-tight text-center text-gray-900">
          Create a new account
        </h1>
        <p class="mt-3 text-lg text-center text-gray-600">
          Already have an account?
          <NuxtLink to="/login" class="text-cyan-600">
            Sign in
          </NuxtLink>
        </p>
      </div>
      <div class="flex-auto px-4 py-10 mt-10 -mx-4 bg-white shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24">
        <FormKit type="form" :actions="false" @submit="signup">
          <div class="grid grid-cols-2 gap-6 max-[420px]:grid-cols-1">
            <FormKit
              type="text"
              name="username"
              label="Username"
              validation="required"
              auto-complete="username"
              outer-class="col-span-full"
            />
            <FormKit
              type="text"
              name="firstName"
              label="First name"
              validation="required"
              auto-complete="firstName"
              outer-class="col-span-full"
            />
            <FormKit
              type="text"
              name="lastName"
              label="Last name"
              validation="required"
              auto-complete="lastName"
              outer-class="col-span-full"
            />
            <FormKit
              type="password"
              name="password"
              label="Password"
              validation="required|length:8"
              auto-complete="password"
              outer-class="col-span-full"
            />
            <FormKit
              type="password"
              name="password_confirm"
              label="Confirm password"
              validation="required|confirm"
              outer-class="col-span-full"
            />
            <FormKit type="submit" input-class="w-full">
              <span class="inline w-full text-center">Sign up</span>
            </FormKit>
            <FormKit type="button" input-class="w-full $remove:px-7 $remove:py-3">
              <NuxtLink to="/login" class="inline w-full py-3 text-center px-7">
                Sign in
              </NuxtLink>
            </FormKit>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
definePageMeta({
  auth: false
})

async function signup (formData) {
  const res = await $fetch('/api/users/', {
    method: 'POST',
    body: {
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName
    }
  })
  console.log('signup response:', res)
}
</script>
