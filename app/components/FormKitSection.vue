<template>
  <div class="grid grid-cols-1 px-4 py-16 max-w-7xl gap-x-8 gap-y-10 sm:px-6 md:grid-cols-3 lg:px-8">
    <div>
      <h2 class="text-base font-semibold leading-7 dark:text-white">
        <slot name="title" />
      </h2>
      <p class="mt-1 text-sm leading-6 dark:text-gray-400">
        <slot name="subtitle" />
      </p>
    </div>

    <FormKit type="form" form-class="md:col-span-2" :actions="false" @submit="formData => $emit('onSubmit', formData)">
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <slot />
      </div>
      <slot name="submit-button">
        <div class="flex mt-8">
          <FormKit type="submit" :label="submitLabel" />
        </div>
      </slot>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
defineProps({
  submitLabel: {
    type: String,
    default: 'Save'
  }
})

defineEmits(['onSubmit'])
</script>
