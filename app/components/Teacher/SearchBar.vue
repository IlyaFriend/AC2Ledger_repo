<template>
  <FormKit
    type="form"
    :actions="false"
  >
    <div class="flex">
      <FormKit name="firstName" placeholder="First name" inner-class="$remove:rounded border-r-0 rounded-l" />
      <FormKit name="lastName" placeholder="Last name" inner-class="$remove:rounded border-r-0" />
      <FormKit name="username" placeholder="Username" inner-class="$remove:rounded" />
      <FormKit type="submit" input-class="$remove:rounded w-full flex justify-center rounded-r">
        <MagnifyingGlassIcon class="min-w-4 w-4" />
      </FormKit>
    </div>
  </FormKit>
</template>

<script lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
</script>
