<template>
  <button
    class="w-full bg-[#edf1f4] rounded-xl py-4 dark:bg-primary-700 text-gray-600 dark:text-gray-50 hover:text-primary-600 dark:hover:text-primary-300"
  >
    <svg
      class="mx-auto h-12 w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      />
    </svg>
    <h3 v-if="title" class="mt-2 text-sm font-semibold">
      {{ title }}
    </h3>
  </button>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
