<template>
  <AutoComplete v-model="value" :items="items.data.value?.data?.map(user => { return { value: user?._id, text: user?.username } })" multiple @query-change="value => query = value" />
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import AutoComplete from '~/components/AutoComplete.vue'

interface Item extends Record<string, any> {
  value: string | number
  text: string
}

type ModelValue = Item | Item[] | undefined | null

defineProps({
  modelValue: {
    type: Object as PropType<ModelValue>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue | ModelValue[]): void
}>()

const value = ref()
const debouncedValue = ref('')
const query = ref('')

const fetchItems = async () => {
  try {
    console.log('Fetching items', debouncedValue.value)
    const res = await useFetch('/api/users/search/starts-with', {
      query: {
        username: debouncedValue
      }
    })
    console.log(res.data)
    return res // .data?.value?.map(user => ({ value: user?.username, text: user?.username }))
  } catch (error) {
    console.error('Error fetching items:', error)
    return []
  }
}

const items = await useAsyncData(fetchItems)

const debouncedSetValue = useDebounceFn((newValue: string) => {
  debouncedValue.value = newValue
  items.refresh()
}, 1000)

watch(query, () => {
  debouncedSetValue(query.value)
})

watch(value, (val) => {
  emit('update:modelValue', val)
})
</script>
