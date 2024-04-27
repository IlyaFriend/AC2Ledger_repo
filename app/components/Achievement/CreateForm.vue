<template>
  <DynamicForm
    submit-label="Add"
    class="mt-4"
    :fields="fields"
    @on-submit="data => addAchievement(data)"
  />
</template>

<script setup lang="ts">
const emits = defineEmits(['on-create'])

const fields = {
  0: { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title', immutable: true },
  1: { name: 'type', label: 'Type', type: 'text', placeholder: 'Enter type', immutable: true },
  2: { name: 'year', label: 'Year', type: 'number', placeholder: 'Enter year' }
}

async function addAchievement (inputData) {
  const { title, type, ...details } = inputData
  const achievementData = {
    title,
    type,
    details
  }
  const createdAchievement = await createAchievement(achievementData)
  emits('on-create', createdAchievement)
}
</script>
