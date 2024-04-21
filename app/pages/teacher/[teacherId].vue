<template>
  <div class="p-12">
    <div>
      <!-- Header -->
      <PageInfoHeader :title="`${teacher.firstName} ${teacher.lastName}`" :description="'NaUKMA'" />
    </div>
    <div>
      <!-- Nav -->
      <PageTabbedMenu :tabs="menuTabs" :current-tab="currentTab" @change-tab="v => currentTab = v" />
    </div>
    <div>
      <!-- Content -->
      <div v-if="+currentTab === 0">
        achievements
      </div>
      <div v-if="+currentTab === 1">
        courses
      </div>
      <div v-if="+currentTab === 2">
        university
      </div>
      <div v-if="+currentTab === 3">
        contact
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, useFetch } from '#imports'

const route = useRoute()

const { teacherId } = route.params

const { data: teacher } = await useFetch(`/api/users/${teacherId}`)

const menuTabs = [
  { name: 'achievements', href: '#', current: true },
  { name: 'courses', href: '#', current: false },
  { name: 'university', href: '#', current: false },
  { name: 'contact', href: '#', current: false }
]

const currentTab = ref(0)
</script>
