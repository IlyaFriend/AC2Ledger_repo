<template>
  <header class="bg-white shadow-md dark:bg-primary-900" :class="{ 'bg-emerald-300': user?.role === 'admin'}">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="#" class="-m-1.5 p-1.5">
          <span class="sr-only">ScholarSphere</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600" alt="ScholarSphere">
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700  hover:text-primary-500" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <NuxtLink to="/teacher/search" class="text-sm leading-6 text-gray-900 dark:text-gray-50 hover:text-primary-500">
          <Icon name="material-symbols-light:search" size="1.5em" />Search for a teacher
        </NuxtLink>
        <NuxtLink to="/university/search" class="text-sm leading-6 text-gray-900 dark:text-gray-50 hover:text-primary-500">
          <Icon name="material-symbols-light:search" size="1.5em" />Search for a university
        </NuxtLink>
        <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href" class="text-sm leading-6 text-gray-900 dark:text-gray-50 hover:text-primary-500">
          {{ item.name }}
        </NuxtLink>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <button v-if="status === 'authenticated'" class="text-sm leading-6 text-gray-900 dark:text-gray-50 hover:text-primary-500" @click="handleSignout">
          Log out <span aria-hidden="true">&rarr;</span>
        </button>
        <NuxtLink v-else to="/login" class="text-sm leading-6 text-gray-900 dark:text-gray-50 hover:text-primary-500">
          Log in <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <NuxtLink to="#" class="-m-1.5 p-1.5">
            <span class="sr-only">ScholarSphere</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600" alt="ScholarSphere">
          </NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-primary-500" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink to="/teacher/search" class="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-50">
                Teacher Search<Icon name="material-symbols-light:search" size="1.5em" />
              </NuxtLink>
              <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-50">
                {{ item.name }}
              </NuxtLink>
            </div>
            <div class="py-6">
              <button v-if="status === 'authenticated'" class="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-50" @click="handleSignout">
                Log out <span aria-hidden="true">&rarr;</span>
              </button>
              <NuxtLink v-else to="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-50">
                Log in
              </NuxtLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '#imports'

const mobileMenuOpen = ref(false)
const {
  data: user,
  status,
  signOut
} = useAuth()

const navigation = [
]

if (status.value === 'authenticated') {
  navigation.push({ name: 'Account', href: '/account' })
  navigation.push({ name: `${user.value.firstName} ${user.value.lastName}`, href: `/teacher/${user.value.id}` })
}

async function handleSignout () {
  await signOut({
    callbackUrl: '/login'
  })
}
</script>
