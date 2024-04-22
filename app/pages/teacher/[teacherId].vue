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
        <div v-if="!errorAchievements">
          <StackedInfoList
            :author-mode="user.id === teacherId"
            :items="achievements?.map(item => {
              return {
                title: item.title,
                subtitle: item.type
              }
            })"
          />
        </div>
        <div v-else>
          Error occured. Pleaase, try later.
        </div>
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
import { ref, useAuth, useFetch } from '#imports'

const { data: user } = useAuth()

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

/// /////////  fetches  /////////////////
const { data: achievements, error: errorAchievements } = await useFetch(`/api/achievements/?createdBy=${teacher.value?._id}`)
</script>
