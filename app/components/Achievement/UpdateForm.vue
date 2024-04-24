<template>
  <DynamicForm
    submit-label="Update"
    class="mt-4"
    :fields="fields"
    @on-submit="data => console.log(data)"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const achievementFields = { ...props.item }
const fieldsArray = []

// remove non-public fields
delete achievementFields?._id
delete achievementFields?.__v
delete achievementFields?.createdAt
delete achievementFields?.updatedAt
delete achievementFields?.createdBy
delete achievementFields?.users // TODO: remove this after adding other users to achievements

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

// TODO: on-submit -> update the achievement
</script>
