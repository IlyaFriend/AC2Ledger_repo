<template>
  <FormKit
    v-model="formValue"
    type="form"
  >
    <FormKit
      type="text"
      name="name"
      label="University Name"
      validation="required|length:1,100"
      outer-class="sm:col-span-6"
    />
    <FormKit
      type="text"
      name="shortName"
      label="University Short Name"
      validation="length:1,30"
      outer-class="sm:col-span-3"
    />
    <FormKit
      type="text"
      name="city"
      label="City"
      validation="length:1,100"
      outer-class="sm:col-span-3"
    />

    <FormKit
      type="text"
      name="address"
      label="Address"
      validation="length:1,200"
      outer-class="sm:col-span-3"
    />

    <FormKit
      type="text"
      name="postCode"
      label="Post Code"
      validation="length:1,20"
      outer-class="sm:col-span-3"
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
