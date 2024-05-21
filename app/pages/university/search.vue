<template>
  <div class="p-12">
    <h1 class="text-2xl font-semibold my-4 dark:text-gray-50">
      Search for a university
    </h1>
    <div>
      <UniversitySearchBar @submit="handleFind" />
    </div>
    <div>
      <StackedInfoList
        v-if="universities"
        :items-displayed="universities.map(universities => {
          return {
            id: universities._id,
            title: universities.name,
            subtitle: universities.shortName,
            link: `/university/${universities._id}`
          }
        })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const universities: globalThis.Ref<any> = ref(null)

const handleFind = useDebounceFn(async (data) => {
  universities.value = await searchUniversities(data)
}, 1000)
</script>
