<template>
  <div class="px-12 py-8">
    <div>
      <div>Search for my documents on Scopus</div>
      <div v-if="scopusId">
        {{ scopusId }}
      </div>
      <div v-else>
        Set your scopus id in
        <NuxtLink to="/account">
          the account settings
        </NuxtLink>
      </div>
    </div>
    <div>
      <FormKit type="button" label="Search" @click="fetchDocuments" />
    </div>

    <div class="mt-6">
      <div class="flex justify-between pr-8">
        <div>results:</div><div>Add all</div>
      </div>
      <StackedInfoList
        :items-displayed="results?.data.map(item => {
          return {
            id: item.scopus_id,
            title: item.title,
            subtitle: item.type,
          }
        })"
      >
        <template #right-menu="{ item }">
          <button type="button" @click="handleAdd(item.id)">
            Add
          </button>

          <button type="button" @click="console.log(item)">
            Remove
          </button>
        </template>
      </Stackedinfolist>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { ref, useAuth, useFetch } from '#imports'

const { data: user } = useAuth()
const scopusId = '57221725143' // user?.value?.scopus_id

const results = ref(null)

async function fetchDocuments () {
  results.value = await useFetch(`/api/scopus/author/${scopusId}`)
}

async function handleAdd (id: string) {
  const achievementIndex = results.value?.data?.findIndex(achievement => achievement?.scopus_id === id)
  if (achievementIndex === -1) {
    toast.error('Error occured.')
    return
  }

  const achievementData = {
    ...results.value.data?.[achievementIndex],
    users: [user.value.id],
    createdBy: user.value.id
  }
  try {
    await createAchievement(achievementData)
    toast.success('Achievement added successfully')
    results.value.data.splice(achievementIndex, 1)
  } catch (e) {
    toast.error('Error occured.')
    console.log(e)
  }
}
</script>
