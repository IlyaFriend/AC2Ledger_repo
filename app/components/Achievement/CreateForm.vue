<template>
  <DynamicForm
    submit-label="Add"
    class="mt-4"
    :fields="fields"
    @on-submit="data => addAchievement(data)"
  />
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
const emits = defineEmits(['on-create'])

const fields = {
  0: { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title', immutable: true },
  1: { name: 'type', label: 'Type', type: 'text', placeholder: 'Enter type', immutable: true },
  2: { name: 'authors', label: 'Other authors', type: 'users', placeholder: 'Add authors', immutable: true },
  3: { name: 'year', label: 'Year', type: 'number', placeholder: 'Enter year' },
}

const { data: user } = useAuth()

async function addAchievement (inputData) {
  const { details, ...rest } = inputData
  const achievementData = {
    ...rest,
    ...details,
    users: [user.value.id, ...inputData.authors],
    createdBy: user.value.id
  }
  const createdAchievement = await createAchievement(achievementData)
  toast.success('Achievement added successfully')
  emits('on-create', createdAchievement)
}
</script>
