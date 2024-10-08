<template>
  <main class="grid min-h-screen px-6 place-items-center bg-gray-50 dark:bg-gray-900 py-60 lg:px-8">
    <ColorModeSwitcher class="absolute right-4 top-4" />
    <div class="text-center">
      <h1 v-if="error?.statusCode" class="mt-4 text-5xl font-bold tracking-tight text-primary-600 dark:text-primary-600">
        {{ error?.statusCode }}
      </h1>
      <h2 class="mt-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ error.message }}
      </h2>
      <div class="flex items-center justify-center mt-10 gap-x-6">
        <NuxtLink
          href="/"
          class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Go back home
        </NuxtLink>
        <NuxtLink href="mailto:AC2Ledger@gmail.com" class="text-sm font-semibold text-gray-900 dark:text-white">
          Contact support <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
const error = useError()
</script>
