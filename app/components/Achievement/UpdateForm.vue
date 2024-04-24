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

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const achievementFields = { ...props.item }
const fieldsArray = []

// remove non-public fields
const nonPublicFields = ['_id', '__v', 'createdAt', 'updatedAt', 'createdBy', 'users'] // TODO: remove users after adding other users to achievements
nonPublicFields.forEach(field => {
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
    fieldsArray.push({
      name: key,
      value,
      immutable: true
    })
  }
}

const fields = fieldsArray.reduce((acc, item, index) => {
  acc[index] = item
  return acc
}, {})

console.log(fields)

async function handleUpdateAchievement(data) {
  const { title, type, ...details } = data
  const achievementData = {
    title,
    type,
    details
  }

  const response = await updateAchievement(props.item._id, achievementData)
  console.log(response)
}
// TODO: on-submit -> update the achievement
</script>
