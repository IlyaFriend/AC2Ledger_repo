<template>
  <div class="px-12 py-8 space-y-6">
    <div>
      <PageTabbedMenu :tabs="menuTabs" :current-tab="currentTab" @change-tab="v => currentTab = v" />
    </div>
    <!-- main faculty information -->
    <div v-show="currentTab === 0">
      <h1 class="text-2xl font-semibold">
        Update faculty information
      </h1>
      <UniversityForm v-model="faculty" submit-label="Update" @submit="v => handleUpdateUniversity(v)" />
    </div>
    <!-- faculties information -->
    <div v-show="currentTab === 1">
      <ContentSection :items="departments" title="Departments" subtitle="Add a departments" add-button-label="Add a new departments" dialog-title="Create a departments">
        <DepartmentActionForm @on-submit="data => handleCreateDepartment(data)" />
      </ContentSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const menuTabs = [
  { name: 'main information', href: '#' },
  { name: 'departments', href: '#' }
]
const currentTab = ref(0)

const route = useRoute()

const { universityId, facultyId } = route.params

const { data: faculty } = await useFetch(`/api/faculties/${facultyId}`)
console.log('faculty', faculty)

const departments = ref(faculty.value.departments?.reverse()?.map(department => { return { ...department, link: `/university/${universityId}/faculty/${facultyId}/department/${department._id}` } }))

async function handleCreateDepartment(faculty) {
  try {
    const createdDepartment = await createDepartment(facultyId, faculty)
    console.log(43, departments.value, createdDepartment)
    departments.value.unshift({ ...createdDepartment, link: `/university/${universityId}/faculty/${facultyId}/department/${createdDepartment._id}` })
    toast.success('New faculty has been created')
  } catch (e) {
    toast.error(e.message)
  }
}

async function handleUpdateDepartment (formValue) {
  try {
    await updateDepartment(facultyId, formValue)
    toast.success('Department has been updated successfully')
  } catch (error) {
    toast.error(error.message)
  }
}
</script>
