<template>
  <div class="px-12 py-8 space-y-6">
    <div>
      <PageTabbedMenu :tabs="menuTabs" :current-tab="currentTab" @change-tab="v => currentTab = v" />
    </div>
    <!-- main faculty information -->
    <div v-show="currentTab === 0">
      <div v-if="adminMode">
        <h1 class="text-2xl font-semibold">
          Update faculty information
        </h1>
        <FacultyForm v-model="faculty" submit-label="Update" @submit="v => handleUpdateFaculty(v)" />
      </div>
      <div v-else>
        <StackedInfoList
          :items-displayed="Object.entries(faculty)?.map(([key, value]) => {
            return {
              id: key,
              title: key,
              subtitle: value
            }
          })
            .filter(item => item.subtitle && ![ ...keys, 'administration', 'departments'].includes(item.title))"
        />
        <div>
          <h3 class="text-lg font-semibold">
            Administration
          </h3>
          <StackedInfoList
            :items-displayed="faculty?.administration?.map((administrator) => {
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
        :items="departments"
        title="Departments"
        subtitle="These are the departments of the faculty"
        add-button-label="Add a new departments"
        dialog-title="Create a departments"
      >
        <DepartmentActionForm @on-submit="data => handleCreateDepartment(data)" />
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
  { name: 'departments', href: '#' }
]
const currentTab = ref(0)

const route = useRoute()

const { universityId, facultyId } = route.params

const adminMode = isInAdministration(user.value, [universityId as string, facultyId as string])

const { data: faculty } = await useFetch(`/api/faculties/${facultyId}`)

const departments = ref(faculty.value?.departments?.reverse()?.map((department) => { return { ...department, link: `/university/${universityId}/faculty/${facultyId}/department/${department._id}` } }))

async function handleCreateDepartment (faculty) {
  try {
    const createdDepartment = await createDepartment(universityId as string, facultyId as string, faculty)
    departments.value.unshift({ ...createdDepartment, link: `/university/${universityId}/faculty/${facultyId}/department/${createdDepartment._id}` })
    toast.success('New faculty has been created')
  } catch (e) {
    toast.error(e.statusMessage)
  }
}

async function handleUpdateFaculty (formValue) {
  try {
    await updateFaculty(universityId as string, facultyId as string, formValue)
    toast.success('Faculty has been updated successfully')
  } catch (e) {
    toast.error(e.statusMessage)
  }
}
</script>
