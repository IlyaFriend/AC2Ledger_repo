<template>
  <div class="px-12 py-8 space-y-6">
    <h1 class="text-2xl font-semibold">
      Update university information
    </h1>
    <UniversityForm v-model="university" submit-label="Update" @submit="v => handleUpdateUniversity(v)" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const route = useRoute()

const { universityId } = route.params

const { data: university } = await useFetch(`/api/universities/${universityId}`)

async function handleUpdateUniversity (formValue) {
  try {
    await updateUniversity(universityId, formValue)
    toast.success('University has been updated successfully')
  } catch (error) {
    toast.error(error.message)
  }
}
</script>
