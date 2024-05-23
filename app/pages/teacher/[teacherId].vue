<template>
  <div class="p-12">
    <div>
      <!-- Header -->
      <PageInfoHeader :title="`${teacher.firstName} ${teacher.lastName}`" :description="teacher.username" :right-text="`Personal score: ${teacher.score}`" />
    </div>
    <div>
      <!-- Nav -->
      <PageTabbedMenu :tabs="menuTabs" :current-tab="currentTab" @change-tab="v => currentTab = v" />
    </div>
    <div>
      <!-- Content -->
      <div v-show="+currentTab === 0">
        <div v-if="!errorAchievements">
          <GridList :items="teacherInfo" class="my-4" />
          <div v-if="authorMode">
            <NuxtLink
              class="flex justify-center w-full bg-[#edf1f4] dark:bg-primary-700 dark:text-gray-50 rounded-xl py-2 hover:underline hover:text-primary-500 dark:hover:text-primary-300 cursor-pointer"
              href="/achievement/scopus/import"
            >
              <span class="">
                Import from Scopus
              </span>
            </NuxtLink>
            <AddButton title="Add a new achievement" class="my-4" @click="openAddAchievementDialogOpen" />
            <DialogDefault
              ref="addAchievementDialog"
              title="Add achievement"
              description="Include background context on the achievement, such as collaborators and supporting data."
            >
              <AchievementCreateForm @on-create="createdAchievement => achievements?.push(createdAchievement)" />
            </DialogDefault>
          </div>
          <StackedInfoList
            :update-action="authorMode"
            :delete-action="authorMode || adminMode"
            :items-displayed="achievements?.map(item => {
              return {
                id: item._id,
                title: item.title,
                subtitle: item.type,
                link: `/achievement/${item._id}`
              }
            })"
            :items="achievements"
            @delete-event="id => handleDeleteAchievement(id)"
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
      <div v-show="+currentTab === 1">
        <StackedInfoList
          :items-displayed="teacher.userUniversities?.map((university) => {
            return {
              id: university._id,
              title: university.name,
              subtitle: university.shortName,
              link: `/university/${university._id}`
            }
          })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'
import { ref, useAuth, useFetch } from '#imports'

const { data: user } = useAuth()

const route = useRoute()

const { teacherId } = route.params

const { data: teacher } = await useFetch(`/api/users/${teacherId}`)

const authorMode = computed(() => {
  return user.value?.id === teacherId
})
const adminMode = computed(() => {
  return user.value?.role === 'admin'
})

const menuTabs = [
  { name: 'achievements', href: '#', current: true },
  { name: 'universities', href: '#', current: false }
]

const addAchievementDialog = ref(null)

const currentTab = ref(0)

/// /////////  fetches  /////////////////
const { data: achievements, error: errorAchievements } = await useFetch(`/api/achievements/?user=${teacher.value?._id}`)
/// //////////////////////////////////////

const teacherInfo = ref([
  {
    description: 'Personal ScholarSphere Score',
    name: teacher.value?.score || 0
  },
  {
    description: 'Achievements',
    name: achievements.value?.length || 0
  }
])

async function handleDeleteAchievement (id: string) {
  if (!achievements.value) {
    return
  }
  const alteredAchievementIndex = achievements.value?.findIndex(achievement => achievement._id === id)

  if (alteredAchievementIndex === -1) {
    return
  }

  try {
    if (achievements.value?.[alteredAchievementIndex]?.createdBy === user.value?.id || adminMode.value) {
      await deleteAchievement(id)
    } else {
      await removeAchievementAuthor(achievements.value?.[alteredAchievementIndex]._id, user.value?.id)
    }
    achievements.value?.splice(alteredAchievementIndex, 1)
    toast.success('Achievement deleted successfully')
  } catch (e) {
    toast.error(e.statusMessage)
  }
}

function openAddAchievementDialogOpen () {
  addAchievementDialog.value?.openModal()
}

function handleUpdateAchievement (achievement) {
  const index = achievements.value?.findIndex(a => a._id === achievement._id)

  if (index === undefined) {
    return
  }
  if (index !== -1) {
    achievements.value?.splice(index, 1, achievement)
  } else {
    console.error('Error: achievement not found.')
  }
}

</script>
