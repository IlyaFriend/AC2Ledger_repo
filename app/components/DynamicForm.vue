<template>
  <div class="w-[600px] border rounded p-4">
    <FormKit type="form" submit-label="Add" @submit="submitForm">
      <div class="text-xl font-semibold text-center mb-4">
        Add an achievement
      </div>
      <div v-for="(field, key) in fields" :key="key" :label="field.label" class="flex justify-between items-center mb-4">
        <FormKit outer-class="!max-w-[17%] $remove:mb-4" type="text" :value="field.name" @change="e => changeFieldName(key, e.target.value)" />
        <FormKit v-model="formData[key]" outer-class="!max-w-[77%] $remove:mb-4" type="text" :placeholder="field.placeholder" />
        <Icon name="material-symbols-light:delete-outline-sharp" size="1.5em" class="cursor-pointer hover:text-primary-600" @click="deleteFieldName(key)" />
      </div>
      <button type="button" variant="info" class="mb-4 hover:text-primary-500" @click="addField">
        <Icon name="material-symbols-light:add-circle-outline-rounded" size="2em" /> Add a new field
      </button>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

const fields: Ref<any> = ref({
  0: { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title' },
  1: { name: 'type', label: 'Type', type: 'text', placeholder: 'Enter type' }
})
const formData = ref({})
const indexKey = ref(2)

const submitForm = async () => {
  let achievementData: any = {}
  for (const [key, value] of Object.entries(fields.value)) {
    achievementData[value?.name] = formData.value[key]
  }
  const { title, type, ...details } = achievementData
  achievementData = {
    title,
    type,
    details
  }
  try {
    await $fetch('/api/achievements/', {
      method: 'POST',
      body: {
        data: achievementData
      }
    })
  } catch (e) {
    console.log(e)
  }
}

const addField = () => {
  const newField = { name: `key${indexKey.value - 1}`, label: '', type: 'text', placeholder: '' }
  fields.value[indexKey.value] = newField
  indexKey.value++
}

const changeFieldName = (key: string, newFieldName: string) => {
  fields.value[key].name = newFieldName
}

const deleteFieldName = (key: string) => {
  delete fields.value[key]
}
</script>
