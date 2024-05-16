<template>
  <FormKit
    v-model="formValue"
    type="form"
  >
    <FormKit
      type="text"
      name="name"
      label="Faculty Name"
      validation="required|length:1,100"
      outer-class="sm:col-span-6"
    />
    <UserInput v-model="formValue.administration" name="administration" title="Administrators" class="mb-4" />
  </FormKit>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: true
  }
})

const formValue = ref(props.modelValue)
</script>
