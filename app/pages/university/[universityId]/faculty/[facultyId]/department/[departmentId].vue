<template>
  <div class="px-12 py-8 space-y-6">
    <div>
      <PageTabbedMenu :tabs="menuTabs" :current-tab="currentTab" @change-tab="v => currentTab = v" />
    </div>
    <!-- main department information -->
    <div v-show="currentTab === 0">
      <h1 class="text-2xl font-semibold">
        Update department information
      </h1>
      <FacultyForm v-model="department" submit-label="Update" @submit="v => handleUpdateDepartment(v)" />
    </div>
    <!-- teachers information -->
    <div v-show="currentTab === 1">
      <ContentSection :items="teachers" title="Teachers" subtitle="Add teachers" add-button-label="Add a teacher to the department" dialog-title="Search for a teacher">
        <TeacherSearchForm @on-submit="data => handleAddTeachers(data)" />
      </ContentSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const menuTabs = [
  { name: 'main information', href: '#' },
  { name: 'teachers', href: '#' }
]
const currentTab = ref(0)

const route = useRoute()

const { universityId, facultyId, departmentId } = route.params

const { data: department } = await useFetch(`/api/departments/${departmentId}`)

const teachers = ref(department.value?.teachers?.reverse()?.map(teacher => { return { name: `${teacher.lastName} ${teacher.firstName}`, description: teacher.username, link: `/teacher/${teacher._id}` } }))

async function handleAddTeachers(data) {
  try {
    const addedTeachers = await addTeachers(universityId as string, facultyId as string, departmentId as string, data.teachers)
    teachers.value.push(...addedTeachers?.map(teacher => { return { name: `${teacher.lastName} ${teacher.firstName}`, description: teacher.username, link: `/teacher/${teacher._id}` } }))
  } catch (e) {
    toast.error(e.message)
  }
}

async function handleUpdateDepartment (formValue) {
  try {
    await updateDepartment(universityId as string, facultyId as string, departmentId as string, formValue)
    toast.success('Department has been updated successfully')
  } catch (error) {
    toast.error(error.statusMessage)
  }
}
</script>
