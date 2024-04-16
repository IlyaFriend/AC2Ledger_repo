<template>
  <div>
    <FormKit type="form" @submit="submitForm">
      <div v-for="(field, key) in fields" :key="key" :label="field.label" class="flex justify-between items-center px-4 mb-4">
        <FormKit outer-class="!max-w-[17%] $remove:mb-4" type="text" :value="field.name" @change="e => changeFieldName(key, e.target.value)" />
        <FormKit v-model="formData[key]" outer-class="!max-w-[77%] $remove:mb-4" type="text" :placeholder="field.placeholder" />
        <Icon name="material-symbols-light:delete-outline-sharp" size="1.5em" class="cursor-pointer hover:text-primary-600" @click="deleteFieldName(key)" />
      </div>
      <button variant="info" @click="addField">
        Add Field
      </button>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

const fields: Ref<any> = ref({
  0: { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title' }
})
const formData = ref({})
const indexKey = ref(1)

const submitForm = () => {
  console.log('Form data:', formData.value)
  console.log('fields:', fields.value)
}

const addField = () => {
  const newField = { name: 'key', label: '', type: 'text', placeholder: '' }
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
