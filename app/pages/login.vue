<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <div class="relative mt-12 sm:mt-16">
        <h1 class="text-2xl font-medium tracking-tight text-center text-gray-900">
          Sign in to account
        </h1>
        <p class="mt-3 text-lg text-center text-gray-600">
          Don’t have an account?
          <NuxtLink to="/signup" class="text-cyan-600">
            Sign up
          </NuxtLink>for a free trial.
        </p>
      </div>
      <div
        class="flex-auto px-4 py-10 mt-10 -mx-4 bg-white shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24"
      >
        <FormKit type="form" :actions="false" @submit="login">
          <div class="grid grid-cols-2 gap-6 max-[420px]:grid-cols-1">
            <FormKit
              type="email"
              name="email"
              label="Email address"
              validation="required|email"
              auto-complete="email"
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
            <FormKit type="submit" input-class="w-full">
              <span class="inline w-full text-center">Sign in to account</span>
            </FormKit>
            <FormKit type="button" input-class="w-full $remove:px-7 $remove:py-3">
              <NuxtLink to="/signup" class="inline w-full py-3 text-center px-7">
                Sign up
              </NuxtLink>
            </FormKit>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, ref, useAuth } from '#imports'
definePageMeta({
  auth: false
})
const { signIn } = useAuth()
definePageMeta({ auth: false })

const username = ref('')
const password = ref('')

function login () {
  signIn({
    username: username.value,
    password: password.value
  })
}
</script>
