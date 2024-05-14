<template>
  <div>
    {{ title }}
    <div>
      <div>{{ subtitle }}</div>
      <AddButton :title="addButtonLabel" class="my-4" @click="openAddDialogOpen" />
      <DialogDefault
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
