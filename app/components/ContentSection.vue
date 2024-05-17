<template>
  <div>
    <div class="text-xl font-semibold">
      {{ title }}
    </div>
    <div>
      <div>{{ subtitle }}</div>
      <AddButton v-if="adminMode" :title="addButtonLabel" class="my-4" @click="openAddDialogOpen" />
      <DialogDefault
        v-if="adminMode"
        ref="addDialog"
        :title="dialogTitle"
      >
        <slot />
      </DialogDefault>
    </div>
    <div>
      <GridList :items="itemsRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  adminMode: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  addButtonLabel: {
    type: String,
    default: ''
  },
  dialogTitle: {
    type: String,
    default: ''
  }
})

defineEmits(['on-add'])

const itemsRef = ref(props.items)

const addDialog = ref(null)

function openAddDialogOpen () {
  addDialog.value?.openModal()
}
</script>
