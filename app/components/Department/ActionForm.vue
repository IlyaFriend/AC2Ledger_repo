<template>
  <DynamicForm :fields="fields" :add-new-fields="false" />
</template>

<script setup lang="ts">
const fields = {
  0: { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name', immutable: true },
  1: { name: 'administration', label: 'Administration', type: 'users', placeholder: 'Add administration users', immutable: true }
}
</script>
