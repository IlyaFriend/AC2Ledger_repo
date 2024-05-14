<template>
  <div v-if="scopusId" class="px-12 py-8">
    <div>
      <div class="text-2xl font-semibold">
        Search for my documents on Scopus
      </div>
      <div class="mt-4">
        <p>Your Scopus Id: {{ scopusId }}</p>
        <p class="text-sm">
          You can change it in
          <NuxtLink to="/account" class="text-primary-800 underline hover:text-primary-500 cursor-pointer">
            the settings
          </NuxtLink>
        </p>
      </div>
    </div>

    <div v-if="!results" class="flex justify-center">
      We have not found any results on Scopus. Check your Scopus Id or try later.
    </div>

    <div v-else class="mt-6">
      <PageTabbedMenu :tabs="tabs" :current-tab="currentTab" @change-tab="v => currentTab = v" />

      <div v-if="currentTab === 0">
        <div class="flex justify-between pr-12 pt-4">
          <div class="text-xl font-semibold">
            Documents not added to your achievements
          </div>
          <button type="button" class="hover:text-primary-600" @click="handleAddAll">
            Add all <Icon name="material-symbols-light:library-add-outline-rounded" size="1.5em" />
          </button>
        </div>
        <StackedInfoList
          :items-displayed="results?.data?.results.filter(item => !results.data.existing?.find(ach => ach.scopus_id === item.scopus_id)).map(item => {
            return {
              id: item.scopus_id,
              title: item.title,
              subtitle: item.type,
            }
          })"
        >
          <template #right-menu="{ item }">
            <button type="button" class="hover:text-primary-600" @click="handleAdd(item.id)">
              <Icon name="material-symbols-light:add-box-outline-rounded" size="1.5em" />
            </button>

            <button type="button" class="hover:text-primary-600" @click="handleDelete(item.id)">
              <Icon name="material-symbols-light:delete-outline-sharp" size="1.5em" />
            </button>
          </template>
        </Stackedinfolist>
      </div>
      <div v-if="currentTab === 1">
        <div class="flex justify-between pr-12 pt-4">
          <div class="text-xl font-semibold">
            Documents <u>already added</u> to your achievements
          </div>
          <button type="button" class="hover:text-primary-600" @click="handleAddAll">
            Add all <Icon name="material-symbols-light:library-add-outline-rounded" size="1.5em" />
          </button>
        </div>
        <StackedInfoList
          :items-displayed="results?.data?.results.filter(item => results.data.existing?.find(ach => ach.scopus_id === item.scopus_id)).map(item => {
            return {
              id: item.scopus_id,
              title: item.title,
              subtitle: item.type,
            }
          })"
        >
          <template #right-menu="{ item }">
            <button type="button" class="hover:text-primary-600" @click="handleAdd(item.id)">
              <Icon name="material-symbols-light:add-box-outline-rounded" size="1.5em" />
            </button>

            <button type="button" class="hover:text-primary-600" @click="handleDelete(item.id)">
              <Icon name="material-symbols-light:delete-outline-sharp" size="1.5em" />
            </button>
          </template>
        </Stackedinfolist>
      </div>
    </div>
  </div>
  <LayoutInfoPage v-else link-url="/account">
    <template #status-code>
      <div />
    </template>
    <template #page-title>
      Scopus ID not specified
    </template>
    <template #page-description>
      Please, add your Scopus user ID in the settings
    </template>
    <template #link-text>
      Go to settings
    </template>
  </LayoutInfoPage>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { ref, useAuth, useFetch } from '#imports'

const tabs = [{ name: 'results' }, { name: 'existing' }]
const currentTab = ref(0)

const { data: user } = useAuth()
const scopusId = user?.value?.scopus_id

const results = ref(scopusId ? await useFetch(`/api/scopus/author/${scopusId}`) : null)

async function handleAdd (id: string) {
  const achievementIndex = results.value?.data?.results?.findIndex(achievement => achievement?.scopus_id === id)
  if (achievementIndex === -1) {
    toast.error('Error occured.')
    return
  }

  const achievementData = {
    ...results.value.data.results?.[achievementIndex],
    users: [user.value.id],
    createdBy: user.value.id
  }
  try {
    await createAchievement(achievementData)
    toast.success('Achievement added successfully')
    results.value.data.results.splice(achievementIndex, 1)
  } catch (e) {
    toast.error('Error occured.')
    console.log(e)
  }
}

async function handleAddAll () {
  const achievementData = results.value?.data?.results?.map((achievement) => {
    return {
      ...achievement,
      users: [user.value.id],
      createdBy: user.value.id
    }
  })
  console.log('achievementData', achievementData)
  try {
    await createAchievement(achievementData)
    toast.success('Achievements added successfully')
    results.value.data.results = []
  } catch (e) {
    toast.error('Error occured.')
    console.log(e)
  }
}

function handleDelete (id: string) {
  const achievementIndex = results.value?.data?.results?.findIndex(achievement => achievement?.scopus_id === id)
  if (achievementIndex === -1) {
    toast.error('Error occured.')
    return
  }
  results.value?.data?.results.splice(achievementIndex, 1)
}
</script>
