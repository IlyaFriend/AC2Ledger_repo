<template>
  <div class="min-h-screen dark:bg-gray-900">
    <LayoutHeader wrapper-class="max-w-2xl xl:max-w-7xl mx-auto lg:mx-0 xl:mx-auto xl:px-8">
      <template #suffix>
        <div class="w-8 h-8 sm:mr-2">
          <NuxtLink to="/" class="w-full h-full">
            <NuxtImg
              src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=500"
              alt="AC2Ledger"
              class="max-w-none"
              width="37"
            />
          </NuxtLink>
        </div>
      </template>
    </LayoutHeader>
    <div>
      <slot class="dark:bg-gray-900 bg-gray-50 min-h-[calc(100vh-theme('spacing.16')-1px)]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '~/components/Layout/Header.vue'
</script>
