<template>
  <div class="px-12 py-8 space-y-6">
    <div>
      <PageTabbedMenu :tabs="menuTabs" :current-tab="currentTab" @change-tab="v => currentTab = v" />
    </div>
    <!-- main department information -->
    <div v-show="currentTab === 0">
      <div v-if="adminMode">
        <h1 class="text-2xl font-semibold">
          Update department information
        </h1>
        <FacultyForm v-model="department" submit-label="Update" @submit="v => handleUpdateDepartment(v)" />
        <div v-if="user?.role !== 'admin'">
          <ConnectWallet />
        </div>
      </div>

      <div v-else>
        <StackedInfoList
          :items-displayed="Object.entries(department)?.filter(([key, _]) => !['score'].includes(key)).map(([key, value]) => {
            return {
              id: key,
              title: key,
              subtitle: value
            }
          })
            .filter(item => item.subtitle && ![ ...keys, 'administration', 'teachers'].includes(item.title))"
        />
        <div>
          <h3 class="text-lg font-semibold">
            Administration
          </h3>
          <StackedInfoList
            :items-displayed="department?.administration?.map((administrator) => {
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
    <!-- teachers information -->
    <div v-show="currentTab === 1">
      <ContentSection
        :admin-mode="adminMode"
        :items="teachers"
        title="Teachers"
        subtitle="These are the teachers of the faculty"
        add-button-label="Add a teacher to the department"
        dialog-title="Search for a teacher"
      >
        <TeacherSearchForm @on-submit="data => handleAddTeachers(data)" />
      </ContentSection>
    </div>
    <div v-show="currentTab === 2">
      <div v-if="!achievementsError">
        <GridList :items="achievementsInfo" class="my-4" name-class="!text-2xl text-primary-600" right-text-class="text-xl text-primary-600" />
        <div v-if="adminMode">
          <AddButton title="Add a new achievement" class="my-4" @click="openAddAchievementDialogOpen" />
          <DialogDefault
            ref="addAchievementDialog"
            title="Add achievement"
            description="Include background context on the achievement, such as collaborators and supporting data."
          >
            <AchievementCreateForm :additional-fields="[{ name: 'department_id', label: 'Department id', type: 'text', immutable: true, value: departmentId, disabled: true }]" :self-add="false" @on-create="createdAchievement => achievementsOfDepartment?.push(createdAchievement)" />
          </DialogDefault>
        </div>
        <StackedInfoList
          :update-action="adminMode"
          :delete-action="adminMode"
          :items-displayed="achievementsOfDepartment?.map(item => {
            return {
              id: item._id,
              title: item.title,
              subtitle: item.type,
              link: `/achievement/${item._id}`
            }
          })"
          :items="achievementsOfDepartment"
          @delete-event="id => handleDeleteAchievement(id)"
        >
          <template #update-form="scope">
            <AchievementUpdateForm :item="scope.item" @on-update="achievement => handleUpdateAchievement(achievement)" />
          </template>
        </StackedInfoList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const { data: user } = useAuth()

const menuTabs = [
  { name: 'main information', href: '#' },
  { name: 'teachers', href: '#' },
  { name: 'achievements', href: '#' }
]
const currentTab = ref(0)

const route = useRoute()

const { universityId, facultyId, departmentId } = route.params

const adminMode = isInAdministration(user.value, [universityId as string, facultyId as string])

const { data: department } = await useFetch(`/api/departments/${departmentId}`)

const { data: res, error: achievementsError } = await useFetch(`/api/departments/${departmentId}/with-scores`)
const achievementsOfDepartment = res.value?.achievements
const teacherScores = res.value?.teacherScores

const teachers = ref(department.value?.teachers?.reverse()?.map((teacher) => { return { name: `${teacher.lastName} ${teacher.firstName}`, description: teacher.username, rightText: `${teacherScores[teacher._id] || 0}`, link: `/teacher/${teacher._id}` } }))

const achievementsInfo = ref([
  {
    description: 'Department ScholarSphere score',
    name: department.value?.score || 0
  },
  {
    description: 'Achievements',
    name: achievementsOfDepartment?.length || 0
  }
])

async function handleAddTeachers (data) {
  try {
    const addedTeachers = await addTeachers(universityId as string, facultyId as string, departmentId as string, data.teachers)
    teachers.value.push(...addedTeachers?.map((teacher) => { return { name: `${teacher.lastName} ${teacher.firstName}`, description: teacher.username, link: `/teacher/${teacher._id}` } }))
  } catch (e) {
    toast.error(e.statusMessage)
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

const addAchievementDialog = ref(null)
function openAddAchievementDialogOpen () {
  addAchievementDialog.value?.openModal()
}

function handleUpdateAchievement (achievement) {
  const index = achievementsOfDepartment.value?.findIndex(a => a._id === achievement._id)

  if (index === undefined) {
    return
  }
  if (index !== -1) {
    achievementsOfDepartment.value?.splice(index, 1, achievement)
  } else {
    console.error('Error: achievement not found.')
  }
}

async function handleDeleteAchievement (id: string) {
  if (!achievementsOfDepartment.value) {
    return
  }
  const alteredAchievementIndex = achievementsOfDepartment.value?.findIndex(achievement => achievement._id === id)

  if (alteredAchievementIndex === -1) {
    return
  }

  try {
    if (achievementsOfDepartment.value?.[alteredAchievementIndex]?.createdBy === user.value?.id || adminMode.value) {
      await deleteAchievement(id)
    } else {
      await removeAchievementAuthor(achievementsOfDepartment.value?.[alteredAchievementIndex]._id, user.value?.id)
    }
    achievementsOfDepartment.value?.splice(alteredAchievementIndex, 1)
    toast.success('Achievement deleted successfully')
  } catch (e) {
    toast.error(e.statusMessage)
  }
}
</script>
