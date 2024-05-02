<template>
  <AutoComplete v-model="value" :items="mergedUsers" multiple @query-change="value => query = value" />
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import AutoComplete from '~/components/AutoComplete.vue'

interface Item extends Record<string, any> {
  value: string | number
  text: string
}

type ModelValue = Item | Item[] | undefined | null

const props = defineProps({
  modelValue: {
    type: Object as PropType<ModelValue>,
    required: true
  },
  usersToSkip: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue | ModelValue[]): void
}>()

const value = ref(props.usersToSkip ? props.modelValue?.filter((id) => !props.usersToSkip.includes(id)) : props.modelValue || [])
const debouncedValue = ref('')
const query = ref('')

const defaultUsers = props.modelValue ? await searchUsersByIds(props.modelValue) : []

const fetchItems = async () => {
  try {
    const res = await useFetch('/api/users/search/starts-with', {
      query: {
        username: debouncedValue
      }
    })
    return res
  } catch (error) {
    console.error('Error fetching items:', error)
    return []
  }
}

const items = await useAsyncData(fetchItems)

const mergedUsers = computed(() => {
  const result = [...defaultUsers, ...items.data.value?.data].filter((user, index, self) =>
    index === self.findIndex(t => (
      t._id === user._id
    ))
  ).map((user) => { return { value: user?._id, text: user?.username } })
  if (props.usersToSkip) {
    return result.filter((u) => !props.usersToSkip.includes(u.value))
  }
  return result
})

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
