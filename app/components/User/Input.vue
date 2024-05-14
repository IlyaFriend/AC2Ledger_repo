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

const emit = defineEmits(['update:modelValue'])

// modelValue can be either an array of strings (user ids) or user objects
// in the 2nd variant, no need to fetch them
const defaultUsers = Array.isArray(props.modelValue)
  ? props.modelValue.length > 0
    ? typeof props.modelValue[0] === 'string'
      ? await searchUsersByIds(props.modelValue)
      : props.modelValue
    : []
  : []

const filteredUserIds = props.modelValue?.map(item => item?._id || item)?.filter(item => !props.usersToSkip.includes(item)) || []

const value = ref(filteredUserIds)

const debouncedValue = ref('')
const query = ref('')

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
    return result.filter(u => !props.usersToSkip.includes(u.value))
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
