<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="item in itemsDisplayed" :key="item.id" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
          <NuxtLink v-if="item.link" :to="item.link" class="text-sm font-semibold leading-6 text-gray-900 hover:underline">
            {{ item.title }}
          </NuxtLink>
          <p v-else class="text-sm font-semibold leading-6 text-gray-900 cursor-default hover:underline">
            {{ item.title }}
          </p>
          <p class="mt-1 flex text-xs leading-5 text-gray-500">
            {{ item.subtitle }}
          </p>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-x-6">
        <div class="hidden sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">
            {{ item.secondarySubtitle }}
          </p>
        </div>
        <Menu as="div" class="relative flex-none">
          <MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span class="sr-only">Open options</span>
            <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
          </MenuButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem v-if="updateAction" v-slot="{ active }">
                <button
                  :class="[active ? 'bg-gray-50' : '', 'w-full block px-3 py-1 text-sm leading-6 text-gray-900']"
                  @click="handleUpdateItem(item.id)"
                >
                  Update
                </button>
              </MenuItem>
              <MenuItem v-if="deleteAction" v-slot="{ active }">
                <button
                  :class="[active ? 'bg-gray-50' : '', 'w-full block px-3 py-1 text-sm leading-6 text-gray-900']"
                  @click="handleDeleteItem(item.id)"
                >
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </li>
  </ul>
  <DialogAction
    ref="deleteRef"
    title="Delete"
    description="This is a permanent action."
    submit-label="Yes"
    :callback="emitDeleteItem"
  />
  <DialogDefault
    ref="updateRef"
    title="Add achievement"
    description="Include background context on the achievement, such as collaborators and supporting data."
  >
    <slot name="update-form" :item="items.find(item => item._id === activeItemId)" />
  </DialogDefault>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems, provideUseId } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import type { PropType } from 'vue'

import { useId } from '#imports'

provideUseId(() => useId())

type Item = {
  id: string,
  title: string,
  subtitle: string,
  secondarySubtitle?: string,
  link?: string,
}

defineProps({
  authorMode: {
    type: Boolean,
    default: false
  },
  updateAction: {
    type: Boolean,
    default: false
  },
  deleteAction: {
    type: Boolean,
    default: false
  },
  itemsDisplayed: {
    type: Array as unknown as PropType<Item[]>,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
})

const emits = defineEmits(['delete-event', 'update-event'])

const deleteRef = ref(null)
const updateRef = ref(null)

const activeItemId: globalThis.Ref<string | null> = ref(null)

function handleDeleteItem (itemId: string) {
  activeItemId.value = itemId
  deleteRef.value?.openModal()
}
function handleUpdateItem (itemId: string) {
  activeItemId.value = itemId
  updateRef.value?.openModal()
}

function emitDeleteItem () {
  emits('delete-event', activeItemId.value)
}
function emitUpdateItem () {
  emits('update-event', activeItemId.value)
}
</script>
