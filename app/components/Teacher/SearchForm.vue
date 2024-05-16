<template>
  <DynamicForm :fields="fields" :add-new-fields="false" />
</template>

<script setup lang="ts">
const fields = {
  0: { name: 'teachers', label: 'Teachers', type: 'users', immutable: true }
}
</script>
