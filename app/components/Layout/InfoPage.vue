<template>
  <div class="flex min-h-full flex-col">
    <main class="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
      <p class="text-base font-semibold leading-8 text-indigo-600">
        <slot name="status-code">
          404
        </slot>
      </p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        <slot name="page-title">
          Page not found
        </slot>
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        <slot name="page-description">
          Sorry, we couldn’t find the page you’re looking for.
        </slot>
      </p>
      <div class="mt-10">
        <NuxtLink :to="linkUrl" class="text-sm font-semibold leading-7 text-primary-600">
          <span aria-hidden="true">&larr;</span> <slot name="link-text">
            Back to home
          </slot>
        </NuxtLink>
      </div>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  linkUrl: {
    type: String,
    required: true
  }
})
</script>
