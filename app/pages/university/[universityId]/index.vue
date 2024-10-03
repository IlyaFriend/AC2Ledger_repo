<template>
  <div class="px-12 py-8 space-y-6">
    <div>
      <PageTabbedMenu :tabs="menuTabs" :current-tab="currentTab" @change-tab="v => currentTab = v" />
    </div>
    <!-- main university information -->
    <div v-show="currentTab === 0">
      <div v-if="adminMode" class='space-y-2'>
        <div v-if="user?.role !== 'admin'">
          <ConnectWallet />
        </div>
        <h1 class="text-2xl font-semibold">
          Update university information
        </h1>
        <UniversityForm v-model="university" submit-label="Update" @submit="v => handleUpdateUniversity(v)" />
      </div>
      <div v-else>
        <StackedInfoList
          :items-displayed="Object.entries(university)?.map(([key, value]) => {
            return {
              id: key,
              title: key,
              subtitle: value
            }
          })
            .filter(item => item.subtitle && ![ ...keys, 'administration', 'faculties'].includes(item.title))"
        />
        <div>
          <h3 class="text-lg font-semibold">
            Administration
          </h3>
          <StackedInfoList
            :items-displayed="university?.administration?.map((administrator) => {
              return {
                id: administrator._id,
                title: `${administrator.firstName}`,
                subtitle: administrator.username,
                link: `/teacher/${administrator._id}`
              }
            })"
          />
        </div>
      </div>
    </div>
    <!-- faculties information -->
    <div v-show="currentTab === 1">
      <ContentSection
        :admin-mode="adminMode"
        :items="faculties"
        title="Faculties"
        subtitle=""
        add-button-label="Add a new faculty"
        dialog-title="Create a faculty"
      >
        <FacultyActionForm @on-submit="data => handleCreateFaculty(data)" />
      </ContentSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const { data: user } = useAuth()

const menuTabs = [
  { name: 'main information', href: '#' },
  { name: 'faculties', href: '#' }
]
const currentTab = ref(0)

const route = useRoute()

const { universityId } = route.params

const adminMode = isInAdministration(user.value, universityId)

const { data: university } = await useFetch(`/api/universities/${universityId}`)

const faculties = ref(university.value?.faculties?.reverse().map((faculty) => { return { ...faculty, link: `/university/${universityId}/faculty/${faculty._id}` } }))

async function handleCreateFaculty (faculty) {
  try {
    const createdFaculty = await createFaculty(universityId as string, faculty)
    faculties.value.unshift({ ...createdFaculty, link: `/university/${universityId}/faculty/${createdFaculty._id}` })
    toast.success('New faculty has been created')
  } catch (e) {
    toast.error(e.statusMessage)
  }
}

async function handleUpdateUniversity (formValue) {
  try {
    await updateUniversity(universityId as string, formValue)
    toast.success('University has been updated successfully')
  } catch (error) {
    toast.error(error.statusMessage)
  }
}
</script>
