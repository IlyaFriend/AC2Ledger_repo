<template>
  <div class="w-full border rounded p-4">
    <FormKit type="form" :submit-label="submitLabel" @submit="submitForm">
      <div v-if="title" class="text-xl font-semibold text-center mb-4">
        {{ title }}
      </div>
      <div v-for="(field, key) in fieldsRef" :key="key" :label="field.label" class="flex justify-between items-center mb-4">
        <FormKit v-if="!field.immutable" outer-class="!max-w-[17%] $remove:mb-4" type="text" :value="field.name" @change="e => changeFieldName(key, e.target.value)" />
        <span v-else class="!max-w-[17%] w-full px-3">{{ field.label }}</span>

        <UserInput v-if="field.type === 'users'" v-model="formData[key]" :users-to-skip="field.usersToSkip" class="mx-1 sm:mx-2 xl:mx-4" />
        <FormKit v-else v-model="formData[key]" outer-class="!max-w-[77%] $remove:mb-4" :type="field.type || 'text'" :placeholder="field.placeholder" />
        <button type="button" :disabled="field.immutable" class="cursor-pointer hover:text-primary-600 disabled:text-gray-300 disabled:cursor-default" @click="deleteFieldName(key)">
          <Icon name="material-symbols-light:delete-outline-sharp" size="1.5em" />
        </button>
      </div>
      <button v-if="addNewFields" type="button" variant="info" class="mb-4 hover:text-primary-500 flex items-center" @click="addField">
        <Icon name="material-symbols-light:add-circle-outline-rounded" size="2em" /><span class="ml-1">Add a new field</span>
      </button>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  submitLabel: {
    type: String,
    default: 'Submit'
  },
  fields: {
    type: Object,
    default: () => {
      return {
        0: { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title', immutable: true },
        1: { name: 'type', label: 'Type', type: 'text', placeholder: 'Enter type', immutable: true }
      }
    }
  },
  addNewFields: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['on-submit'])

const formData = ref({})
const indexKey = ref(Object.keys(props.fields).length)
const addedKeysCounter = ref(1)

const fieldsRef = ref(Object.values(props.fields).map((field) => {
  return {
    ...field,
    label: field.label || field.name || field.title,
    type: field.type || 'text',
    placeholder: field.placeholder || `Enter ${field.name}`,
    immutable: field.immutable || false
  }
}).reduce((acc, item, index) => {
  acc[index] = item
  return acc
}, {}))

for (const key in props.fields) {
  if (Object.prototype.hasOwnProperty.call(props.fields, key)) {
    const field = props.fields[key]
    if (field.value) {
      formData.value[key] = field.value
    }
  }
}

const submitForm = () => {
  const result: any = {}
  for (const [key, value] of Object.entries(fieldsRef.value)) {
    result[value?.name] = formData.value[key]
  }
  emits('on-submit', result)
}

const addField = () => {
  const newField = { name: `${addedKeysCounter.value++}`, label: '', type: 'text', placeholder: '' }
  fieldsRef.value[indexKey.value] = newField
  indexKey.value++
}

const changeFieldName = (key: string, newFieldName: string) => {
  fieldsRef.value[key].name = newFieldName
}

const deleteFieldName = (key: string | number) => {
  delete fieldsRef.value[+key]
}
</script>
