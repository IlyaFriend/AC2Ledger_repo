<template>
  <div class="rounded-lg">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-50">
      {{ title }}
    </h2>
    <p v-if="description" class="text-gray-500 italic">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>
