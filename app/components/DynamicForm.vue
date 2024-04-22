<template>
  <div class="w-full border rounded p-4">
    <FormKit type="form" submit-label="Add" @submit="submitForm">
      <div v-if="title" class="text-xl font-semibold text-center mb-4">
        {{ title }}
      </div>
      <div v-for="(field, key) in fieldsRef" :key="key" :label="field.label" class="flex justify-between items-center mb-4">
        <FormKit v-if="!field.immutable" outer-class="!max-w-[17%] $remove:mb-4" type="text" :value="field.name" @change="e => changeFieldName(key, e.target.value)" />
        <span v-else class="!max-w-[17%] w-full px-3">{{ field.name }}</span>
        <FormKit v-model="formData[key]" outer-class="!max-w-[77%] $remove:mb-4" type="text" :placeholder="field.placeholder" />
        <button :disabled="field.immutable" class="cursor-pointer hover:text-primary-600 disabled:text-gray-300 disabled:cursor-default" @click="deleteFieldName(key)">
          <Icon name="material-symbols-light:delete-outline-sharp" size="1.5em" />
        </button>
      </div>
      <button type="button" variant="info" class="mb-4 hover:text-primary-500 flex items-center" @click="addField">
        <Icon name="material-symbols-light:add-circle-outline-rounded" size="2em" /><span class="ml-1">Add a new field</span>
      </button>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '#imports'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  fields: {
    type: Object,
    default: () => {
      return {
        0: { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title', immutable: true },
        1: { name: 'type', label: 'Type', type: 'text', placeholder: 'Enter type', immutable: true }
      }
    }
  }
})
const emits = defineEmits(['on-submit'])
const {
  data
} = useAuth()
const formData = ref({})
const indexKey = ref(2)

const fieldsRef = ref(props.fields)

const submitForm = () => {
  let achievementData: any = {}
  for (const [key, value] of Object.entries(fieldsRef.value)) {
    achievementData[value?.name] = formData.value[key]
  }
  const { title, type, ...details } = achievementData
  achievementData = {
    title,
    type,
    details,
    users: [data.value.id],
    createdBy: data.value.id
  }
  try {
    emits('on-submit', achievementData)
  } catch (e) {
    console.log(e)
  }
}

const addField = () => {
  const newField = { name: `key${indexKey.value - 1}`, label: '', type: 'text', placeholder: '' }
  fieldsRef.value[indexKey.value] = newField
  indexKey.value++
}

const changeFieldName = (key: string, newFieldName: string) => {
  fieldsRef.value[key].name = newFieldName
}

const deleteFieldName = (key: string) => {
  delete fieldsRef.value[key]
}
</script>
