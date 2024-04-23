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
          <div v-if="authorMode">
            <AddButton title="Add a new achievement" class="my-4" @click="setIsAddAchievementDialogOpen(true)" />
            <DialogDefault
              v-if="isAddAchievementDialogOpen"
              :open="isAddAchievementDialogOpen"
              title="Add achievement"
              description="Include background context on the achievement, such as collaborators and supporting data."
              @close="() => setIsAddAchievementDialogOpen(false)"
            >
              <DynamicForm submit-label="Add" class="mt-4" @on-submit="data => addAchievement(data)" />
            </DialogDefault>
          </div>
          <StackedInfoList
            :author-mode="authorMode"
            :items="achievements?.map(item => {
              return {
                id: item._id,
                title: item.title,
                subtitle: item.type
              }
            })"
            @delete-event="async id => await handleDelete(id)"
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

const authorMode = computed(() => {
  return user.value.id === teacherId
})

const menuTabs = [
  { name: 'achievements', href: '#', current: true },
  { name: 'courses', href: '#', current: false },
  { name: 'university', href: '#', current: false },
  { name: 'contact', href: '#', current: false }
]

const currentTab = ref(0)

const isAddAchievementDialogOpen = ref(false)

function setIsAddAchievementDialogOpen (value: boolean) {
  isAddAchievementDialogOpen.value = value
}

/// /////////  fetches  /////////////////
const { data: achievements, error: errorAchievements } = await useFetch(`/api/achievements/?user=${teacher.value?._id}`)
/// //////////////////////////////////////

async function addAchievement (inputData) {
  let achievementData = { ...inputData }
  const { title, type, ...details } = achievementData
  achievementData = {
    title,
    type,
    details,
    users: [user.value.id],
    createdBy: user.value.id
  }
  console.log('addAchievement', inputData)
  const createdAchievement = await createAchievement(achievementData)
  achievements.value?.push(createdAchievement)
}

async function handleDelete (id: string) {
  await deleteAchievement(id)
}
</script>
