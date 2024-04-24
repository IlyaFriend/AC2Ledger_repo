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
            <AddButton title="Add a new achievement" class="my-4" @click="openAddAchievementDialogOpen" />
            <DialogDefault
              ref="addAchievementDialog"
              title="Add achievement"
              description="Include background context on the achievement, such as collaborators and supporting data."
            >
              <DynamicForm submit-label="Add" class="mt-4" @on-submit="data => addAchievement(data)" />
            </DialogDefault>
          </div>
          <StackedInfoList
            :author-mode="authorMode"
            :items-displayed="achievements?.map(item => {
              return {
                id: item._id,
                title: item.title,
                subtitle: item.type
              }
            })"
            :items="achievements"
            @delete-event="id => handleDelete(id)"
          >
            <template #update-form="scope">
              <AchievementUpdateForm :item="scope.item" @on-update="achievement => handleUpdateAchievement(achievement)" />
            </template>
          </StackedInfoList>
        </div>
        <div v-else>
          Error occured. Please, try later.
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

const addAchievementDialog = ref(null)

const currentTab = ref(0)

/// /////////  fetches  /////////////////
const { data: achievements, error: errorAchievements } = await useFetch(`/api/achievements/?user=${teacher.value?._id}`)
/// //////////////////////////////////////

async function addAchievement (inputData) {
  const { title, type, ...details } = inputData
  const achievementData = {
    title,
    type,
    details
  }
  console.log('addAchievement', inputData)
  const createdAchievement = await createAchievement(achievementData)
  achievements.value?.push(createdAchievement)
}

async function handleDelete (id: string) {
  await deleteAchievement(id)
  achievements.value = achievements.value?.filter(achievement => achievement._id !== id)
}

function openAddAchievementDialogOpen () {
  addAchievementDialog.value?.openModal()
}

function handleUpdateAchievement (achievement) {
  const index = achievements.value?.findIndex(a => a._id === achievement._id)

  if (index !== -1) {
    achievements.value?.splice(index, 1, achievement)
  } else {
    console.error('Error: achievement not found.')
  }
}

</script>
