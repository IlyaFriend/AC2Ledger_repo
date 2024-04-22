<template>
  <ClientOnly>
    <Dialog :open="open" class="relative z-50" :class="dialogClass" @close="handleClose">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel class="w-2/3 rounded-lg px-16 py-8 bg-white relative" :class="panelClass">
          <div class="absolute top-0 right-0 p-4">
            <CloseButton @click="handleClose" />
          </div>
          <div class="text-center mt-10">
            <DialogTitle class="text-xl font-semibold" :class="titleClass">
              {{ title }}
            </DialogTitle>
            <DialogDescription class="text-sm text-gray-500" :class="descriptionClass">
              {{ description }}
            </DialogDescription>
          </div>
          <slot />
        </DialogPanel>
      </div>
    </Dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

defineProps({
  open: Boolean,
  title: String,
  description: String,
  dialogClass: String,
  panelClass: String,
  titleClass: String,
  descriptionClass: String
})

const emit = defineEmits(['close'])

function handleClose () {
  emit('close')
}
</script>
