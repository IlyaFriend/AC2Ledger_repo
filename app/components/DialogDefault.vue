<template>
  <ClientOnly>
    <Dialog :open="isOpen" class="relative z-50" :class="dialogClass" @close="closeModal">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel class="w-3/4 rounded-lg px-16 py-8 bg-white relative" :class="panelClass">
          <div class="absolute top-0 right-0 p-4">
            <CloseButton @click="closeModal" />
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
  title: String,
  description: String,
  dialogClass: String,
  panelClass: String,
  titleClass: String,
  descriptionClass: String
})

const emit = defineEmits(['close'])

const isOpen = ref(false)

function closeModal () {
  isOpen.value = false
  emit('close')
}
function openModal () {
  isOpen.value = true
}

defineExpose({
  openModal,
  closeModal
})
</script>
