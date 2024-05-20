<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div v-for="item in items" :key="item?.id || item?.name" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div class="min-w-0 flex-1">
        <NuxtLink :to="item?.link || ''" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900" :class="nameClass">
                {{ item?.name }}
              </p>
              <p class="truncate text-sm text-gray-500" :class="descriptionClass">
                {{ item?.description }}
              </p>
            </div>
            <div><span :class="rightTextClass">{{ item?.rightText }}</span></div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  nameClass: {
    type: String,
    default: ''
  },
  descriptionClass: {
    type: String,
    default: ''
  },
  rightTextClass: {
    type: String,
    default: ''
  }
})
</script>
