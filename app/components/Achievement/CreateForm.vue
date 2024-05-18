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
const props = defineProps({
  additionalFields: {
    type: Array,
    default: () => []
  },
  selfAdd: {
    type: Boolean,
    default: true
  }
})

const fields = Object.entries([
  { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title', immutable: true },
  { name: 'type', label: 'Type', type: 'text', placeholder: 'Enter type', immutable: true },
  { name: 'authors', label: 'Other authors', type: 'users', placeholder: 'Add authors', immutable: true },
  { name: 'year', label: 'Year', type: 'number', placeholder: 'Enter year' },
  ...props.additionalFields
]).reduce((obj, [key, value]) => {
  obj[key] = value
  return obj
}, {})

const { data: user } = useAuth()

async function addAchievement (inputData) {
  const { title, type, authors, department_id, scopus_id, ...details } = inputData
  const achievementData = {
    title,
    type,
    details,
    department_id,
    scopus_id,
    users: [...(props?.selfAdd ? user.value.id : []), ...(authors || [])],
    createdBy: user.value.id
  }
  const createdAchievement = await createAchievement(achievementData)
  toast.success('Achievement added successfully')
  emits('on-create', createdAchievement)
}
</script>
