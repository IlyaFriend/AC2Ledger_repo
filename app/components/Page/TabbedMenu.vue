<template>
  <div class="border-b border-gray-200 pb-5 sm:pb-0">
    <h3 v-if="title" class="text-base font-semibold leading-6 text-gray-900">{{ title }}</h3>
    <div class="mt-3 sm:mt-4">
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select id="current-tab" name="current-tab" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm" @change="e => handleChange(e.target.value)">
          <option v-for="(tab, index) in tabs" :key="tab.name" :selected="index === currentTab" :value="index">{{ tab.name }}</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <button v-for="(tab, index) in tabs" :key="tab.name" :href="tab.href" class="capitalize" :class="[index === currentTab ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium']" :aria-current="index === currentTab ? 'page' : undefined" @click="handleChange(index)">{{ tab.name }}</button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  currentTab: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['change-tab'])

const handleChange = (value) => {
  emits('change-tab', value)
}
</script>
