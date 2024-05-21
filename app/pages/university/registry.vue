<template>
  <div class="px-12 py-8">
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <h1 class="font-semibold text-2xl">
        Registry a university
      </h1>
      <UniversityForm @submit="v => registryUniversity(v)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const { status } = useAuth()
if (status.value === 'unauthenticated') {
  throw createError({ statusCode: 401, message: 'You must be authenticated to access this page.' })
}

async function registryUniversity (formValue) {
  try {
    await createUniversity(formValue)
    toast.success('University has been added')
  } catch (error) {
    toast.error(error.statusMessage)
  }
}

</script>
