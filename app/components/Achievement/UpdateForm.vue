<template>
  <DynamicForm
    submit-label="Update"
    class="mt-4"
    :fields="fields"
    @on-submit="data => handleUpdateAchievement(data)"
  />
</template>

<script setup lang="ts">
import { updateAchievement } from '~/composables/achievements'
import { keys as nonPublicFields } from '~/utils/nonPublicKeys'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['on-update'])

const achievementFields = { ...props.item }
const fieldsArray = []

nonPublicFields.forEach((field) => {
  delete achievementFields[field]
})

for (const [key, value] of Object.entries(achievementFields)) {
  if (key === 'details') {
    for (const [keyD, valueD] of Object.entries(value)) {
      fieldsArray.push({
        name: keyD,
        value: valueD
      })
    }
  } else {
    let fieldType
    switch (key) {
      case 'users':
        fieldType = 'users'
        break
      case 'year':
        fieldType = 'number'
        break
      default:
        fieldType = 'text'
    }

    const field: any = {
      name: key,
      value,
      type: fieldType,
      immutable: true
    }

    if (fieldType === 'users') {
      field.usersToSkip = [props.item.createdBy]
    }
    fieldsArray.push(field)
  }
}

const fields = fieldsArray.reduce((acc, item, index) => {
  acc[index] = item
  return acc
}, {})

async function handleUpdateAchievement (data) {
  const { title, type, users, ...details } = data
  const achievementData = {
    title,
    type,
    users: [props.item.createdBy, ...users],
    details
  }

  const response = await updateAchievement(props.item._id, achievementData)
  emits('on-update', response)
}
</script>
